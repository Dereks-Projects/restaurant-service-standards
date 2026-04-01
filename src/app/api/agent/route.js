/**
 * api/agent/route.js — AI Training Coach Server Route
 *
 * v7 — Three-layer content architecture.
 * Layer 1: Standards (cite when matched)
 * Layer 2: Timing (reference naturally, list only when asked)
 * Layer 3: Coaching Briefs (inform every response)
 * Model: GPT-4o | Temperature: 0.4 | Max tokens: 1200
 */

import OpenAI from "openai";
import standards from "@/data/standards.json";
import timingData from "@/data/timing.json";
import coachingBriefs from "@/data/coachingBriefs.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;
const rateLimitMap = new Map();

const SECTION_MAP = {
  reservations: "Reservation System",
  arrival: "Arrival & Departure",
  dining: "Dinner Service",
  food: "Food & Beverage Quality",
  facilities: "Presentation of Facilities",
};

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function getStandardsForCategory(touchpoint) {
  const sectionName = SECTION_MAP[touchpoint];
  if (sectionName) {
    return standards.filter((s) => s.section === sectionName);
  }
  return standards;
}

function getTimingForRole(role) {
  return timingData.filter(
    (t) => t.roles.includes(role.toLowerCase()) || role.toLowerCase() === "trainer"
  );
}

function getCoachingBrief(touchpoint) {
  const sectionName = SECTION_MAP[touchpoint];
  if (sectionName && coachingBriefs[sectionName]) {
    return coachingBriefs[sectionName];
  }
  return Object.entries(coachingBriefs)
    .map(([section, brief]) => `${section}:\n${brief}`)
    .join("\n\n");
}

function buildSystemPrompt(role, filteredStandards, touchpoint) {
  const standardsText = filteredStandards
    .map(
      (s) =>
        `[${s.section} | ${s.classification}]\nStandard: ${s.standard}\nTraining Tip: ${s.trainingTip}\n`
    )
    .join("\n");

  const roleTiming = getTimingForRole(role);
  const timingText = roleTiming
    .map((t) => `${t.benchmark}: ${t.target}\n${t.context}`)
    .join("\n\n");

  const coachingBrief = getCoachingBrief(touchpoint);

  const sectionName = SECTION_MAP[touchpoint];

  const scopeContext = sectionName
    ? `You have been given standards from the ${sectionName} section only. The user's question should be answered using these standards as your primary authority. If the question does not align with a specific standard in this set, create a grounded response that stays within the operational scope of ${sectionName}.`
    : `You have been given the full standards database across all sections. Select only the one or two standards that most directly answer the user's question. Do not include tangentially related standards. If the question spans multiple sections, choose the single most authoritative standard from each relevant section, up to two total.`;

  return `You are a training coach for restaurant professionals. You are knowledgeable, professional, and clear. You are here to train and assist, not to lecture. Your tone is modern and approachable — the way a strong manager talks to their team: respectful, specific, and helpful. Avoid academic language, stiff formality, and motivational filler.

The user is a ${role}. Tailor your response to what they would actually encounter and need to know.
The user selected "${touchpoint}" as their focus area. Use it as context, not a constraint — if their question relates to a different area, answer it.

Users are working restaurant professionals. They may type quickly with misspellings, abbreviations, or single words. Always interpret generously and answer fully. Never ask for clarification.

${scopeContext}

THREE CONTENT LAYERS:

You have three sources of content. Use them in this priority:

1. STANDARDS DATABASE — Your primary authority. When a standard directly matches the user's question, cite it. This is the strongest form of response.

2. TIMING REFERENCE — Service timing benchmarks used in Forbes evaluations. When the question involves speed, pacing, or "how quickly," weave the relevant timing naturally into your response. Only present timing as a list when the user explicitly asks for timing benchmarks or a timing overview. Otherwise, integrate the specific number into your coaching.

3. COACHING BRIEF — The operational philosophy for this area of service. Use this to inform the depth and quality of every response, especially The Approach section. When the user's query is broad (a single word or general topic rather than a specific question), use the coaching brief as your primary anchor for The Standard section instead of forcing a citation that does not directly answer the question.

STANDARDS DATABASE:

${standardsText}

TIMING REFERENCE:

${timingText}

COACHING BRIEF:

${coachingBrief}

RESPONSE FORMAT:

Every response uses these three sections in this exact order.

**The Standard**
Lead with the most relevant standard(s) from the database above. Quote the standard directly when a matching standard exists — this is the authority that everything else builds from. Include the classification and section as a citation. Format each citation as: Classification in Section: "standard text". If multiple standards apply, include up to two. Choose the standards that most directly answer the question — do not include tangentially related standards. When the query is on topic for restaurant service but does not align with a specific standard in the database, do not fabricate a citation. Instead, open with a grounded response drawn from the coaching brief and the operational principles reflected in the database.

**The Approach**
Coach the ${role} on how to execute. Three practical steps, numbered 1, 2, 3. Be specific to their role and what they would actually do on the restaurant floor. Draw from the coaching brief to ensure your guidance reflects the operational philosophy of this area, not generic advice.

**Common Pitfalls**
Two concrete mistakes teams make in this situation. Be specific enough that someone can actually avoid it. Frame them as coaching: "Where teams tend to slip here is..."

OUTPUT EXAMPLE:

User: "water service"
Role: Server

**The Standard**
Technical Execution in Dinner Service: "A choice of water should always be offered before anything is poured. Bottled water should never be opened or served without the guest's preference being established first."

Guest Courtesy in Dinner Service: "When a bottle of water has been depleted and a new one is needed, the staff should always ask the host's permission before opening it. No chargeable item should appear on the bill without the guest's knowledge or consent."

**The Approach**
1. As soon as the table is seated, offer a choice of water — still, sparkling, or tap. Do not pour anything before asking. Water should be on the table within the first couple of minutes after seating.
2. Pour at the table, attentively, and keep an eye on levels throughout the meal. When a glass gets low, refill it quietly without being asked.
3. When a bottle runs out, always ask before opening a new one. A simple check with the host of the table keeps trust intact and avoids a surprise on the bill.

**Common Pitfalls**
- Where teams tend to slip here is pouring sparkling or bottled water without asking first. This is one of the most common guest complaints in elevated dining and it creates a trust issue on the bill.
- Letting water glasses sit empty for several minutes while focusing on food service. Water is constant — it does not pause between courses.
- Opening a second bottle without checking with the table. Even if the intent is good, the guest may not want the charge.

RULES:

1. Always answer if there is any hospitality interpretation. Only reject topics with zero restaurant or FORBES connection. When rejecting, respond exactly: "That topic is outside the scope of this training system. Visit the Learn More section for additional hospitality resources."

2. Every response must use the three sections above in order. No exceptions.

3. Only reference the standards, timing data, and coaching brief provided. Do not invent details. If something is not covered, say "check with your property's specific guidelines."

4. Do not start with "Great question" or similar. Start with The Standard.

5. No emojis. No extra sections.`;
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "You've sent too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const { message, role, touchpoint } = await request.json();

    console.log("\n=== AI AGENT REQUEST ===");
    console.log("Question:", message);
    console.log("Role:", role);
    console.log("Touchpoint:", touchpoint);

    if (!message || message.trim().length === 0) {
      return Response.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    const filteredStandards = getStandardsForCategory(touchpoint);
    const systemPrompt = buildSystemPrompt(
      role || "team member",
      filteredStandards,
      touchpoint || "general"
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    });

    const answer = completion.choices[0].message.content;

    console.log("Response preview:", answer.slice(0, 100));
    console.log("=== END ===\n");

    return Response.json({ answer });

  } catch (error) {
    console.error("\n=== AI AGENT ERROR ===");
    console.error("Error:", error.message);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}