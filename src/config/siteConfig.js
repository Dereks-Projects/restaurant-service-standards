/**
 * siteConfig.js — White-label configuration
 *
 * WHY THIS FILE EXISTS:
 * All branding, navigation labels, colors, and links live here.
 * To rebrand this app for a different restaurant or company,
 * you only edit THIS file and swap the JSON content files.
 */

const siteConfig = {
  /* --- Brand --- */
  name: "Restaurant Standards",
  tagline: "The Modern Restaurant Performance System",
  subtitle:
    "A framework to elevate service, reinforce consistency, and deliver 5-star results.",

  /* --- Bottom nav tabs (mobile) — order matters --- */
  bottomNav: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Course", href: "/course", icon: "Award" },
    { label: "AI Agent", href: "/ai-agent", icon: "MessageSquareText" },
    { label: "Standards", href: "/standards", icon: "ClipboardCheck" },
    { label: "Learn", href: "/learn-more", icon: "Lightbulb" },
  ],

  /* --- Portfolio dropdown (left chevron) --- */
  ecosystem: [
    { name: "Somm.Site", url: "https://somm.site", description: "Wine education & courses" },
    { name: "Somm.Tips", url: "https://somm.tips", description: "Wine & cocktail recommendations" },
    { name: "Hospitality.fyi", url: "https://hospitality.fyi", description: "Industry insights" },
    { name: "Beverage.fyi", url: "https://beverage.fyi", description: "Encyclopedic reference" },
    { name: "Backbar.fyi", url: "https://backbar.fyi", description: "Spirits & cocktails" },
  ],
  parentCompany: {
    name: "Informative Media",
    url: "https://informativemedia.com",
  },

  /* --- Hamburger menu: page links ---
   *
   * The `operator: true` flag on the last entry tells Header.js
   * to render that link with special gold styling — visually
   * separated from the training tools above it.
   */
  menuLinks: [
    { label: "Home", href: "/" },
    { label: "Course", href: "/course" },
    { label: "AI Agent", href: "/ai-agent" },
    { label: "Standards", href: "/standards" },
    { label: "Checklists", href: "/checklists" },
    { label: "Quiz", href: "/quiz" },
    { label: "Learn More", href: "/learn-more" },
    { label: "About", href: "/about" },
    { label: "For Operators", href: "/operators", operator: true },
  ],

  /* --- Hamburger menu: social links --- */
  socials: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/restaurant.standards/",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/restaurantstandards/",
    },
  ],

  /* --- Hamburger menu: legal links (small, gray, below accent line) --- */
  legalLinks: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
  ],

  /* --- Homepage module cards --- */
  modules: [
    {
      title: "5 Steps to 5 Stars",
      description: "Five classes that define elevated guest service",
      href: "/course",
      icon: "Award",
      featured: true,
    },
    {
      title: "AI Training Agent",
      description: "Practice real scenarios with AI coaching",
      href: "/ai-agent",
      icon: "MessageSquareText",
    },
    {
      title: "Guest Service Excellence",
      description: "The complete standards system",
      href: "/standards",
      icon: "ClipboardCheck",
    },
    {
      title: "Quiz",
      description: "Test your service knowledge",
      href: "/quiz",
      icon: "Target",
    },
    {
      title: "Learn More",
      description: "Curated resources from the ecosystem",
      href: "/learn-more",
      icon: "Lightbulb",
    },
  ],
};

export default siteConfig;