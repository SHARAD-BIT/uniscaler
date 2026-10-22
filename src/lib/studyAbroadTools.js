/**
 * The four free calculators: the band on /study-abroad links them, and
 * /study-abroad/tools/[tool] builds each page (routes, metadata, cross-links)
 * from the same rows — one list, so a new tool is one entry here plus its
 * calculator component in ToolsClient.jsx.
 *
 * After the reference's tools band. The maths inside each tool is standard,
 * public formula work (linear GPA conversion, the Modified Bavarian formula,
 * IELTS's published rounding rule, EMI amortisation) — nothing here is
 * theirs, and their per-tool usage figures ("14000+ students…") are their
 * numbers, so the cards carry a factual line about the tool instead.
 */
/**
 * Cost-of-living data, shared by the chooser page
 * (/study-abroad/tools/cost-of-living) and the per-country wizard pages
 * (/study-abroad/tools/cost-of-living/[country]) so the two can never
 * disagree.
 *
 * LIVING_COSTS: indicative monthly budgets for a single student, in
 * rupees, excluding tuition. Round figures by design — they are starting
 * points the user is expected to edit, not survey data. Countries match
 * the catalog's nine destinations plus Ireland, which is offered as a
 * destination without catalog programs.
 */
export const LIVING_COSTS = {
  "United States": { rent: 60000, food: 25000, transport: 8000, utilities: 12000, other: 15000 },
  "United Kingdom": { rent: 55000, food: 22000, transport: 10000, utilities: 12000, other: 14000 },
  Canada: { rent: 45000, food: 20000, transport: 8000, utilities: 10000, other: 12000 },
  Australia: { rent: 50000, food: 20000, transport: 8000, utilities: 10000, other: 12000 },
  Germany: { rent: 40000, food: 18000, transport: 6000, utilities: 10000, other: 12000 },
  France: { rent: 38000, food: 18000, transport: 6000, utilities: 9000, other: 12000 },
  Ireland: { rent: 48000, food: 18000, transport: 7000, utilities: 10000, other: 12000 },
  Finland: { rent: 35000, food: 17000, transport: 5000, utilities: 9000, other: 11000 },
  UAE: { rent: 40000, food: 16000, transport: 7000, utilities: 8000, other: 10000 },
  Hungary: { rent: 25000, food: 13000, transport: 4000, utilities: 7000, other: 8000 },
};

export const COST_LINES = [
  ["rent", "Rent & accommodation"],
  ["food", "Food & groceries"],
  ["transport", "Transport"],
  ["utilities", "Utilities & internet"],
  ["other", "Everything else"],
];

/**
 * The chooser cards, in the reference's order (its eight destinations)
 * with the two remaining catalog destinations appended. `key` is the
 * LIVING_COSTS row, `card` the short name the card shows, `slug` triples
 * as the card's flag filename under /study-abroad/flags/, the wizard
 * page's [country] URL segment, and the ?country= value.
 */
export const COST_COUNTRIES = [
  { key: "Australia", card: "Australia", slug: "australia" },
  { key: "Canada", card: "Canada", slug: "canada" },
  { key: "United States", card: "USA", slug: "united-states" },
  { key: "Germany", card: "Germany", slug: "germany" },
  { key: "France", card: "France", slug: "france" },
  { key: "Ireland", card: "Ireland", slug: "ireland" },
  { key: "United Kingdom", card: "UK", slug: "united-kingdom" },
  { key: "Finland", card: "Finland", slug: "finland" },
  { key: "UAE", card: "UAE", slug: "uae" },
  { key: "Hungary", card: "Hungary", slug: "hungary" },
];

export const studyAbroadTools = [
  {
    slug: "cgpa-to-gpa",
    name: "CGPA to GPA",
    tag: "US & German scales",
    description:
      "Convert your CGPA to a US 4.0 GPA and a German grade in seconds.",
  },
  {
    slug: "ielts-band-score",
    name: "IELTS Band Score",
    tag: "Official rounding rule",
    description:
      "Enter your section scores and get your overall IELTS band.",
  },
  {
    slug: "cost-of-living",
    name: "Cost of Living",
    tag: "10 countries covered",
    description:
      "Estimate your monthly living costs abroad, line by line, in rupees.",
  },
  {
    slug: "education-loan",
    name: "Education Loan",
    tag: "Eligibility & EMI",
    description:
      "See the loan amount you could be eligible for, and the EMI it means.",
  },
];
