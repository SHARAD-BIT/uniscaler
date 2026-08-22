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
      "Enter your four section bands and get your overall IELTS band.",
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
    tag: "EMI, interest & total",
    description:
      "Work out your monthly EMI and total interest before you borrow.",
  },
];
