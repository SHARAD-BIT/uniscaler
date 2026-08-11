/**
 * Universities offered on the Common Application Form, with the courses under
 * each and the specialisations under each course.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THE COURSE AND SPECIALISATION LISTS BELOW ARE PLACEHOLDERS.
 *
 * The university names are the nine from the client's mock. The courses and
 * specialisations are not — nobody in this repo has that data, and three of
 * these universities (LPU, Alliance, Assam down town) appear nowhere else in the
 * project at all. They are filled in here with a plausible generic set purely so
 * the form can be looked at and clicked through.
 *
 * Replace `courses` for each university with the real lists before this goes in
 * front of anyone. Showing an applicant a specialisation the university does not
 * run is worse than showing them an empty dropdown.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Shape is deliberately the same one the planned `GET /website/applicationCatalog`
 * would return (see COMMON-APPLICATION-FORM-PLAN.md §4.1), so moving this from a
 * bundled file to a fetched endpoint later is a change of source, not of shape.
 */

const MANAGEMENT = ["Marketing", "Finance", "Human Resource Management", "Operations", "Business Analytics"];
const COMPUTING = ["Data Science", "Cyber Security", "Cloud Computing", "Artificial Intelligence"];
const COMMERCE = ["Accounting & Finance", "Banking & Insurance", "Taxation"];

/** @type {{university: string, courses: {name: string, specializations: string[]}[]}[]} */
export const applicationCatalog = [
  {
    university: "Manipal University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "MCA", specializations: COMPUTING },
      { name: "BBA", specializations: MANAGEMENT },
      { name: "BCA", specializations: COMPUTING },
      { name: "M.Com", specializations: COMMERCE },
    ],
  },
  {
    university: "SVKM's NMIMS (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "BBA", specializations: MANAGEMENT },
      { name: "B.Com", specializations: COMMERCE },
    ],
  },
  {
    university: "Lovely Professional University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "MCA", specializations: COMPUTING },
      { name: "BBA", specializations: MANAGEMENT },
      { name: "BCA", specializations: COMPUTING },
    ],
  },
  {
    university: "UPES (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "BBA", specializations: MANAGEMENT },
      { name: "BCA", specializations: COMPUTING },
    ],
  },
  {
    university: "Galgotias University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "MCA", specializations: COMPUTING },
      { name: "BBA", specializations: MANAGEMENT },
    ],
  },
  {
    university: "Christ University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "M.Com", specializations: COMMERCE },
      { name: "BBA", specializations: MANAGEMENT },
    ],
  },
  {
    university: "Alliance University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "BBA", specializations: MANAGEMENT },
      { name: "BCA", specializations: COMPUTING },
    ],
  },
  {
    university: "Assam down town University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "MCA", specializations: COMPUTING },
      { name: "B.Com", specializations: COMMERCE },
    ],
  },
  {
    university: "Bennett University (Online)",
    courses: [
      { name: "MBA", specializations: MANAGEMENT },
      { name: "MCA", specializations: COMPUTING },
      { name: "BBA", specializations: MANAGEMENT },
    ],
  },
];

/** How many universities an applicant may pick. The mock says five. */
export const MAX_UNIVERSITIES = 5;
