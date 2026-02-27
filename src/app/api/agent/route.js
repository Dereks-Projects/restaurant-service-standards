/**
 * api/agent/route.js — AI Training Agent Server Route
 *
 * WHY THIS FILE EXISTS:
 * This is the secure "back office" that talks to OpenAI.
 * The browser NEVER sees your API key. Here's the flow:
 *
 * 1. User submits a question from the AI Agent page
 * 2. This file receives it (along with their role + touchpoint)
 * 3. We pull relevant standards from your JSON
 * 4. We build a prompt telling GPT-4o-mini how to respond
 * 5. We send it to OpenAI and return the structured answer
 *
 * WHY route.js:
 * In Next.js App Router, any file named route.js inside /api
 * becomes a server endpoint. This one handles POST requests.
 */

import OpenAI from "openai";
import standards from "@/data/standards.json";

/* Create the OpenAI client using your secret key from .env.local */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ─── Rate Limiter ───────────────────────────────────────────────────────────
 *
 * WHY THIS EXISTS:
 * Your AI agent costs money every time it calls OpenAI. Without a limit,
 * a bot or abusive user could send thousands of requests and run up your
 * bill. This is a simple "clipboard" — it tracks how many times each
 * IP address has called this endpoint in the last 60 seconds.
 *
 * HOW IT WORKS (restaurant analogy):
 * Imagine a host with a clipboard. Every time a guest (IP address) walks
 * in, the host marks a tally next to their name and notes the time.
 * If that guest has already walked in 10 times in the last 60 seconds,
 * the host says "I'm sorry, we need a moment" and turns them away.
 * After 60 seconds, old tallies are erased and they can come back.
 *
 * SETTINGS:
 * - MAX_REQUESTS: how many calls allowed per window (default: 10)
 * - WINDOW_MS: the time window in milliseconds (default: 60000 = 60 seconds)
 *
 * LIMITATION TO UNDERSTAND:
 * This counter lives in memory on the server. If the server restarts,
 * counters reset. This is fine for your current scale — it stops casual
 * abuse and bots, which is 95% of the real-world risk here.
 * ─────────────────────────────────────────────────────────────────────────── */

const MAX_REQUESTS = 10;       /* max requests per IP per window */
const WINDOW_MS = 60 * 1000;  /* 60 seconds in milliseconds */

/* The "clipboard" — stores { count, windowStart } per IP address */
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  /* First time we've seen this IP — create a fresh entry */
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  /* If the 60-second window has expired, reset their counter */
  if (now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  /* Still inside the window — increment their count */
  entry.count += 1;

  /* If they've exceeded the limit, block them */
  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}

/*
 * Map touchpoint keywords to section names in standards.json.
 * This lets us pull only the relevant standards for the question.
 * Think of it like a sommelier pulling the right wine list section
 * based on what the guest is asking about.
 */
const touchpointToSection = {
  reservations: "Reservation System",
  arrival: "Arrival & Departure",
  departure: "Arrival & Departure",
  dining: "Dinner Service",
  service: "Dinner Service",
  food: "Food & Beverage Quality",
  beverage: "Food & Beverage Quality",
  facilities: "Presentation of Facilities",
  complaints: null,   /* pulls from all sections */
  general: null,       /* pulls from all sections */
};

/*
 * Pull relevant standards based on the touchpoint.
 * If no specific match, we send a sample from each section
 * so the AI has broad context without overloading the prompt.
 */
function getRelevantStandards(touchpoint) {
  const sectionName = touchpointToSection[touchpoint];

  if (sectionName) {
    /* Return all standards for that section */
    return standards.filter((s) => s.section === sectionName);
  }

  /* For general/complaints, grab a few from each section */
  const sections = [...new Set(standards.map((s) => s.section))];
  const sample = [];
  sections.forEach((sec) => {
    const items = standards.filter((s) => s.section === sec);
    sample.push(...items.slice(0, 3)); /* first 3 from each */
  });
  return sample;
}

/*
 * The system prompt — this is the "personality + rules" for the AI.
 * It tells GPT-4o-mini exactly how to behave:
 * - Stay in restaurant domain
 * - Use the provided standards
 * - Format the response in a specific structure
 * - Redirect out-of-scope questions
 */
function buildSystemPrompt(role, relevantStandards) {
  const standardsText = relevantStandards
    .map(
      (s) =>
        `[${s.section} | ${s.classification}] ${s.standard} (Tip: ${s.trainingTip})`
    )
    .join("\n");

  return `You are the Restaurant Standards AI Training Coach. You help restaurant professionals improve their service by referencing a structured set of hospitality standards.

ROLE CONTEXT: The user is a ${role}. Tailor your language and examples to their specific responsibilities.

AVAILABLE STANDARDS:
${standardsText}

RESPONSE FORMAT — You MUST respond using this exact structure with these exact headings:

**What to Do**
Provide exactly 3 clear, actionable steps. Number them 1, 2, 3.

**What to Say**
Provide a realistic sample script or phrase the ${role} could use in this situation. Keep it natural and professional.

**What NOT to Do**
Provide 2-3 common mistakes to avoid in this situation.

**Standard Reference**
Cite the specific standard(s) from the list above that apply. Include the section and classification.

RULES:
- The users of this system are working restaurant professionals. They may type quickly with misspellings, abbreviations, slang, shorthand, or incomplete sentences (e.g., "wat do wen guest complans" or "how 2 handle allergys"). Always interpret their intent generously and respond with a clear, professional answer regardless of how the question is written.
- ONLY reference the standards, training tips, and information provided above. Never substitute your own knowledge for specific details like timing, procedures, or metrics. If the standards don't specify an exact detail, say "refer to your property's specific guidelines" rather than inventing a number.
- Keep responses practical and concise. This is for busy restaurant professionals.
- You should answer ANY question related to restaurants, hospitality, dining, food, beverage, wine, cocktails, guest service, hotel operations, events, or front-of-house/back-of-house operations. Be generous in what you consider "in scope" — if it relates to hospitality in any way, answer it.
- ONLY respond with the out-of-scope message if the question has absolutely nothing to do with hospitality, restaurants, food, beverage, or service (for example: questions about car repair, math homework, or coding). In that case, respond with exactly: "That topic is outside the scope of this training system. Visit the Learn More section for additional hospitality resources."
- Do not use emojis.
- Do not add extra sections beyond the four listed above.`;
}

/*
 * POST handler — this function runs when the browser sends a request.
 * It receives JSON with: message, role, touchpoint
 */
export async function POST(request) {
  try {

    /* ── Rate Limit Check ──────────────────────────────────────────────────
     * Read the visitor's IP address from the request headers.
     * x-forwarded-for is the standard header Vercel uses to pass the
     * real IP through its proxy layer. We fall back to "unknown" if
     * for any reason it isn't present.
     * ──────────────────────────────────────────────────────────────────── */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      console.log(`Rate limit hit — IP: ${ip}`);
      return Response.json(
        {
          error:
            "You've sent too many requests. Please wait a moment before trying again.",
        },
        { status: 429 } /* 429 = "Too Many Requests" — the correct HTTP code */
      );
    }

    /* Parse the incoming request body */
    const { message, role, touchpoint } = await request.json();

    /* --- DEBUG LOGGING (visible in your terminal, not the browser) --- */
    console.log("\n=== AI AGENT REQUEST ===");
    console.log("Question:", message);
    console.log("Role:", role);
    console.log("Touchpoint:", touchpoint);
    console.log("IP:", ip);
    console.log("API Key present:", !!process.env.OPENAI_API_KEY);
    console.log("API Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 7) || "MISSING");

    /* Validate that we have a message */
    if (!message || message.trim().length === 0) {
      return Response.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    /* Pull relevant standards based on touchpoint */
    const relevantStandards = getRelevantStandards(touchpoint || "general");
    console.log("Standards loaded:", relevantStandards.length);

    /* Build the system prompt with role + standards */
    const systemPrompt = buildSystemPrompt(
      role || "team member",
      relevantStandards
    );

    /* Call GPT-4o-mini (non-streaming — response comes all at once) */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    /* Extract the response text */
    const answer = completion.choices[0].message.content;

    console.log("Response preview:", answer.slice(0, 100));
    console.log("=== END ===\n");

    /* Send it back to the browser */
    return Response.json({ answer });

  } catch (error) {
    console.error("\n=== AI AGENT ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("=== END ERROR ===\n");
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}