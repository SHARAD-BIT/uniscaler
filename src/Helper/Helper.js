"use client";

// These are called during render in several components, and Next renders
// client components on the server too — where `document` does not exist. The
// guard makes them no-ops server-side; in the browser they behave exactly as
// they did under Vite.
const isBrowser = () => typeof document !== "undefined";

export const setCookie = (cName, cValue, expDays) => {
  if (!isBrowser()) return;
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + encodeURIComponent(cValue) + "; " + expires + "; path=/";
};

// get cookie
export const getCookie = (cname) => {
  if (!isBrowser()) return undefined;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
};

// delete cookie
export const deleteCookie = (name) => {
  if (!isBrowser()) return;
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

/**
 * Reads the cached user object out of localStorage.
 *
 * Next server-renders client components too, so a bare
 * `JSON.parse(localStorage.getItem("name"))` at render time throws
 * "localStorage is not defined" during the build. Callers should invoke this
 * from an effect, not during render, so the server and client first paint agree.
 */
export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("name"));
  } catch {
    return null;
  }
};

const medicalCourses = [
  {
    name: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
    description:
      "MBBS is an undergraduate degree in the field of medicine. It covers various aspects of medical science and clinical practice.",
    duration: "5.5 years",
    fees: "Varies (usually between ₹3,65,000 to ₹36,50,000 per year)",
    averageSalary:
      "Approximately ₹44,00,000 to ₹58,67,000 per year (varies by country and experience)",
    type: "Undergraduate",
  },
  {
    name: "MD (Doctor of Medicine)",
    description:
      "MD is a postgraduate degree that allows specialization in various fields of medicine such as Internal Medicine, Pediatrics, etc.",
    duration: "3 years",
    fees: "Varies (usually between ₹7,30,000 to ₹36,50,000 per year)",
    averageSalary:
      "Approximately ₹73,00,000 to ₹1,46,00,000 per year (varies by specialization and experience)",
    type: "Postgraduate",
  },
  {
    name: "MS (Master of Surgery)",
    description:
      "MS is a postgraduate degree focused on surgical procedures and techniques. It covers various surgical specialties.",
    duration: "3 years",
    fees: "Varies (usually between ₹7,30,000 to ₹36,50,000 per year)",
    averageSalary:
      "Approximately ₹73,00,000 to ₹1,46,00,000 per year (varies by specialization and experience)",
    type: "Postgraduate",
  },
  {
    name: "BDS (Bachelor of Dental Surgery)",
    description:
      "BDS is an undergraduate degree in dentistry. It covers the diagnosis, prevention, and treatment of oral diseases and disorders.",
    duration: "5 years",
    fees: "Varies (usually between ₹3,65,000 to ₹21,90,000 per year)",
    averageSalary:
      "Approximately ₹29,20,000 to ₹43,80,000 per year (varies by country and experience)",
    type: "Undergraduate",
  },
  {
    name: "Pharm.D (Doctor of Pharmacy)",
    description:
      "Pharm.D is a professional doctoral degree in pharmacy. It emphasizes clinical pharmacy practice and patient care.",
    duration: "6 years",
    fees: "Varies (usually between ₹3,65,000 to ₹29,20,000 per year)",
    averageSalary:
      "Approximately ₹65,40,000 to ₹87,20,000 per year (varies by industry and experience)",
    type: "Doctoral",
  },
];
const managementCourses = [
  {
    name: "Bachelor of Business Administration (BBA)",
    description:
      "BBA is an undergraduate degree program that focuses on business administration and management principles.",
    duration: "3 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹8,00,000 per year (varies by industry and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Business Administration (MBA)",
    description:
      "MBA is a postgraduate degree program that offers a broad overview of business concepts and specialized knowledge in areas like finance, marketing, or human resources.",
    duration: "2 years",
    fees: "Varies (typically between ₹2,00,000 to ₹25,00,000 per year)",
    averageSalary:
      "Approximately ₹6,00,000 to ₹25,00,000 per year (varies by industry, specialization, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Executive MBA (EMBA)",
    description:
      "EMBA is a specialized MBA program designed for experienced professionals seeking advanced management education while continuing to work.",
    duration: "1 to 2 years",
    fees: "Varies (typically between ₹5,00,000 to ₹35,00,000 for the entire program)",
    averageSalary:
      "Varies significantly based on pre-existing salary and career progression",
    type: "Postgraduate",
  },
  {
    name: "Master of Management Studies (MMS)",
    description:
      "MMS is a postgraduate management program that provides comprehensive training in management principles and practices.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,50,000 to ₹10,00,000 per year)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹12,00,000 per year (varies by industry and experience)",
    type: "Postgraduate",
  },
  {
    name: "Bachelor of Management Studies (BMS)",
    description:
      "BMS is an undergraduate management program that focuses on building a strong foundation in various aspects of business management.",
    duration: "3 years",
    fees: "Varies (typically between ₹80,000 to ₹3,00,000 per year)",
    averageSalary:
      "Approximately ₹2,00,000 to ₹6,00,000 per year (varies by industry and experience)",
    type: "Undergraduate",
  },
  {
    name: "Post Graduate Diploma in Management (PGDM)",
    description:
      "PGDM is a postgraduate diploma program that offers specialized training in management areas such as marketing, finance, human resources, and operations.",
    duration: "2 years",
    fees: "Varies (typically between ₹2,00,000 to ₹15,00,000 per year)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹10,00,000 per year (varies by industry and experience)",
    type: "Postgraduate",
  },
];
const engineeringCourses = [
  {
    name: "Bachelor of Technology (B.Tech)",
    description:
      "B.Tech is an undergraduate degree program that offers specialized education in engineering disciplines such as Computer Science, Mechanical, Electrical, Civil, Electronics & Communication, and more.",
    duration: "4 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹10,00,000 per year (varies by specialization and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Technology (M.Tech)",
    description:
      "M.Tech is a postgraduate degree program that provides advanced education and specialization in various engineering fields.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹15,00,000 per year (varies by specialization and experience)",
    type: "Postgraduate",
  },
  {
    name: "Bachelor of Engineering (BE)",
    description:
      "BE is an undergraduate degree program similar to B.Tech, offering education in various engineering disciplines.",
    duration: "4 years",
    fees: "Varies (typically between ₹80,000 to ₹4,00,000 per year)",
    averageSalary:
      "Approximately ₹2,50,000 to ₹8,00,000 per year (varies by specialization and experience)",
    type: "Undergraduate",
  },
  {
    name: "Integrated B.Tech + M.Tech",
    description:
      "Integrated programs offer a combined Bachelor's and Master's degree in engineering disciplines, allowing students to complete both degrees in a shorter duration.",
    duration: "5 years",
    fees: "Varies (typically between ₹1,00,000 to ₹6,00,000 per year)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹12,00,000 per year (varies by specialization and experience)",
    type: "Integrated",
  },
  {
    name: "Doctor of Philosophy (Ph.D.) in Engineering",
    description:
      "Ph.D. programs provide advanced research opportunities in engineering fields, allowing students to contribute to the advancement of knowledge in their chosen area of specialization.",
    duration: "3 to 5 years",
    fees: "Varies (usually funded or with minimal fees)",
    averageSalary:
      "Varies significantly based on research grants, publications, and academic positions",
    type: "Doctoral",
  },
];
const computerScienceCourses = [
  {
    name: "Bachelor of Science (B.Sc) in Computer Science",
    description:
      "B.Sc in Computer Science is an undergraduate degree program that provides a comprehensive understanding of computer science fundamentals, including programming, algorithms, data structures, and software development.",
    duration: "3 years",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹8,00,000 per year (varies by job role and experience)",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Technology (B.Tech) in Computer Science and Engineering",
    description:
      "B.Tech in Computer Science and Engineering is an undergraduate degree program that offers specialized education in computer science and engineering disciplines, covering areas such as software development, networking, database management, and cybersecurity.",
    duration: "4 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹12,00,000 per year (varies by job role and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (M.Sc) in Computer Science",
    description:
      "M.Sc in Computer Science is a postgraduate degree program that offers advanced education in computer science theories, algorithms, and applications. It focuses on research and specialization in specific areas of computer science.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹4,00,000 per year)",
    averageSalary:
      "Approximately ₹5,00,000 to ₹15,00,000 per year (varies by job role and experience)",
    type: "Postgraduate",
  },
  {
    name: "Master of Technology (M.Tech) in Computer Science and Engineering",
    description:
      "M.Tech in Computer Science and Engineering is a postgraduate degree program that provides advanced education and specialization in computer science and engineering disciplines. It focuses on research, software development, and advanced technologies.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹6,00,000 to ₹20,00,000 per year (varies by job role and experience)",
    type: "Postgraduate",
  },
  {
    name: "Doctor of Philosophy (Ph.D.) in Computer Science",
    description:
      "Ph.D. in Computer Science is a doctoral research program that allows students to explore advanced topics in computer science through research, innovation, and academic contributions. It focuses on original research and the development of new technologies.",
    duration: "3 to 5 years",
    fees: "Varies (usually funded or with minimal fees)",
    averageSalary:
      "Varies significantly based on research grants, publications, and academic positions",
    type: "Doctoral",
  },
];
const lawCourses = [
  {
    name: "Bachelor of Laws (LLB)",
    description:
      "LLB is an undergraduate degree program that provides foundational knowledge of law and legal systems. It covers subjects such as constitutional law, criminal law, contract law, and legal research.",
    duration: "3 years (for graduates) or 5 years (for undergraduates)",
    fees: "Varies (typically between ₹20,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹8,00,000 per year (varies by job role and experience)",
    type: "Undergraduate/Graduate",
  },
  {
    name: "Master of Laws (LLM)",
    description:
      "LLM is a postgraduate degree program that offers specialized education in specific areas of law. It allows students to deepen their understanding of legal concepts and pursue advanced research.",
    duration: "1 or 2 years",
    fees: "Varies (typically between ₹50,000 to ₹10,00,000 per year)",
    averageSalary:
      "Approximately ₹5,00,000 to ₹15,00,000 per year (varies by job role and experience)",
    type: "Postgraduate",
  },
  {
    name: "Doctor of Philosophy (Ph.D.) in Law",
    description:
      "Ph.D. in Law is a doctoral research program that allows students to conduct original research in legal theory, jurisprudence, and related fields. It prepares graduates for academic and research-oriented careers.",
    duration: "3 to 5 years",
    fees: "Varies (usually funded or with minimal fees)",
    averageSalary:
      "Varies significantly based on research grants, publications, and academic positions",
    type: "Doctoral",
  },
];
const financeCourses = [
  {
    name: "Bachelor of Commerce (B.Com) in Finance",
    description:
      "B.Com in Finance is an undergraduate degree program that focuses on finance-related subjects such as accounting, economics, financial management, and investment analysis.",
    duration: "3 years",
    fees: "Varies (typically between ₹20,000 to ₹3,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹6,00,000 per year (varies by job role and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Business Administration (MBA) in Finance",
    description:
      "MBA in Finance is a postgraduate degree program that offers specialized education in financial management, corporate finance, investment analysis, and financial markets.",
    duration: "2 years",
    fees: "Varies (typically between ₹2,00,000 to ₹20,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹6,00,000 to ₹20,00,000 per year (varies by job role, industry, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Chartered Financial Analyst (CFA) Program",
    description:
      "CFA Program is a professional credential offered by the CFA Institute. It covers topics such as investment analysis, portfolio management, ethics, and financial reporting. It is globally recognized for careers in investment management and financial analysis.",
    duration: "3 to 4 years (to complete all three levels)",
    fees: "Registration fee: $450 to $1,150 per level (varies by region) + Exam fee: $700 to $1,450 per level (varies by registration deadline)",
    averageSalary:
      "Varies significantly based on job role, location, and experience (CFA charterholders typically earn higher salaries)",
    type: "Professional Certification",
  },
  {
    name: "Bachelor of Business Administration (BBA) in Finance",
    description:
      "BBA in Finance is an undergraduate degree program that provides a comprehensive understanding of financial management, banking, investments, and risk management.",
    duration: "3 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹6,00,000 per year (varies by job role and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Finance and Control (MFC)",
    description:
      "MFC is a postgraduate degree program that focuses on financial planning, analysis, control, and decision-making in various sectors such as banking, insurance, and corporate finance.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹10,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹10,00,000 per year (varies by job role, industry, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Certified Public Accountant (CPA)",
    description:
      "CPA is a professional accounting designation offered by the American Institute of Certified Public Accountants (AICPA). It covers topics such as auditing, taxation, financial reporting, and business law.",
    duration: "Varies (requires passing the CPA exam)",
    fees: "Exam fees vary by jurisdiction (typically between $800 to $1,000)",
    averageSalary:
      "Varies significantly based on job role, location, and experience (CPAs typically earn competitive salaries)",
    type: "Professional Certification",
  },
  {
    name: "Financial Risk Manager (FRM) Certification",
    description:
      "FRM Certification is offered by the Global Association of Risk Professionals (GARP). It focuses on risk management practices, including market risk, credit risk, and operational risk.",
    duration: "Varies (requires passing the FRM exam)",
    fees: "Registration fee: $400 + Exam fee: $400 to $1,000 per part (varies by registration deadline)",
    averageSalary:
      "Varies significantly based on job role, location, and experience (FRM holders typically earn higher salaries)",
    type: "Professional Certification",
  },
];
const designCourses = [
  {
    name: "Bachelor of Design (B.Des)",
    description:
      "B.Des is an undergraduate degree program that focuses on various aspects of design, including graphic design, fashion design, product design, interior design, and more. It provides students with a comprehensive understanding of design principles, techniques, and tools.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹6,00,000 per year (varies by specialization, industry, and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Design (M.Des)",
    description:
      "M.Des is a postgraduate degree program that allows students to specialize further in specific areas of design, such as visual communication design, industrial design, textile design, etc. It provides advanced knowledge and skills required for professional practice in the field of design.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹10,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹4,00,000 to ₹10,00,000 per year (varies by specialization, industry, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Graphic Design",
    description:
      "This diploma program focuses specifically on graphic design, covering topics such as typography, illustration, branding, layout design, etc. It provides practical skills and knowledge necessary for entry-level positions in the graphic design industry.",
    duration: "1 year",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,00,000 to ₹4,00,000 per year (varies by industry, job role, and experience)",
    type: "Diploma",
  },
  {
    name: "Certificate Course in UI/UX Design",
    description:
      "This certificate course focuses on user interface (UI) and user experience (UX) design principles and practices. It covers topics such as wireframing, prototyping, usability testing, etc., preparing students for careers in web and app design.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹10,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,50,000 to ₹6,00,000 per year (varies by industry, job role, and experience)",
    type: "Certificate",
  },
  {
    name: "Bachelor of Fashion Design (B.F.Des)",
    description:
      "B.F.Des is an undergraduate degree program focused on fashion design. It covers various aspects of fashion, including garment construction, textile design, fashion illustration, fashion marketing, etc. Students learn to create innovative and marketable fashion designs.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹8,00,000 per year (varies by industry, specialization, and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Fashion Design (M.F.Des)",
    description:
      "M.F.Des is a postgraduate degree program that allows students to specialize further in fashion design. It provides advanced knowledge in areas such as fashion technology, sustainable fashion, fashion merchandising, etc., preparing students for leadership roles in the fashion industry.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹10,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹5,00,000 to ₹15,00,000 per year (varies by industry, specialization, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Interior Design",
    description:
      "This diploma program focuses on interior design concepts and practices. Students learn about space planning, color theory, materials, lighting, etc., and develop skills to create functional and aesthetically pleasing interior spaces. It prepares them for entry-level positions in the interior design industry.",
    duration: "1 year",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,00,000 to ₹6,00,000 per year (varies by industry, job role, and experience)",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Animation",
    description:
      "This certificate course focuses on animation techniques and software tools used in the animation industry. Students learn 2D and 3D animation, character design, motion graphics, etc., preparing them for entry-level positions in animation studios, advertising agencies, and film production companies.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹10,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,50,000 to ₹8,00,000 per year (varies by industry, job role, and experience)",
    type: "Certificate",
  },
];
const artCourses = [
  {
    name: "Bachelor of Fine Arts (BFA)",
    description:
      "BFA is an undergraduate degree program that focuses on various forms of visual arts, including painting, sculpture, drawing, printmaking, etc. Students develop their artistic skills and creativity while studying art history, art theory, and contemporary art practices.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Approximately ₹2,00,000 to ₹6,00,000 per year (varies by industry, specialization, and experience)",
    type: "Undergraduate",
  },
  {
    name: "Master of Fine Arts (MFA)",
    description:
      "MFA is a postgraduate degree program that offers advanced training in fine arts disciplines. Students deepen their understanding of art concepts, experiment with various techniques, and develop a cohesive body of work. The program often culminates in a thesis exhibition or project.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹10,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹3,00,000 to ₹10,00,000 per year (varies by industry, specialization, and experience)",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Art Education",
    description:
      "This diploma program focuses on teaching art in educational settings. It covers pedagogical techniques, curriculum development, classroom management, and assessment methods specific to art education. Graduates can pursue careers as art teachers in schools, community centers, or museums.",
    duration: "1 year",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,00,000 to ₹5,00,000 per year (varies by educational institution, location, and experience)",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Digital Art",
    description:
      "This certificate course focuses on digital art creation using various software tools and techniques. Students learn digital drawing, painting, photo manipulation, and 3D modeling, preparing them for careers in digital art production, graphic design, or multimedia industries.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹10,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Approximately ₹2,50,000 to ₹8,00,000 per year (varies by industry, job role, and experience)",
    type: "Certificate",
  },
];
const commerceCourses = [
  {
    name: "Bachelor of Commerce (B.Com)",
    description:
      "B.Com is an undergraduate degree program that covers various aspects of commerce, including accounting, finance, economics, and business management.",
    duration: "3 years",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 per year)",
    averageSalary: "Approximately ₹2,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Business Administration (BBA)",
    description:
      "BBA is an undergraduate degree program that focuses on business administration and management principles. It covers areas such as marketing, human resources, finance, operations, and strategic management.",
    duration: "3 years",
    fees: "Varies (typically between ₹50,000 to ₹2,00,000 per year)",
    averageSalary: "Approximately ₹2,50,000 to ₹7,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Commerce (M.Com)",
    description:
      "M.Com is a postgraduate degree program that provides advanced knowledge in commerce-related subjects. It offers specialization options in areas such as accounting, finance, taxation, marketing, and economics.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹2,50,000 for the entire course)",
    averageSalary: "Approximately ₹3,00,000 to ₹10,00,000 per annum",
    type: "Postgraduate",
  },
  {
    name: "Chartered Accountancy (CA)",
    description:
      "CA is a professional course offered by the Institute of Chartered Accountants of India (ICAI). It involves rigorous training in accounting, auditing, taxation, and financial management.",
    duration: "Varies (typically takes 4-5 years to complete)",
    fees: "Registration fee: ₹10,000 to ₹15,000 (plus other examination fees)",
    averageSalary:
      "Starting salary for a fresher can range from ₹5,00,000 to ₹10,00,000 per annum",
    type: "Professional",
  },
  {
    name: "Cost and Management Accountancy (CMA)",
    description:
      "CMA is a professional certification course offered by the Institute of Cost Accountants of India (ICMAI). It focuses on cost accounting, financial management, management accounting, and strategic management.",
    duration: "Varies (typically takes 3-4 years to complete)",
    fees: "Registration fee: ₹20,000 to ₹25,000 (plus other examination fees)",
    averageSalary:
      "Starting salary for a fresher can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Professional",
  },
  {
    name: "Company Secretary (CS)",
    description:
      "CS is a professional course offered by the Institute of Company Secretaries of India (ICSI). It involves the study of corporate laws, company governance, corporate secretarial practices, and corporate management.",
    duration: "Varies (typically takes 3-4 years to complete)",
    fees: "Registration fee: ₹10,000 to ₹15,000 (plus other examination fees)",
    averageSalary:
      "Starting salary for a fresher can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Professional",
  },
  // Add more commerce courses as needed
];
const architectureCourses = [
  {
    name: "Bachelor of Architecture (B.Arch)",
    description:
      "B.Arch is an undergraduate degree program that focuses on the study of architectural design, construction technology, urban planning, and building science. It prepares students for careers in architecture.",
    duration: "5 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for a fresher can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Architecture (M.Arch)",
    description:
      "M.Arch is a postgraduate degree program that provides advanced knowledge and specialization in various aspects of architecture. It allows students to explore areas such as sustainable design, historic preservation, urban design, and advanced construction techniques.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary varies depending on specialization and experience, ranging from ₹5,00,000 to ₹15,00,000 per annum",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Architecture Assistantship",
    description:
      "This diploma program trains students to assist architects in various tasks related to design, drafting, project management, and site supervision. It provides foundational knowledge in architectural principles and technical skills.",
    duration: "3 years",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 per year)",
    averageSalary:
      "Starting salary for a diploma holder can range from ₹2,00,000 to ₹4,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Bachelor of Design (B.Des) in Architecture Design",
    description:
      "B.Des in Architecture Design is an undergraduate degree program that focuses on the creative and technical aspects of architectural design. It combines elements of architecture, interior design, and environmental design.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹4,00,000 per year)",
    averageSalary:
      "Starting salary for a fresher can range from ₹3,00,000 to ₹5,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (M.Sc) in Architecture",
    description:
      "M.Sc in Architecture is a postgraduate degree program that offers specialized knowledge in areas such as sustainable architecture, urban design, digital fabrication, and architectural history. It focuses on research and advanced design skills.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary varies depending on specialization and experience, ranging from ₹5,00,000 to ₹20,00,000 per annum",
    type: "Postgraduate",
  },
  {
    name: "Ph.D. in Architecture",
    description:
      "Ph.D. in Architecture is a doctoral-level program that emphasizes research and scholarly inquiry in architectural theory, history, technology, and design. It prepares students for academic and research careers in architecture.",
    duration: "3-5 years",
    fees: "Varies depending on institution and funding (typically between ₹20,000 to ₹5,00,000 per year)",
    averageSalary:
      "Salary varies widely depending on academic or research position, with potential earnings ranging from ₹6,00,000 to ₹25,00,000 per annum",
    type: "Doctorate",
  },
  {
    name: "Postgraduate Diploma in Architectural Conservation",
    description:
      "This diploma program focuses on heritage conservation, restoration, and preservation of historic buildings and sites. It provides specialized training in conservation techniques, documentation, and management of cultural heritage.",
    duration: "1 year",
    fees: "Varies (typically between ₹30,000 to ₹2,00,000 for the entire program)",
    averageSalary:
      "Starting salary for a diploma holder can range from ₹3,00,000 to ₹6,00,000 per annum, with potential for higher earnings based on experience and expertise",
    type: "Postgraduate Diploma",
  },
];
const biotechnologyCourses = [
  {
    name: "Bachelor of Science (B.Sc) in Biotechnology",
    description:
      "B.Sc in Biotechnology is an undergraduate program that integrates principles of biology and technology to develop products and technologies to improve human life. It covers areas such as genetic engineering, molecular biology, and bioinformatics.",
    duration: "3 years",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 per year)",
    averageSalary:
      "Starting salary for graduates can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (M.Sc) in Biotechnology",
    description:
      "M.Sc in Biotechnology is a postgraduate degree program that provides advanced knowledge and skills in biotechnology research, development, and applications. It covers areas such as genetic engineering, bioinformatics, and bioprocess engineering.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹2,00,000 per year)",
    averageSalary:
      "Salary for M.Sc graduates can range from ₹4,00,000 to ₹10,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Ph.D. in Biotechnology",
    description:
      "Ph.D. in Biotechnology is a doctoral-level research program that focuses on advanced research in areas such as molecular biology, genetics, bioinformatics, and bioprocess engineering. It prepares students for careers in academia, research institutions, and industry.",
    duration: "3-5 years",
    fees: "Varies depending on institution and funding (typically between ₹20,000 to ₹5,00,000 per year)",
    averageSalary:
      "Salary for Ph.D. holders can vary widely based on position and experience, with potential earnings ranging from ₹6,00,000 to ₹25,00,000 per annum",
    type: "Doctorate",
  },
  {
    name: "Postgraduate Diploma in Biotechnology",
    description:
      "This diploma program provides specialized training in biotechnology techniques and applications. It covers areas such as recombinant DNA technology, protein engineering, and bioinformatics. It is suitable for those seeking practical skills for entry-level positions in biotech industry.",
    duration: "1 year",
    fees: "Varies (typically between ₹25,000 to ₹1,50,000 for the entire program)",
    averageSalary:
      "Starting salary for diploma holders can range from ₹2,50,000 to ₹5,00,000 per annum, with potential for higher earnings based on experience and expertise",
    type: "Postgraduate Diploma",
  },
  {
    name: "Bachelor of Technology (B.Tech) in Biotechnology Engineering",
    description:
      "B.Tech in Biotechnology Engineering is an undergraduate engineering program that combines principles of biology and engineering to develop products and technologies for various industries. It covers areas such as genetic engineering, bioinformatics, and bioprocess engineering.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹3,00,000 per year)",
    averageSalary:
      "Starting salary for B.Tech graduates can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Technology (M.Tech) in Biotechnology",
    description:
      "M.Tech in Biotechnology is a postgraduate engineering program that provides advanced knowledge and skills in biotechnology research, development, and applications. It covers areas such as genetic engineering, nanobiotechnology, and bioprocess engineering.",
    duration: "2 years",
    fees: "Varies (typically between ₹60,000 to ₹4,00,000 per year)",
    averageSalary:
      "Salary for M.Tech graduates can range from ₹6,00,000 to ₹12,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Biomedical Engineering",
    description:
      "This diploma program focuses on the application of engineering principles to the field of biology and healthcare. It covers areas such as medical imaging, biomaterials, and biomedical instrumentation.",
    duration: "2-3 years",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire program)",
    averageSalary:
      "Starting salary for diploma holders can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Clinical Research and Regulatory Affairs",
    description:
      "This certificate course provides training in clinical research methodologies, regulatory affairs, and ethical considerations in clinical trials. It is suitable for those interested in pursuing careers in clinical research organizations (CROs) or pharmaceutical companies.",
    duration: "6-12 months",
    fees: "Varies (typically between ₹10,000 to ₹50,000 for the entire course)",
    averageSalary:
      "Starting salary for certificate holders can range from ₹2,00,000 to ₹4,00,000 per annum",
    type: "Certificate",
  },
];
const hotelManagementCourses = [
  {
    name: "Bachelor of Hotel Management (BHM)",
    description:
      "BHM is an undergraduate program that focuses on various aspects of hotel management, including hospitality, catering, front office operations, food and beverage management, housekeeping, and event management.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BHM graduates can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Diploma in Hotel Management",
    description:
      "This diploma program provides comprehensive training in hotel management skills, including customer service, food production, accommodation operations, and sales and marketing in the hospitality industry.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹50,000 to ₹2,00,000 for the entire program)",
    averageSalary:
      "Starting salary for diploma holders can range from ₹2,00,000 to ₹4,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Master of Hotel Management (MHM)",
    description:
      "MHM is a postgraduate program that offers advanced knowledge and skills in hotel management, strategic planning, financial management, human resource management, and hospitality marketing.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,50,000 to ₹6,00,000 per year)",
    averageSalary:
      "Salary for MHM graduates can range from ₹5,00,000 to ₹10,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Certificate Course in Food and Beverage Service",
    description:
      "This certificate course focuses on developing skills in food and beverage service, including table etiquette, menu planning, beverage management, and customer service in restaurants and hotels.",
    duration: "6-12 months",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Starting salary for certificate holders can range from ₹1,50,000 to ₹3,00,000 per annum",
    type: "Certificate",
  },
  {
    name: "Bachelor of Arts (BA) in Hotel Management",
    description:
      "This undergraduate program offers a comprehensive understanding of hotel operations, hospitality management, customer service, and event planning.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BA graduates can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Science (BSc) in Hospitality and Hotel Administration",
    description:
      "BSc in Hospitality and Hotel Administration provides specialized knowledge in hotel operations, food production, front office management, and housekeeping.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BSc graduates can range from ₹3,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (MSc) in Hotel Management",
    description:
      "This postgraduate program offers advanced study in hotel management, strategic planning, hospitality marketing, financial management, and organizational behavior.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,50,000 to ₹6,00,000 per year)",
    averageSalary:
      "Salary for MSc graduates can range from ₹5,00,000 to ₹10,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Hospitality Management",
    description:
      "This diploma program focuses on developing practical skills in hospitality management, including guest relations, event planning, tourism management, and hotel operations.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹50,000 to ₹2,00,000 for the entire program)",
    averageSalary:
      "Starting salary for diploma holders can range from ₹2,00,000 to ₹4,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Postgraduate Diploma in Hotel Management",
    description:
      "This program provides specialized knowledge in hotel management, revenue management, food and beverage operations, and strategic planning.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹4,00,000 for the entire program)",
    averageSalary:
      "Starting salary for postgraduate diploma holders can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Hotel Management",
    description:
      "This certificate course offers basic training in hotel management skills, including front office operations, housekeeping, food and beverage service, and customer service.",
    duration: "6-12 months",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Starting salary for certificate holders can range from ₹1,50,000 to ₹3,00,000 per annum",
    type: "Certificate",
  },
];
const massCommunicationCourses = [
  {
    name: "Bachelor of Arts (BA) in Mass Communication",
    description:
      "This undergraduate program offers a comprehensive understanding of journalism, advertising, public relations, digital media, and broadcasting.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BA graduates can range from ₹2,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Journalism and Mass Communication (BJMC)",
    description:
      "BJMC focuses on journalism ethics, media laws, news reporting, editing, and media management.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BJMC graduates can range from ₹2,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Arts (MA) in Mass Communication",
    description:
      "This postgraduate program offers advanced study in media theories, communication research, multimedia journalism, and film studies.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹6,00,000 per year)",
    averageSalary:
      "Salary for MA graduates can range from ₹3,00,000 to ₹10,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Mass Communication",
    description:
      "This diploma program focuses on practical skills in journalism, photography, video production, advertising, and public relations.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹30,000 to ₹2,00,000 for the entire program)",
    averageSalary:
      "Starting salary for diploma holders can range from ₹1,50,000 to ₹4,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Postgraduate Diploma in Mass Communication",
    description:
      "This program provides specialized training in media planning, corporate communication, documentary filmmaking, and digital media strategies.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹80,000 to ₹4,00,000 for the entire program)",
    averageSalary:
      "Starting salary for postgraduate diploma holders can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Mass Communication",
    description:
      "This certificate course offers basic training in media writing, editing, reporting, and broadcasting.",
    duration: "6-12 months",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Starting salary for certificate holders can range from ₹1,50,000 to ₹3,00,000 per annum",
    type: "Certificate",
  },
  {
    name: "Bachelor of Science (BSc) in Mass Communication and Journalism",
    description:
      "This undergraduate program combines the study of mass communication with a focus on journalism, including print, broadcast, and online media.",
    duration: "3-4 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for BSc graduates can range from ₹2,00,000 to ₹6,00,000 per annum",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (MSc) in Mass Communication and Media Studies",
    description:
      "This postgraduate program offers advanced study in mass communication theories, media research methods, media management, and media ethics.",
    duration: "2 years",
    fees: "Varies (typically between ₹1,00,000 to ₹6,00,000 per year)",
    averageSalary:
      "Salary for MSc graduates can range from ₹3,00,000 to ₹10,00,000 per annum, depending on experience and specialization",
    type: "Postgraduate",
  },
  {
    name: "Advanced Diploma in Mass Communication and Digital Media",
    description:
      "This advanced diploma program focuses on digital media production, social media marketing, content creation, and multimedia storytelling.",
    duration: "1-2 years",
    fees: "Varies (typically between ₹80,000 to ₹4,00,000 for the entire program)",
    averageSalary:
      "Starting salary for advanced diploma holders can range from ₹4,00,000 to ₹8,00,000 per annum",
    type: "Diploma",
  },
  {
    name: "Short-Term Courses in Radio Jockeying (RJ), Anchoring, and Voice Modulation",
    description:
      "These short-term courses provide specialized training in radio presenting, anchoring techniques, voice modulation, and radio production.",
    duration: "3-6 months",
    fees: "Varies (typically between ₹20,000 to ₹80,000 for the entire course)",
    averageSalary:
      "Starting salary for certified professionals can range from ₹1,50,000 to ₹4,00,000 per annum",
    type: "Short-Term/Certificate",
  },
];
const educationCourses = [
  {
    name: "Bachelor of Education (B.Ed)",
    description:
      "Bachelor of Education is an undergraduate professional degree program that prepares students for a career in teaching. It covers various aspects of teaching methodology, educational psychology, classroom management, and subject-specific pedagogy.",
    duration: "2 years",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 per year)",
    averageSalary:
      "Starting salary for B.Ed graduates can range from ₹2,00,000 to ₹5,00,000 per annum, depending on the school, location, and experience.",
    type: "Undergraduate",
  },
  {
    name: "Master of Education (M.Ed)",
    description:
      "Master of Education is a postgraduate professional degree program that provides advanced training in educational research, curriculum development, educational leadership, and policy analysis. It is suitable for educators seeking to enhance their teaching skills and pursue leadership roles in education.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary for M.Ed graduates can range from ₹3,00,000 to ₹8,00,000 per annum, depending on specialization and experience.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Elementary Education (D.El.Ed)",
    description:
      "Diploma in Elementary Education is a professional diploma program for aspiring primary school teachers. It covers foundational knowledge in child development, teaching methods, educational technology, and classroom management.",
    duration: "2 years",
    fees: "Varies (typically between ₹10,000 to ₹1,00,000 per year)",
    averageSalary:
      "Starting salary for D.El.Ed graduates can range from ₹1,80,000 to ₹3,50,000 per annum, depending on the school and location.",
    type: "Diploma",
  },
  {
    name: "Certificate Course in Teaching English as a Second Language (TESL)",
    description:
      "This certificate course focuses on teaching English language skills to non-native speakers. It covers language teaching methodologies, lesson planning, language assessment, and cultural sensitivity.",
    duration: "6-12 months",
    fees: "Varies (typically between ₹5,000 to ₹50,000 for the entire course)",
    averageSalary:
      "Starting salary for TESL certificate holders can range from ₹2,00,000 to ₹4,00,000 per annum, depending on the institution and location.",
    type: "Certificate",
  },
  {
    name: "Bachelor of Arts in Education (B.A.Ed)",
    description:
      "Bachelor of Arts in Education is an undergraduate degree program that combines study in education and the liberal arts. It provides students with a broad understanding of educational theory and practice, as well as subject-specific knowledge.",
    duration: "4 years",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 per year)",
    averageSalary:
      "Starting salary for B.A.Ed graduates can range from ₹2,00,000 to ₹5,00,000 per annum, depending on the school, location, and experience.",
    type: "Undergraduate",
  },
  {
    name: "Master of Arts in Education (M.A.Ed)",
    description:
      "Master of Arts in Education is a postgraduate degree program that offers advanced study in educational theory, research methods, curriculum design, and instructional strategies. It is suitable for educators seeking leadership positions or advanced specialization.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary for M.A.Ed graduates can range from ₹3,00,000 to ₹8,00,000 per annum, depending on specialization and experience.",
    type: "Postgraduate",
  },
  {
    name: "Master of Science in Education (M.Sc.Ed)",
    description:
      "Master of Science in Education is a postgraduate degree program that focuses on specialized areas of education, such as educational psychology, educational technology, curriculum development, and assessment. It provides in-depth knowledge and skills for addressing educational challenges.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary for M.Sc.Ed graduates can range from ₹3,00,000 to ₹8,00,000 per annum, depending on specialization and experience.",
    type: "Postgraduate",
  },
  {
    name: "Ph.D. in Education",
    description:
      "Doctor of Philosophy (Ph.D.) in Education is a research-focused doctoral program that allows students to conduct original research in education and contribute to the field's knowledge base. It prepares graduates for careers in academia, research institutions, and policy organizations.",
    duration: "3-5 years",
    fees: "Varies (typically covered through scholarships or assistantships)",
    averageSalary:
      "Salary for Ph.D. holders in education can vary widely based on their specific roles and institutions, ranging from ₹6,00,000 to ₹15,00,000 per annum or more.",
    type: "Doctoral",
  },
];
const agricultureCourses = [
  {
    name: "Bachelor of Science in Agriculture (B.Sc Agriculture)",
    description:
      "B.Sc Agriculture is an undergraduate degree program that focuses on various aspects of agriculture, including crop cultivation, soil science, agricultural engineering, plant breeding, and pest management. It aims to provide students with knowledge and skills for sustainable agriculture practices.",
    duration: "4 years",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 per year)",
    averageSalary:
      "Starting salary for B.Sc Agriculture graduates can range from ₹3,00,000 to ₹6,00,000 per annum, depending on the sector and location.",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Technology in Agriculture Engineering (B.Tech Agriculture Engineering)",
    description:
      "B.Tech Agriculture Engineering is an undergraduate engineering degree program that focuses on the application of engineering principles and technology in agriculture and farming practices. It covers areas such as farm machinery, irrigation systems, bioenergy, and environmental conservation.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹3,00,000 per year)",
    averageSalary:
      "Starting salary for B.Tech Agriculture Engineering graduates can range from ₹3,50,000 to ₹7,00,000 per annum, depending on the sector and location.",
    type: "Undergraduate",
  },
  {
    name: "Master of Science in Agriculture (M.Sc Agriculture)",
    description:
      "M.Sc Agriculture is a postgraduate degree program that offers advanced study in specialized areas of agriculture, such as agronomy, horticulture, agricultural economics, and agricultural extension. It aims to equip students with advanced knowledge and research skills for addressing agricultural challenges.",
    duration: "2 years",
    fees: "Varies (typically between ₹30,000 to ₹3,00,000 per year)",
    averageSalary:
      "Salary for M.Sc Agriculture graduates can range from ₹4,00,000 to ₹8,00,000 per annum, depending on specialization and experience.",
    type: "Postgraduate",
  },
  {
    name: "Ph.D. in Agriculture",
    description:
      "Ph.D. in Agriculture is a research-focused doctoral program that allows students to conduct original research in agricultural sciences and contribute to the advancement of the field. It prepares graduates for careers in academia, research institutions, agricultural industries, and government agencies.",
    duration: "3-5 years",
    fees: "Varies (typically covered through scholarships or assistantships)",
    averageSalary:
      "Salary for Ph.D. holders in agriculture can vary widely based on their specific roles and institutions, ranging from ₹6,00,000 to ₹15,00,000 per annum or more.",
    type: "Doctoral",
  },
  {
    name: "Bachelor of Science in Horticulture (B.Sc Horticulture)",
    description:
      "B.Sc Horticulture is an undergraduate degree program that focuses on the cultivation, production, and management of fruits, vegetables, flowers, ornamental plants, and landscaping. It covers areas such as plant physiology, post-harvest management, and landscape design.",
    duration: "4 years",
    fees: "Varies (typically between ₹20,000 to ₹2,00,000 per year)",
    averageSalary:
      "Starting salary for B.Sc Horticulture graduates can range from ₹3,00,000 to ₹6,00,000 per annum, depending on the sector and location.",
    type: "Undergraduate",
  },
  {
    name: "Bachelor of Science in Agricultural Biotechnology (B.Sc Agricultural Biotechnology)",
    description:
      "B.Sc Agricultural Biotechnology is an undergraduate program that integrates principles of biotechnology with agriculture to improve crop yield, quality, and resistance to pests and diseases. It covers topics such as genetic engineering, molecular biology, and bioinformatics.",
    duration: "4 years",
    fees: "Varies (typically between ₹20,000 to ₹2,50,000 per year)",
    averageSalary:
      "Starting salary for B.Sc Agricultural Biotechnology graduates can range from ₹3,50,000 to ₹7,00,000 per annum, depending on the sector and location.",
    type: "Undergraduate",
  },
  {
    name: "Master of Business Administration in Agribusiness Management (MBA Agribusiness Management)",
    description:
      "MBA Agribusiness Management is a postgraduate management program that focuses on the business aspects of agriculture and allied sectors. It covers areas such as marketing, finance, supply chain management, and rural development in the context of agriculture.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for MBA Agribusiness Management graduates can range from ₹5,00,000 to ₹10,00,000 per annum, depending on the sector and location.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Organic Farming",
    description:
      "Diploma in Organic Farming is a short-term program that provides practical training in organic farming techniques, sustainable agriculture practices, and certification standards. It aims to promote environmentally friendly farming methods and organic food production.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹10,000 to ₹50,000 for the entire course)",
    averageSalary:
      "Salary for diploma holders in organic farming can vary based on their role and experience, typically ranging from ₹2,00,000 to ₹4,00,000 per annum.",
    type: "Diploma",
  },
];
const pharmacyCourses = [
  {
    name: "Bachelor of Pharmacy (B.Pharm)",
    description:
      "B.Pharm is an undergraduate degree program that focuses on pharmaceutical sciences, including drug composition, formulation, manufacturing, and distribution. It also covers topics such as pharmacology, pharmacognosy, and pharmaceutical chemistry.",
    duration: "4 years",
    fees: "Varies (typically between ₹50,000 to ₹3,00,000 per year)",
    averageSalary:
      "Starting salary for B.Pharm graduates can range from ₹2,00,000 to ₹5,00,000 per annum, depending on the sector and location.",
    type: "Undergraduate",
  },
  {
    name: "Doctor of Pharmacy (Pharm.D)",
    description:
      "Pharm.D is a professional doctoral degree program that prepares students for careers as pharmacists. It emphasizes clinical pharmacy practice, patient care, and medication therapy management. Pharm.D graduates are trained to work in hospitals, clinics, and community pharmacies.",
    duration: "6 years (5 years of academic study and 1 year of internship)",
    fees: "Varies (typically between ₹1,00,000 to ₹5,00,000 per year)",
    averageSalary:
      "Starting salary for Pharm.D graduates can range from ₹3,00,000 to ₹8,00,000 per annum, depending on the sector and location.",
    type: "Doctorate",
  },
  {
    name: "Master of Pharmacy (M.Pharm)",
    description:
      "M.Pharm is a postgraduate degree program that offers specialized knowledge in various areas of pharmacy, such as pharmaceutical analysis, pharmacology, pharmaceutics, pharmacognosy, and medicinal chemistry. It prepares students for research, development, and manufacturing roles in the pharmaceutical industry.",
    duration: "2 years",
    fees: "Varies (typically between ₹50,000 to ₹4,00,000 per year)",
    averageSalary:
      "Starting salary for M.Pharm graduates can range from ₹3,50,000 to ₹7,50,000 per annum, depending on the specialization and location.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Pharmacy (D.Pharm)",
    description:
      "D.Pharm is a diploma program that provides basic knowledge and skills in pharmacy practice, drug dispensing, and pharmaceutical sciences. It is suitable for individuals who want to start their careers as pharmacy technicians or assistants.",
    duration: "2 years",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Salary for D.Pharm holders can vary based on their role and experience, typically ranging from ₹1,50,000 to ₹3,50,000 per annum.",
    type: "Diploma",
  },
  {
    name: "Pharmacy Technician Certificate",
    description:
      "This certificate program provides training in pharmacy basics, including drug dosage calculations, medication dispensing, inventory management, and pharmacy law and ethics. It prepares students for entry-level positions as pharmacy technicians in retail and hospital pharmacies.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹10,000 to ₹50,000 for the entire course)",
    averageSalary:
      "Starting salary for pharmacy technicians can range from ₹1,20,000 to ₹2,40,000 per annum, depending on the employer and location.",
    type: "Certificate",
  },
  {
    name: "Pharmacy Management and Administration Course",
    description:
      "This course focuses on the business aspects of pharmacy practice, including financial management, human resources, marketing, and regulatory compliance. It is designed for pharmacists who want to advance their careers into management positions or open their own pharmacies.",
    duration: "6 months to 1 year",
    fees: "Varies (typically between ₹20,000 to ₹1,00,000 for the entire course)",
    averageSalary:
      "Salary for pharmacy managers and administrators can vary widely based on their level of experience and the size of the pharmacy, ranging from ₹3,00,000 to ₹10,00,000 per annum.",
    type: "Professional Development",
  },
  {
    name: "Pharmacovigilance Certification Course",
    description:
      "This certification program trains professionals in pharmacovigilance principles, adverse drug reaction reporting, drug safety monitoring, and regulatory compliance. It is suitable for pharmacists, life science graduates, and healthcare professionals interested in drug safety and surveillance.",
    duration: "3 to 6 months",
    fees: "Varies (typically between ₹15,000 to ₹75,000 for the entire course)",
    averageSalary:
      "Salary for pharmacovigilance professionals can range from ₹3,00,000 to ₹8,00,000 per annum, depending on experience and expertise.",
    type: "Certification",
  },
];
const aviationCourses = [
  {
    name: "Commercial Pilot License (CPL)",
    description:
      "The CPL program trains individuals to become professional pilots who can fly aircraft for commercial purposes. It includes rigorous flight training, theoretical knowledge exams, and practical flight experience. CPL holders can work as airline pilots, charter pilots, flight instructors, or corporate pilots.",
    duration: "1 to 2 years",
    fees: "Varies widely depending on the flight school and country of training. Can range from ₹20,00,000 to ₹50,00,000 or more.",
    averageSalary:
      "Starting salary for commercial pilots can vary significantly depending on factors such as the type of aircraft flown, employer, and experience level. Salaries typically range from ₹5,00,000 to ₹20,00,000 per annum.",
    type: "Professional Pilot Training",
  },
  {
    name: "Airline Transport Pilot License (ATPL)",
    description:
      "The ATPL is the highest level of pilot certification and qualifies individuals to act as the pilot-in-command of large commercial aircraft. It requires extensive flight training, experience, and passing of rigorous theoretical knowledge exams. ATPL holders often work as captains for major airlines.",
    duration: "2 to 4 years",
    fees: "Costs can be substantial, often ranging from ₹30,00,000 to ₹1 crore or more for the entire training program.",
    averageSalary:
      "Salaries for airline transport pilots, especially captains on large commercial jets, can be substantial, ranging from ₹20,00,000 to ₹50,00,000 or more annually, depending on the airline and experience.",
    type: "Advanced Pilot Training",
  },
  {
    name: "Aircraft Maintenance Engineering (AME)",
    description:
      "AME programs train individuals to maintain and repair aircraft to ensure their airworthiness and safety. The curriculum covers areas such as aircraft systems, avionics, engines, and regulations. AMEs work in maintenance facilities, airlines, and aircraft manufacturing companies.",
    duration: "3 to 4 years",
    fees: "Tuition fees can vary depending on the institution and country of study. Costs typically range from ₹5,00,000 to ₹15,00,000 for the entire course.",
    averageSalary:
      "Salaries for aircraft maintenance engineers can vary based on experience, employer, and location. Entry-level salaries range from ₹3,00,000 to ₹6,00,000 per annum, with higher earnings possible with experience and specialization.",
    type: "Technical Training",
  },
  {
    name: "Flight Attendant Training",
    description:
      "Flight attendant training programs prepare individuals to work as cabin crew members on commercial flights. The training covers safety procedures, customer service skills, emergency response, and aircraft-specific protocols. Flight attendants ensure passenger comfort and safety during flights.",
    duration: "4 to 8 weeks",
    fees: "Costs for flight attendant training programs can vary depending on the institution and country. Typically range from ₹50,000 to ₹2,00,000.",
    averageSalary:
      "Flight attendants' salaries vary based on factors such as the airline, experience, and location. Starting salaries range from ₹3,00,000 to ₹6,00,000 per annum, with potential for higher earnings through seniority and international flights.",
    type: "Cabin Crew Training",
  },
  {
    name: "Airport Management Course",
    description:
      "Airport management courses focus on the operations and administration of airports. Students learn about airport planning, security, ground handling, aviation regulations, and passenger services. Graduates can pursue careers in airport management, operations, or administration.",
    duration: "1 to 2 years",
    fees: "Tuition fees for airport management courses vary depending on the institution and level of study. Costs typically range from ₹1,00,000 to ₹5,00,000.",
    averageSalary:
      "Salaries for airport managers vary based on factors such as the size of the airport and experience. Entry-level salaries range from ₹3,00,000 to ₹6,00,000 per annum, with higher earnings possible for senior management positions.",
    type: "Airport Operations",
  },
  {
    name: "Aviation Safety Management Systems (SMS)",
    description:
      "Aviation SMS courses focus on implementing safety management systems within aviation organizations. Students learn about risk management, safety protocols, regulatory compliance, and incident reporting. Graduates can work as safety managers, auditors, or consultants in the aviation industry.",
    duration: "6 months to 1 year",
    fees: "Course fees for aviation SMS programs vary depending on the institution and format of study. Costs typically range from ₹50,000 to ₹2,00,000.",
    averageSalary:
      "Salaries for aviation safety professionals vary based on experience and employer. Entry-level positions may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum, with potential for higher earnings with experience and specialization.",
    type: "Safety Management",
  },
];
const environmentalScienceCourses = [
  {
    name: "Bachelor of Science in Environmental Science",
    description:
      "A Bachelor of Science in Environmental Science provides students with a comprehensive understanding of environmental issues, including ecology, conservation, pollution control, and sustainable resource management. Students learn to analyze environmental problems and develop solutions to address them.",
    duration: "3 to 4 years",
    fees: "Tuition fees for a bachelor's degree in environmental science vary depending on the institution and country. Costs typically range from ₹50,000 to ₹5,00,000 per year.",
    averageSalary:
      "Entry-level positions for environmental scientists may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum. With experience and specialization, professionals can earn higher salaries, with potential for salaries exceeding ₹10,00,000 per annum in senior roles.",
    type: "Undergraduate",
  },
  {
    name: "Master of Science in Environmental Management",
    description:
      "A Master of Science in Environmental Management focuses on advanced concepts in environmental science, policy, and management. Students gain skills in environmental assessment, policy analysis, sustainability planning, and project management. Graduates can pursue careers in environmental consulting, government agencies, or non-profit organizations.",
    duration: "1 to 2 years",
    fees: "Tuition fees for a master's degree in environmental management vary depending on the institution and program. Costs typically range from ₹1,00,000 to ₹10,00,000 per year.",
    averageSalary:
      "Salaries for environmental managers vary based on factors such as experience, industry, and location. Entry-level positions may offer salaries ranging from ₹4,00,000 to ₹8,00,000 per annum, while experienced professionals can earn upwards of ₹15,00,000 per annum.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Environmental Science",
    description:
      "A Diploma in Environmental Science provides foundational knowledge in environmental studies, focusing on topics such as ecology, pollution, conservation, and sustainability. The program typically includes fieldwork and practical training to equip students with hands-on skills.",
    duration: "6 months to 1 year",
    fees: "Diploma program fees vary depending on the institution and duration of study. Costs typically range from ₹20,000 to ₹1,00,000.",
    averageSalary:
      "Salaries for individuals with a diploma in environmental science vary depending on the role and employer. Entry-level positions may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with experience.",
    type: "Diploma",
  },
  {
    name: "Bachelor of Science in Environmental Science",
    description:
      "A Bachelor of Science in Environmental Science provides students with a comprehensive understanding of environmental issues, including ecology, conservation, pollution control, and sustainable resource management. Students learn to analyze environmental problems and develop solutions to address them.",
    duration: "3 to 4 years",
    fees: "Tuition fees for a bachelor's degree in environmental science vary depending on the institution and country. Costs typically range from ₹50,000 to ₹5,00,000 per year.",
    averageSalary:
      "Entry-level positions for environmental scientists may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum. With experience and specialization, professionals can earn higher salaries, with potential for salaries exceeding ₹10,00,000 per annum in senior roles.",
    type: "Undergraduate",
  },
  {
    name: "Master of Science in Environmental Management",
    description:
      "A Master of Science in Environmental Management focuses on advanced concepts in environmental science, policy, and management. Students gain skills in environmental assessment, policy analysis, sustainability planning, and project management. Graduates can pursue careers in environmental consulting, government agencies, or non-profit organizations.",
    duration: "1 to 2 years",
    fees: "Tuition fees for a master's degree in environmental management vary depending on the institution and program. Costs typically range from ₹1,00,000 to ₹10,00,000 per year.",
    averageSalary:
      "Salaries for environmental managers vary based on factors such as experience, industry, and location. Entry-level positions may offer salaries ranging from ₹4,00,000 to ₹8,00,000 per annum, while experienced professionals can earn upwards of ₹15,00,000 per annum.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Environmental Science",
    description:
      "A Diploma in Environmental Science provides foundational knowledge in environmental studies, focusing on topics such as ecology, pollution, conservation, and sustainability. The program typically includes fieldwork and practical training to equip students with hands-on skills.",
    duration: "6 months to 1 year",
    fees: "Diploma program fees vary depending on the institution and duration of study. Costs typically range from ₹20,000 to ₹1,00,000.",
    averageSalary:
      "Salaries for individuals with a diploma in environmental science vary depending on the role and employer. Entry-level positions may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with experience.",
    type: "Diploma",
  },
  {
    name: "PhD in Environmental Science",
    description:
      "A PhD in Environmental Science is a research-focused program designed to prepare students for academic or research careers in environmental science. Students conduct original research in areas such as environmental chemistry, biology, or policy, contributing to the advancement of knowledge in the field.",
    duration: "3 to 5 years",
    fees: "Tuition fees for a PhD in environmental science vary widely depending on the institution, program structure, and funding availability. Costs can range from ₹1,00,000 to ₹10,00,000 or more for the entire duration of the program.",
    averageSalary:
      "Salaries for individuals with a PhD in environmental science can vary greatly depending on their career path. In academia, starting salaries for assistant professors may range from ₹6,00,000 to ₹12,00,000 per annum, while experienced professors can earn upwards of ₹20,00,000 per annum. Research scientists in government or private sectors may earn similar or higher salaries based on experience and expertise.",
    type: "Doctorate",
  },
  {
    name: "Postgraduate Diploma in Environmental Law",
    description:
      "A Postgraduate Diploma in Environmental Law provides specialized knowledge in environmental legislation and regulations. Students learn about environmental policies, conservation laws, and legal frameworks for environmental protection. The program prepares graduates for careers in environmental law firms, government agencies, or advocacy organizations.",
    duration: "1 year",
    fees: "Tuition fees for a postgraduate diploma in environmental law vary depending on the institution and program structure. Costs typically range from ₹50,000 to ₹3,00,000.",
    averageSalary:
      "Salaries for environmental lawyers vary depending on factors such as experience, location, and employer. Entry-level positions may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum, while experienced lawyers can earn significantly higher salaries, with potential for earnings exceeding ₹20,00,000 per annum in senior roles or private practice.",
    type: "Postgraduate Diploma",
  },
];
const journalismCourses = [
  {
    name: "Bachelor of Journalism and Mass Communication (BJMC)",
    description:
      "A Bachelor of Journalism and Mass Communication (BJMC) program provides students with comprehensive training in journalism, mass media, and communication. It covers areas such as news reporting, editing, digital media, advertising, and public relations. The program prepares students for careers in journalism, broadcasting, advertising, and related fields.",
    duration: "3 years",
    fees: "The tuition fees for a BJMC program vary depending on the institution and country. Costs typically range from ₹50,000 to ₹5,00,000 per year.",
    averageSalary:
      "Entry-level positions in journalism may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum. With experience and specialization, professionals can earn higher salaries, with potential for earnings exceeding ₹10,00,000 per annum in senior roles or with prominent media organizations.",
    type: "Undergraduate",
  },
  {
    name: "Master of Journalism and Mass Communication (MJMC)",
    description:
      "A Master of Journalism and Mass Communication (MJMC) program offers advanced study in journalism, media management, and communication theory. It provides opportunities for specialization in areas such as investigative journalism, multimedia reporting, or digital media production. Graduates can pursue careers in journalism, media management, research, or academia.",
    duration: "2 years",
    fees: "The tuition fees for an MJMC program vary depending on the institution and program structure. Costs typically range from ₹1,00,000 to ₹10,00,000 per year.",
    averageSalary:
      "Salaries for graduates with an MJMC degree vary based on factors such as experience, specialization, and employer. Entry-level positions may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum, with potential for higher earnings with experience and expertise.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Journalism",
    description:
      "A Diploma in Journalism program provides foundational training in journalism principles, news writing, media ethics, and reporting techniques. It typically includes practical assignments and internships to develop students' skills in news gathering, interviewing, and storytelling. Graduates can pursue entry-level positions in print, broadcast, or digital media organizations.",
    duration: "6 months to 1 year",
    fees: "The tuition fees for a diploma program in journalism vary depending on the institution and duration of study. Costs typically range from ₹20,000 to ₹1,00,000.",
    averageSalary:
      "Salaries for individuals with a diploma in journalism vary depending on the role and employer. Entry-level positions may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with experience and specialization.",
    type: "Diploma",
  },
  {
    name: "PhD in Journalism and Mass Communication",
    description:
      "A PhD in Journalism and Mass Communication is a research-focused program designed to prepare scholars and researchers in the field of media studies. Students conduct original research, contribute to academic literature, and pursue specialized areas of inquiry within journalism and mass communication. Graduates can pursue careers in academia, research institutions, or media organizations.",
    duration: "3 to 5 years",
    fees: "The tuition fees for a PhD program in journalism and mass communication vary widely depending on the institution, program structure, and funding availability. Costs can range from ₹1,00,000 to ₹10,00,000 or more for the entire duration of the program.",
    averageSalary:
      "Salaries for individuals with a PhD in journalism and mass communication can vary greatly depending on their career path. In academia, starting salaries for assistant professors may range from ₹6,00,000 to ₹12,00,000 per annum, while experienced professors can earn upwards of ₹20,00,000 per annum. Researchers in government or private sectors may earn similar or higher salaries based on experience and expertise.",
    type: "Doctorate",
  },
];
const animationCourses = [
  {
    name: "Bachelor of Fine Arts (BFA) in Animation",
    description:
      "A Bachelor of Fine Arts (BFA) in Animation program provides students with comprehensive training in 2D and 3D animation, digital modeling, character design, and storytelling. It covers both technical skills and artistic principles necessary for creating animated films, video games, and multimedia content. The program prepares students for careers as animators, visual effects artists, or game designers.",
    duration: "4 years",
    fees: "The tuition fees for a BFA in Animation program vary depending on the institution and country. Costs typically range from ₹2,00,000 to ₹10,00,000 per year.",
    averageSalary:
      "Entry-level positions in animation may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum. With experience and specialization, professionals can earn higher salaries, with potential for earnings exceeding ₹10,00,000 per annum in senior roles or with renowned animation studios.",
    type: "Undergraduate",
  },
  {
    name: "Master of Fine Arts (MFA) in Animation",
    description:
      "A Master of Fine Arts (MFA) in Animation program offers advanced study in animation production, visual effects, and digital storytelling. It provides opportunities for specialization in areas such as character animation, motion graphics, or experimental animation techniques. Graduates can pursue careers in animation studios, film production companies, advertising agencies, or as independent filmmakers.",
    duration: "2 years",
    fees: "The tuition fees for an MFA in Animation program vary depending on the institution and program structure. Costs typically range from ₹2,00,000 to ₹15,00,000 per year.",
    averageSalary:
      "Salaries for graduates with an MFA in Animation vary based on factors such as experience, specialization, and employer. Entry-level positions may offer salaries ranging from ₹4,00,000 to ₹8,00,000 per annum, with potential for higher earnings with experience and expertise.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Animation",
    description:
      "A Diploma in Animation program provides foundational training in animation techniques, digital tools, and storytelling fundamentals. It covers topics such as character design, storyboard creation, and animation production pipelines. The program prepares students for entry-level positions in animation studios, advertising agencies, or digital media companies.",
    duration: "1 year to 18 months",
    fees: "The tuition fees for a diploma program in animation vary depending on the institution and duration of study. Costs typically range from ₹50,000 to ₹3,00,000.",
    averageSalary:
      "Salaries for individuals with a diploma in animation vary depending on the role and employer. Entry-level positions may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with experience and specialization.",
    type: "Diploma",
  },
  {
    name: "Certificate Courses in Animation",
    description:
      "Certificate courses in animation provide short-term training in specific areas of animation, such as 2D animation, 3D modeling, or visual effects. These courses are designed for individuals seeking basic skills or specialization in a particular aspect of animation production. Graduates can pursue entry-level positions or use the skills acquired to enhance their existing careers.",
    duration: "3 to 12 months",
    fees: "The tuition fees for certificate courses in animation vary depending on the institution and duration of study. Costs typically range from ₹20,000 to ₹1,00,000.",
    averageSalary:
      "Salaries for individuals with a certificate in animation depend on their skill level and the demand for specific expertise in the industry. Entry-level positions may offer salaries ranging from ₹1,50,000 to ₹3,00,000 per annum.",
    type: "Certificate",
  },
  {
    name: "Bachelor of Science (BSc) in Animation and Visual Effects",
    description:
      "A Bachelor of Science (BSc) in Animation and Visual Effects program focuses on the technical aspects of animation production, including 3D modeling, texturing, rigging, and compositing. It provides students with the skills needed to create realistic visual effects and immersive animated worlds for film, television, and video games.",
    duration: "3 years",
    fees: "The tuition fees for a BSc in Animation and Visual Effects program vary depending on the institution and country. Costs typically range from ₹1,50,000 to ₹8,00,000 per year.",
    averageSalary:
      "Graduates with a BSc in Animation and Visual Effects can pursue careers as 3D modelers, texture artists, rigging specialists, or visual effects supervisors. Entry-level salaries may range from ₹2,50,000 to ₹5,00,000 per annum.",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (MSc) in Computer Animation",
    description:
      "A Master of Science (MSc) in Computer Animation program offers advanced study in computer graphics, animation algorithms, and simulation techniques. It is designed for individuals seeking specialization in technical aspects of animation production, such as motion capture, physics-based animation, or procedural animation systems.",
    duration: "1 to 2 years",
    fees: "The tuition fees for an MSc in Computer Animation program vary depending on the institution and program structure. Costs typically range from ₹2,00,000 to ₹12,00,000 per year.",
    averageSalary:
      "Salaries for graduates with an MSc in Computer Animation depend on their specialization and expertise. Entry-level positions may offer salaries ranging from ₹4,00,000 to ₹8,00,000 per annum, with potential for higher earnings in specialized roles or with experience.",
    type: "Postgraduate",
  },
  {
    name: "Advanced Diploma in Animation and Gaming",
    description:
      "An Advanced Diploma in Animation and Gaming program provides comprehensive training in animation production and game development. It covers topics such as character animation, level design, game programming, and interactive storytelling. Graduates can pursue careers as game designers, animators, or technical artists in the gaming industry.",
    duration: "2 years",
    fees: "The tuition fees for an advanced diploma program in animation and gaming vary depending on the institution and duration of study. Costs typically range from ₹1,00,000 to ₹5,00,000.",
    averageSalary:
      "Salaries for individuals with an advanced diploma in animation and gaming vary based on their skills and the demand for talent in the gaming industry. Entry-level positions may offer salaries ranging from ₹3,00,000 to ₹6,00,000 per annum.",
    type: "Diploma",
  },
  {
    name: "Postgraduate Certificate in Animation Production",
    description:
      "A Postgraduate Certificate in Animation Production program is designed for individuals with prior experience in animation or related fields who wish to enhance their skills in animation production management and leadership. It covers topics such as project management, team coordination, and production pipeline optimization.",
    duration: "6 months to 1 year",
    fees: "The tuition fees for a postgraduate certificate program in animation production vary depending on the institution and program duration. Costs typically range from ₹50,000 to ₹3,00,000.",
    averageSalary:
      "Salaries for individuals with a postgraduate certificate in animation production depend on their level of experience and the complexity of projects they manage. Experienced production managers can earn salaries ranging from ₹6,00,000 to ₹15,00,000 per annum.",
    type: "Certificate",
  },
];
const nursingCourses = [
  {
    name: "Bachelor of Science (BSc) in Nursing",
    description:
      "A Bachelor of Science (BSc) in Nursing program prepares students for careers as registered nurses (RNs). It covers foundational topics in nursing theory, health assessment, pharmacology, and clinical practice. Graduates are eligible to take licensure exams and work in a variety of healthcare settings, including hospitals, clinics, and community health agencies.",
    duration: "4 years",
    fees: "The tuition fees for a BSc in Nursing program vary depending on the institution and country. Costs typically range from ₹50,000 to ₹3,00,000 per year.",
    averageSalary:
      "Registered nurses (RNs) can earn competitive salaries based on their experience, specialization, and location. Entry-level salaries may range from ₹2,50,000 to ₹5,00,000 per annum, with potential for higher earnings with advanced degrees or certifications.",
    type: "Undergraduate",
  },
  {
    name: "Master of Science (MSc) in Nursing",
    description:
      "A Master of Science (MSc) in Nursing program offers advanced study in nursing practice, education, or administration. It is designed for registered nurses (RNs) seeking specialization in areas such as nurse practitioner, nurse educator, or nurse leader. Graduates can pursue advanced practice roles, teaching positions, or leadership positions in healthcare organizations.",
    duration: "1 to 2 years",
    fees: "The tuition fees for an MSc in Nursing program vary depending on the institution and program structure. Costs typically range from ₹1,00,000 to ₹8,00,000 per year.",
    averageSalary:
      "Salaries for nurses with a master's degree in nursing depend on their specialization and role. Nurse practitioners, nurse educators, and nurse leaders can earn salaries ranging from ₹4,00,000 to ₹15,00,000 per annum, depending on their experience and location.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Nursing",
    description:
      "A Diploma in Nursing program provides practical training in nursing skills and clinical practice. It is typically offered as a vocational or practical nursing program and prepares students for entry-level positions as licensed practical nurses (LPNs) or licensed vocational nurses (LVNs). Graduates can work under the supervision of registered nurses (RNs) in various healthcare settings.",
    duration: "2 to 3 years",
    fees: "The tuition fees for a diploma in nursing program vary depending on the institution and duration of study. Costs typically range from ₹30,000 to ₹2,00,000 per year.",
    averageSalary:
      "Licensed practical nurses (LPNs) or licensed vocational nurses (LVNs) earn competitive salaries based on their experience and location. Entry-level salaries may range from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with additional certifications or specialized training.",
    type: "Diploma",
  },
  {
    name: "Postgraduate Certificate in Nursing Education",
    description:
      "A Postgraduate Certificate in Nursing Education program is designed for registered nurses (RNs) seeking specialization in nursing education. It covers curriculum development, teaching strategies, and assessment methods for nursing education. Graduates can pursue teaching positions in nursing schools, staff development roles in healthcare institutions, or educational leadership positions.",
    duration: "6 months to 1 year",
    fees: "The tuition fees for a postgraduate certificate program in nursing education vary depending on the institution and program duration. Costs typically range from ₹50,000 to ₹3,00,000.",
    averageSalary:
      "Salaries for nurses with a postgraduate certificate in nursing education depend on their role and level of experience. Nurse educators can earn salaries ranging from ₹4,00,000 to ₹10,00,000 per annum, depending on their teaching responsibilities and academic qualifications.",
    type: "Certificate",
  },
];
const tourismCourses = [
  {
    name: "Bachelor of Arts (BA) in Tourism Management",
    description:
      "A Bachelor of Arts (BA) in Tourism Management program provides students with a comprehensive understanding of the tourism industry, including tourism planning, marketing, hospitality management, and sustainable tourism practices. Graduates can pursue careers in tourism management, destination marketing organizations, travel agencies, and hospitality sectors.",
    duration: "3 years",
    fees: "The tuition fees for a BA in Tourism Management program vary depending on the institution and country. Costs typically range from ₹50,000 to ₹3,00,000 per year.",
    averageSalary:
      "Salaries for graduates with a BA in Tourism Management vary based on their role, experience, and location. Entry-level positions in tourism management or travel agencies may offer salaries ranging from ₹2,00,000 to ₹5,00,000 per annum, with potential for higher earnings with experience and career progression.",
    type: "Undergraduate",
  },
  {
    name: "Master of Tourism Administration (MTA)",
    description:
      "A Master of Tourism Administration (MTA) program offers advanced study in tourism management, policy analysis, sustainable tourism development, and destination marketing. It prepares graduates for leadership roles in tourism organizations, government agencies, and consulting firms. Students gain practical skills and theoretical knowledge to address contemporary issues in the tourism industry.",
    duration: "2 years",
    fees: "The tuition fees for an MTA program vary depending on the institution and program structure. Costs typically range from ₹1,00,000 to ₹8,00,000 per year.",
    averageSalary:
      "Salaries for graduates with an MTA degree depend on their specialization and level of experience. Tourism administrators, destination managers, and tourism policy analysts can earn salaries ranging from ₹4,00,000 to ₹15,00,000 per annum, depending on their role and responsibilities.",
    type: "Postgraduate",
  },
  {
    name: "Diploma in Travel and Tourism Management",
    description:
      "A Diploma in Travel and Tourism Management program offers practical training in travel agency operations, tour planning, ticketing, and customer service skills. It prepares students for entry-level positions in the tourism industry, including travel agencies, tour operators, airlines, and hospitality sectors. Graduates gain hands-on experience and industry-specific knowledge to meet the demands of the tourism market.",
    duration: "1 to 2 years",
    fees: "The tuition fees for a diploma program in travel and tourism management vary depending on the institution and duration of study. Costs typically range from ₹30,000 to ₹2,00,000 per year.",
    averageSalary:
      "Salaries for graduates with a diploma in travel and tourism management vary based on their role and experience. Entry-level positions in travel agencies or tour operators may offer salaries ranging from ₹2,00,000 to ₹4,00,000 per annum, with potential for higher earnings with specialized skills or certifications.",
    type: "Diploma",
  },
  {
    name: "Certificate in Hospitality and Tourism Management",
    description:
      "A Certificate in Hospitality and Tourism Management program provides foundational knowledge and skills in hospitality operations, tourism marketing, and customer service. It is designed for individuals seeking entry-level positions in hotels, resorts, travel agencies, and tourism organizations. Graduates can pursue roles as hotel associates, tour coordinators, or travel consultants.",
    duration: "6 months to 1 year",
    fees: "The tuition fees for a certificate program in hospitality and tourism management vary depending on the institution and program duration. Costs typically range from ₹20,000 to ₹1,00,000.",
    averageSalary:
      "Salaries for graduates with a certificate in hospitality and tourism management depend on their role and level of experience. Entry-level positions in hospitality or tourism sectors may offer salaries ranging from ₹1,50,000 to ₹3,50,000 per annum, with potential for higher earnings with career advancement.",
    type: "Certificate",
  },
];

export const AllCourse = [
  {
    name: "medical",
    data: medicalCourses,
  },
  {
    name: "engineering",
    data: engineeringCourses,
  },
  {
    name: "management",
    data: managementCourses,
  },
  {
    name: "computer",
    data: computerScienceCourses,
  },
  {
    name: "law",
    data: lawCourses,
  },
  {
    name: "finance",
    data: financeCourses,
  },
  {
    name: "design",
    data: designCourses,
  },
  {
    name: "arts",
    data: artCourses,
  },
  {
    name: "commerce",
    data: commerceCourses,
  },
  {
    name: "architecture",
    data: architectureCourses,
  },
  {
    name: "biotechnology",
    data: biotechnologyCourses,
  },
  {
    name: "agriculture",
    data: agricultureCourses,
  },
  {
    name: "hotel-management",
    data: hotelManagementCourses,
  },
  {
    name: "mass-communication",
    data: massCommunicationCourses,
  },
  {
    name: "education",
    data: educationCourses,
  },
  {
    name: "pharmacy",
    data: pharmacyCourses,
  },
  {
    name: "aviation",
    data: aviationCourses,
  },
  {
    name: "environment",
    data: environmentalScienceCourses,
  },
  {
    name: "journalism",
    data: journalismCourses,
  },
  {
    name: "animation",
    data: animationCourses,
  },
  {
    name: "nursing",
    data: nursingCourses,
  },
  {
    name: "tourism",
    data: tourismCourses,
  },
];

export const onlineCourseDetails = [
  {
    name: "BBA",
    ddp: [
      {
        name: "Diploma in Digital Marketing",
        details: "A Diploma in Digital Marketing is an educational program designed to provide students with comprehensive knowledge and skills in the field of digital marketing. This diploma covers various aspects of online marketing, including search engine optimization (SEO), social media marketing, email marketing, content creation, analytics, and more. Here’s an overview of what you might expect from such a program",
        keyPoints: [
          {
            key: "Introduction to Digital Marketing",
            details: [
              " Overview of digital marketing strategies and tools.",
              "Differences between traditional and digital marketing."
            ]
          }, {
            key: "Search Engine Optimization (SEO)",
            details: [
              "On-page and off-page SEO techniques.",
              "Keyword research and analysis.",
              "Understanding search engine algorithms and ranking factors."
            ]
          }, {
            key: "Social Media Marketing",
            details: [
              "Strategies for marketing on platforms like Facebook, Instagram, Twitter, LinkedIn, etc.",
              "Creating and managing social media campaigns.",
              "Social media analytics and performance measurement."
            ]
          }, {
            key: "Content Marketing",
            details: [
              "Content creation strategies.",
              "Blogging, video marketing, and podcasting.",
              "Content distribution and promotion."
            ]
          }, {
            key: "Email Marketing",
            details: [
              "Building email lists.",
              "Crafting effective email campaigns.",
              "Analyzing email marketing metrics."
            ]
          }, {
            key: "other",
            details: [
              "Digital Marketing Strategy",
              "Web Analytics",
              "Pay-Per-Click (PPC) Advertising"
            ]
          }
        ],
        benefit: [
          "Career Opportunities: Prepares you for roles such as digital marketing specialist, social media manager, SEO analyst, content marketer, and more.",
          "Skill Development: Gain hands-on experience with tools and platforms used in the industry.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in digital marketing.",
          "Networking: Opportunity to connect with peers, instructors, and industry professionals."
        ],
        eligibility: "10+2"
      }, {
        name: "Diploma in Financial Services & Portfolio Management",
        details: "A Diploma in Financial Services and Portfolio Management is an educational program aimed at providing students with the necessary skills and knowledge to manage financial portfolios and offer financial services. This diploma focuses on various aspects of financial markets, investment strategies, risk management, and financial planning. Here’s an overview of what you might expect from such a program",
        keyPoints: [
          {
            key: "Introduction to Financial Services",
            details: [
              "Overview of the financial services industry.",
              "Roles and functions of financial institutions.",
              "Regulatory environment and compliance."

            ]
          }, {
            key: "Financial Markets and Instruments",
            details: [
              "Understanding stock markets, bond markets, and derivatives.",
              "Trading mechanisms and market participants.",
              "Analysis of financial instruments."
            ]
          },
          {
            key: "Investment Analysis and Portfolio Management",
            details: [
              "Fundamental and technical analysis.",
              "Portfolio construction and management.",
              "Asset allocation and diversification strategies."
            ]
          }, {
            key: "Risk Management",
            details: [
              "Types of financial risks (market, credit, liquidity, etc.).",
              "Risk measurement and management techniques.",
              "Use of derivatives for hedging."
            ]
          }, {
            key: "Financial Planning",
            details: [
              "Personal financial planning and wealth management.",
              "Retirement planning and estate planning.",
              "Tax planning strategies."
            ]
          }, {
            key: "other",
            details: [
              "Corporate Finance",
              "Financial Statement Analysis",
              "Ethics and Professional Standards"
            ]
          }
        ],
        benefit: [
          "Career Opportunities:Prepares you for roles such as financial analyst, portfolio manager, financial planner, investment advisor, and more",
          "Skill Development: Gain practical skills in investment analysis, risk management, and financial planning.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in financial services and portfolio management.",
          "Professional Certification: Some programs may prepare you for certifications like CFA (Chartered Financial Analyst) or CFP (Certified Financial Planner)."
        ],
        eligibility: "10+2"
      }, {
        name: "Diploma in Computer Application and Business Management",
        details: "A Diploma in Computer Application and Business Management is an educational program designed to provide students with the skills and knowledge necessary to manage business operations using computer applications. This interdisciplinary diploma integrates computer science fundamentals with business management principles, preparing graduates for a wide range of careers in business and technology.",
        keyPoints: [
          {
            key: "Introduction to Computer Applications",
            details: [
              "Basics of computer systems and hardware.",
              "Software applications and their uses in business."
            ]
          }, {
            key: "Programming Fundamentals",
            details: [
              "Introduction to programming languages such as Python, Java, or C++.",
              "Basic programming concepts and problem-solving techniques."
            ]
          }, {
            key: "Database Management Systems",
            details: ["Concepts of database design and management.",
              "SQL and relational databases.",
              "Data retrieval and manipulation."]
          }, {
            key: "Web Development",
            details: [
              "Basics of HTML, CSS, and JavaScript.",
              "Building and maintaining websites.",
              "Introduction to web frameworks and content management systems."
            ]
          }, {
            key: "Office Productivity Software",
            details: [
              "Advanced features of MS Office (Word, Excel, PowerPoint).",
              "Use of office software for business documentation and data analysis."
            ]
          }, {
            key: "Information Systems",
            details: [
              "Overview of information systems in business.",
              "Role of MIS (Management Information Systems) in decision-making."
            ]
          },
          {
            key: "Principles of Management",
            details: [
              "Fundamentals of management and organizational behavior.",
              "Strategic planning and decision-making processes."
            ]
          },
          {
            key: "Marketing Management",
            details: [
              "Basics of marketing principles and strategies.",
              "Digital marketing and social media strategies."
            ]
          }, {
            key: "other",
            details: [
              "Financial Management",
              "Human Resource Management",
              "Operations Management",
              "Business Communication"
            ]
          }
        ],
        benefit: [
          "Career Opportunities: Prepares you for roles such as business analyst, IT manager, operations manager, systems analyst, and more.",
          "Skill Development: Gain practical skills in computer applications and business management.",
          "Interdisciplinary Knowledge: Integrate technology with business processes for efficient management.",
          "Professional Growth: Enhance your qualifications for higher-level positions in business and IT."
        ],
        eligibility: "10+2"

      }
    ],
    freeCourse: [
      "ChatGPT",
      "Tourism and Hospitality Management ",
      "Email and Mobile Marketing",
      "Goods and Service Tax",
      "Excel for Beginners"
    ]
  },
  {
    name: "BCA",
    ddp: [
      {
        "name": "Diploma in Native Mobile Application Development",
        "details": "A Diploma in Native Mobile Application Development is an educational program focused on teaching students the skills and knowledge required to design, develop, and deploy mobile applications for native platforms like iOS and Android. This diploma provides hands-on experience with programming languages, development tools, and industry best practices for creating high-performance mobile applications.",
        "keyPoints": [
          {
            "key": "Fundamentals of Mobile Development",
            "details": [
              "Introduction to Mobile Application Development: Overview of mobile platforms (iOS, Android), Differences between native, hybrid, and web apps.",
              "Programming Languages: Swift for iOS development, Kotlin and Java for Android development.",
              "Development Environments: Xcode for iOS development, Android Studio for Android development.",
              "User Interface (UI) and User Experience (UX) Design: Principles of mobile UI/UX design, Tools for designing interfaces (Sketch, Figma), Prototyping and usability testing."
            ]
          },
          {
            "key": "iOS Development",
            "details": [
              "Swift Programming: Basics of Swift language, Control flow, functions, and object-oriented programming, Handling data with Swift.",
              "iOS SDK and Frameworks: Using UIKit for building user interfaces, Working with Core Data for data management, Integrating APIs and third-party libraries.",
              "App Deployment: Testing and debugging iOS applications, Submitting apps to the Apple App Store."
            ]
          },
          {
            "key": "Android Development",
            "details": [
              "Kotlin/Java Programming: Basics of Kotlin/Java language, Object-oriented programming concepts, Handling data with Kotlin/Java.",
              "Android SDK and Frameworks: Using Android Jetpack components, Building responsive layouts with XML, Managing data with Room and SQLite.",
              "App Deployment: Testing and debugging Android applications, Publishing apps to the Google Play Store."
            ]
          },
          {
            "key": "Cross-Platform Development (Optional)",
            "details": [
              "Introduction to Cross-Platform Tools: Overview of tools like React Native, Flutter, and Xamarin, Pros and cons of cross-platform development.",
              "Basic Cross-Platform Development: Setting up and using cross-platform frameworks, Building and deploying simple cross-platform applications."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as mobile app developer, software engineer, UI/UX designer, and more.",
          "Skill Development: Gain practical skills in programming, UI/UX design, and app deployment.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in mobile app development.",
          "Portfolio Building: Create and showcase a portfolio of mobile applications to potential employers."
        ],
        "eligibility": "10+2"
      },
      {
        "name": "Diploma in Neural Network and Deep Learning",
        "details": "A Diploma in Neural Network and Deep Learning is an educational program designed to provide students with in-depth knowledge and practical skills in the field of neural networks and deep learning. This diploma covers various aspects of machine learning, artificial neural networks, and advanced deep learning techniques, preparing students for careers in AI and data science.",
        "keyPoints": [
          {
            "key": "Introduction to Neural Networks",
            "details": [
              "Overview of neural networks and their applications.",
              "Basic concepts: neurons, activation functions, and layers.",
              "Historical development and key milestones in neural networks."
            ]
          },
          {
            "key": "Deep Learning Fundamentals",
            "details": [
              "Understanding deep learning and its importance.",
              "Building blocks of deep learning: layers, models, and architectures.",
              "Common deep learning frameworks and libraries (TensorFlow, Keras, PyTorch)."
            ]
          },
          {
            "key": "Convolutional Neural Networks (CNNs)",
            "details": [
              "Basics of convolutional neural networks.",
              "Applications of CNNs in image processing and computer vision.",
              "Building and training CNN models."
            ]
          },
          {
            "key": "Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM)",
            "details": [
              "Understanding RNNs and their use cases.",
              "LSTM and GRU architectures for handling sequential data.",
              "Applications of RNNs in natural language processing and time series analysis."
            ]
          },
          {
            "key": "Advanced Deep Learning Techniques",
            "details": [
              "Generative Adversarial Networks (GANs) and their applications.",
              "Transfer learning and fine-tuning pre-trained models.",
              "Reinforcement learning basics and applications."
            ]
          },
          {
            "key": "Model Evaluation and Optimization",
            "details": [
              "Techniques for evaluating deep learning models.",
              "Hyperparameter tuning and optimization strategies.",
              "Avoiding overfitting and improving model generalization."
            ]
          },
          {
            "key": "Real-World Applications and Projects",
            "details": [
              "Implementing deep learning solutions for real-world problems.",
              "Case studies from various industries (healthcare, finance, autonomous vehicles).",
              "Capstone projects to build and deploy deep learning models."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as data scientist, AI engineer, machine learning engineer, and more.",
          "Skill Development: Gain hands-on experience with leading deep learning frameworks and tools.",
          "Industry-Relevant Knowledge: Learn the latest techniques and applications in neural networks and deep learning.",
          "Project-Based Learning: Develop a portfolio of projects showcasing your deep learning skills."
        ],
        "eligibility": "10+2"
      },
      {
        "name": "Diploma in Blockchain Technology",
        "details": "A Diploma in Blockchain Technology is an educational program designed to provide students with comprehensive knowledge and practical skills in blockchain technology and its applications. This diploma covers various aspects of blockchain, including its underlying principles, cryptographic techniques, smart contracts, and real-world use cases, preparing students for careers in this rapidly evolving field.",
        "keyPoints": [
          {
            "key": "Introduction to Blockchain Technology",
            "details": [
              "Overview of blockchain technology and its history.",
              "Key concepts: decentralization, distributed ledger, and consensus mechanisms.",
              "Comparison between blockchain and traditional databases."
            ]
          },
          {
            "key": "Cryptography and Security",
            "details": [
              "Basics of cryptography: hashing, encryption, and digital signatures.",
              "Public and private keys in blockchain.",
              "Security features of blockchain technology."
            ]
          },
          {
            "key": "Blockchain Platforms",
            "details": [
              "Overview of major blockchain platforms (Bitcoin, Ethereum, Hyperledger, etc.).",
              "Differences between public, private, and consortium blockchains.",
              "Setting up and working with blockchain networks."
            ]
          },
          {
            "key": "Smart Contracts",
            "details": [
              "Understanding smart contracts and their functionality.",
              "Programming smart contracts using Solidity.",
              "Deploying and managing smart contracts on the Ethereum platform."
            ]
          },
          {
            "key": "Blockchain in Business",
            "details": [
              "Applications of blockchain technology in various industries (finance, supply chain, healthcare, etc.).",
              "Case studies of successful blockchain implementations.",
              "Challenges and future trends in blockchain adoption."
            ]
          },
          {
            "key": "Developing Blockchain Solutions",
            "details": [
              "Designing and developing decentralized applications (DApps).",
              "Blockchain project lifecycle and best practices.",
              "Tools and frameworks for blockchain development."
            ]
          },
          {
            "key": "Legal and Ethical Aspects",
            "details": [
              "Legal considerations in blockchain technology.",
              "Regulatory environment and compliance issues.",
              "Ethical implications of blockchain and cryptocurrencies."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as blockchain developer, blockchain consultant, blockchain project manager, and more.",
          "Skill Development: Gain hands-on experience with blockchain platforms and smart contract development.",
          "Industry-Relevant Knowledge: Learn the latest trends and best practices in blockchain technology.",
          "Project-Based Learning: Work on real-world projects to build a portfolio showcasing your blockchain skills."
        ],
        "eligibility": "Bachelor's degree in a related field or equivalent experience"
      }
    ],
    freeCourse: [
      "Mobile App Development Using JAVA",
      "IOT (Internet of Things)",
      "Web Development and Hosting",
      "Excel for Beginners"
    ]
  },
  {
    name: "MBA",
    ddp: [
      {
        "name": "P G Diploma in Digital & Social Media Marketing",
        "details": "A Postgraduate Diploma in Digital & Social Media Marketing is an advanced educational program designed to equip students with comprehensive skills and knowledge in the field of digital marketing and social media. This diploma covers various advanced aspects of online marketing, including search engine optimization (SEO), social media strategies, content creation, analytics, and campaign management, preparing students for leadership roles in digital marketing.",
        "keyPoints": [
          {
            "key": "Advanced Digital Marketing Strategies",
            "details": [
              "In-depth understanding of digital marketing tools and strategies.",
              "Developing integrated marketing campaigns.",
              "Leveraging digital channels for brand building and customer engagement."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO) and Search Engine Marketing (SEM)",
            "details": [
              "Advanced SEO techniques and best practices.",
              "Paid search advertising and bid management.",
              "Analytics for SEO and SEM performance measurement."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating advanced social media strategies for platforms like Facebook, Instagram, Twitter, LinkedIn, etc.",
              "Managing and optimizing social media campaigns.",
              "Social media analytics and reporting."
            ]
          },
          {
            "key": "Content Marketing and Influencer Marketing",
            "details": [
              "Developing effective content marketing strategies.",
              "Working with influencers and managing influencer campaigns.",
              "Content creation, distribution, and performance measurement."
            ]
          },
          {
            "key": "Email Marketing and Automation",
            "details": [
              "Advanced email marketing techniques.",
              "Email marketing automation tools and strategies.",
              "Personalization and segmentation in email marketing."
            ]
          },
          {
            "key": "Web Analytics and Data-Driven Marketing",
            "details": [
              "Using web analytics tools (Google Analytics, etc.) to measure campaign performance.",
              "Data-driven decision making and marketing optimization.",
              "Customer journey mapping and conversion rate optimization."
            ]
          },
          {
            "key": "Digital Marketing Management",
            "details": [
              "Managing digital marketing teams and projects.",
              "Digital marketing budgeting and resource allocation.",
              "Ethics and legal considerations in digital marketing."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Skill Development: Gain hands-on experience with advanced tools and platforms used in the industry.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in digital and social media marketing.",
          "Networking: Opportunity to connect with peers, instructors, and industry professionals."
        ],
        "eligibility": "Bachelor's degree or equivalent experience"
      },
      {
        "name": "P G Diploma in Industrial Relations & Personnel Management",
        "details": "A Postgraduate Diploma in Industrial Relations & Personnel Management is an advanced educational program designed to provide students with comprehensive knowledge and practical skills in managing industrial relations and personnel within organizations. This diploma covers various aspects of labor laws, human resource management, conflict resolution, and organizational behavior, preparing students for leadership roles in HR and industrial relations.",
        "keyPoints": [
          {
            "key": "Industrial Relations",
            "details": [
              "Overview of industrial relations and its importance.",
              "Roles and responsibilities of trade unions and management.",
              "Collective bargaining and negotiation techniques."
            ]
          },
          {
            "key": "Labor Laws and Legislation",
            "details": [
              "In-depth study of labor laws and regulations.",
              "Compliance with employment laws and standards.",
              "Handling legal disputes and grievances."
            ]
          },
          {
            "key": "Human Resource Management",
            "details": [
              "Fundamentals of human resource management.",
              "Recruitment, selection, and onboarding processes.",
              "Employee training and development."
            ]
          },
          {
            "key": "Conflict Resolution and Negotiation",
            "details": [
              "Techniques for resolving workplace conflicts.",
              "Mediation and arbitration processes.",
              "Building effective negotiation skills."
            ]
          },
          {
            "key": "Organizational Behavior",
            "details": [
              "Understanding organizational culture and dynamics.",
              "Motivation theories and their application in the workplace.",
              "Team building and leadership strategies."
            ]
          },
          {
            "key": "Performance Management",
            "details": [
              "Designing performance appraisal systems.",
              "Managing employee performance and productivity.",
              "Implementing reward and recognition programs."
            ]
          },
          {
            "key": "Employee Relations",
            "details": [
              "Building and maintaining positive employee relations.",
              "Employee engagement strategies.",
              "Handling employee grievances and disciplinary actions."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as HR manager, industrial relations officer, personnel manager, and more.",
          "Skill Development: Gain hands-on experience in managing industrial relations and human resources.",
          "Industry-Relevant Knowledge: Learn the latest trends and best practices in industrial relations and personnel management.",
          "Networking: Opportunity to connect with peers, instructors, and industry professionals."
        ],
        "eligibility": "Bachelor's degree or equivalent experience"
      },

    ],
    freeCourse: [
      "Export Import Management - Beginner Level",
      "Excel for Beginners",
      "Goods and Service Tax",
      "Project Management",
      "Micro-Finance"
    ]
  },
  {
    name: "MCA",
    ddp: [
      {
        "name": "Diploma in Native Mobile Application Development",
        "details": "A Diploma in Native Mobile Application Development is an educational program focused on teaching students the skills and knowledge required to design, develop, and deploy mobile applications for native platforms like iOS and Android. This diploma provides hands-on experience with programming languages, development tools, and industry best practices for creating high-performance mobile applications.",
        "keyPoints": [
          {
            "key": "Fundamentals of Mobile Development",
            "details": [
              "Introduction to Mobile Application Development: Overview of mobile platforms (iOS, Android), Differences between native, hybrid, and web apps.",
              "Programming Languages: Swift for iOS development, Kotlin and Java for Android development.",
              "Development Environments: Xcode for iOS development, Android Studio for Android development.",
              "User Interface (UI) and User Experience (UX) Design: Principles of mobile UI/UX design, Tools for designing interfaces (Sketch, Figma), Prototyping and usability testing."
            ]
          },
          {
            "key": "iOS Development",
            "details": [
              "Swift Programming: Basics of Swift language, Control flow, functions, and object-oriented programming, Handling data with Swift.",
              "iOS SDK and Frameworks: Using UIKit for building user interfaces, Working with Core Data for data management, Integrating APIs and third-party libraries.",
              "App Deployment: Testing and debugging iOS applications, Submitting apps to the Apple App Store."
            ]
          },
          {
            "key": "Android Development",
            "details": [
              "Kotlin/Java Programming: Basics of Kotlin/Java language, Object-oriented programming concepts, Handling data with Kotlin/Java.",
              "Android SDK and Frameworks: Using Android Jetpack components, Building responsive layouts with XML, Managing data with Room and SQLite.",
              "App Deployment: Testing and debugging Android applications, Publishing apps to the Google Play Store."
            ]
          },
          {
            "key": "Cross-Platform Development (Optional)",
            "details": [
              "Introduction to Cross-Platform Tools: Overview of tools like React Native, Flutter, and Xamarin, Pros and cons of cross-platform development.",
              "Basic Cross-Platform Development: Setting up and using cross-platform frameworks, Building and deploying simple cross-platform applications."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as mobile app developer, software engineer, UI/UX designer, and more.",
          "Skill Development: Gain practical skills in programming, UI/UX design, and app deployment.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in mobile app development.",
          "Portfolio Building: Create and showcase a portfolio of mobile applications to potential employers."
        ],
        "eligibility": "Bachelor's degree in a related field or equivalent experience"
      },
      {
        "name": "Diploma in Blockchain Technology",
        "details": "A Diploma in Blockchain Technology is an educational program designed to provide students with comprehensive knowledge and practical skills in blockchain technology and its applications. This diploma covers various aspects of blockchain, including its underlying principles, cryptographic techniques, smart contracts, and real-world use cases, preparing students for careers in this rapidly evolving field.",
        "keyPoints": [
          {
            "key": "Introduction to Blockchain Technology",
            "details": [
              "Overview of blockchain technology and its history.",
              "Key concepts: decentralization, distributed ledger, and consensus mechanisms.",
              "Comparison between blockchain and traditional databases."
            ]
          },
          {
            "key": "Cryptography and Security",
            "details": [
              "Basics of cryptography: hashing, encryption, and digital signatures.",
              "Public and private keys in blockchain.",
              "Security features of blockchain technology."
            ]
          },
          {
            "key": "Blockchain Platforms",
            "details": [
              "Overview of major blockchain platforms (Bitcoin, Ethereum, Hyperledger, etc.).",
              "Differences between public, private, and consortium blockchains.",
              "Setting up and working with blockchain networks."
            ]
          },
          {
            "key": "Smart Contracts",
            "details": [
              "Understanding smart contracts and their functionality.",
              "Programming smart contracts using Solidity.",
              "Deploying and managing smart contracts on the Ethereum platform."
            ]
          },
          {
            "key": "Blockchain in Business",
            "details": [
              "Applications of blockchain technology in various industries (finance, supply chain, healthcare, etc.).",
              "Case studies of successful blockchain implementations.",
              "Challenges and future trends in blockchain adoption."
            ]
          },
          {
            "key": "Developing Blockchain Solutions",
            "details": [
              "Designing and developing decentralized applications (DApps).",
              "Blockchain project lifecycle and best practices.",
              "Tools and frameworks for blockchain development."
            ]
          },
          {
            "key": "Legal and Ethical Aspects",
            "details": [
              "Legal considerations in blockchain technology.",
              "Regulatory environment and compliance issues.",
              "Ethical implications of blockchain and cryptocurrencies."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as blockchain developer, blockchain consultant, blockchain project manager, and more.",
          "Skill Development: Gain hands-on experience with blockchain platforms and smart contract development.",
          "Industry-Relevant Knowledge: Learn the latest trends and best practices in blockchain technology.",
          "Project-Based Learning: Work on real-world projects to build a portfolio showcasing your blockchain skills."
        ],
        "eligibility": "Bachelor's degree in a related field or equivalent experience"
      }
    ],
    freeCourse: [
      "ChatGPT",
      "HTML",
      "Cloud Computing",
      "Web Designing",
      "Web Development & Hosting"
    ]
  },
  {
    name: "M.Com",
    ddp: [
      {
        "name": "P G Diploma in Digital & Social Media Marketing",
        "details": "A Postgraduate Diploma in Digital & Social Media Marketing is an advanced educational program designed to equip students with comprehensive skills and knowledge in the field of digital marketing and social media. This diploma covers various advanced aspects of online marketing, including search engine optimization (SEO), social media strategies, content creation, analytics, and campaign management, preparing students for leadership roles in digital marketing.",
        "keyPoints": [
          {
            "key": "Advanced Digital Marketing Strategies",
            "details": [
              "In-depth understanding of digital marketing tools and strategies.",
              "Developing integrated marketing campaigns.",
              "Leveraging digital channels for brand building and customer engagement."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO) and Search Engine Marketing (SEM)",
            "details": [
              "Advanced SEO techniques and best practices.",
              "Paid search advertising and bid management.",
              "Analytics for SEO and SEM performance measurement."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating advanced social media strategies for platforms like Facebook, Instagram, Twitter, LinkedIn, etc.",
              "Managing and optimizing social media campaigns.",
              "Social media analytics and reporting."
            ]
          },
          {
            "key": "Content Marketing and Influencer Marketing",
            "details": [
              "Developing effective content marketing strategies.",
              "Working with influencers and managing influencer campaigns.",
              "Content creation, distribution, and performance measurement."
            ]
          },
          {
            "key": "Email Marketing and Automation",
            "details": [
              "Advanced email marketing techniques.",
              "Email marketing automation tools and strategies.",
              "Personalization and segmentation in email marketing."
            ]
          },
          {
            "key": "Web Analytics and Data-Driven Marketing",
            "details": [
              "Using web analytics tools (Google Analytics, etc.) to measure campaign performance.",
              "Data-driven decision making and marketing optimization.",
              "Customer journey mapping and conversion rate optimization."
            ]
          },
          {
            "key": "Digital Marketing Management",
            "details": [
              "Managing digital marketing teams and projects.",
              "Digital marketing budgeting and resource allocation.",
              "Ethics and legal considerations in digital marketing."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Skill Development: Gain hands-on experience with advanced tools and platforms used in the industry.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in digital and social media marketing.",
          "Networking: Opportunity to connect with peers, instructors, and industry professionals."
        ],
        "eligibility": "B.Com"
      },
      {
        "name": "P G Diploma in Industrial Relations & Personnel Management",
        "details": "A Postgraduate Diploma in Industrial Relations & Personnel Management is an advanced educational program designed to provide students with comprehensive knowledge and practical skills in managing industrial relations and personnel within organizations. This diploma covers various aspects of labor laws, human resource management, conflict resolution, and organizational behavior, preparing students for leadership roles in HR and industrial relations.",
        "keyPoints": [
          {
            "key": "Industrial Relations",
            "details": [
              "Overview of industrial relations and its importance.",
              "Roles and responsibilities of trade unions and management.",
              "Collective bargaining and negotiation techniques."
            ]
          },
          {
            "key": "Labor Laws and Legislation",
            "details": [
              "In-depth study of labor laws and regulations.",
              "Compliance with employment laws and standards.",
              "Handling legal disputes and grievances."
            ]
          },
          {
            "key": "Human Resource Management",
            "details": [
              "Fundamentals of human resource management.",
              "Recruitment, selection, and onboarding processes.",
              "Employee training and development."
            ]
          },
          {
            "key": "Conflict Resolution and Negotiation",
            "details": [
              "Techniques for resolving workplace conflicts.",
              "Mediation and arbitration processes.",
              "Building effective negotiation skills."
            ]
          },
          {
            "key": "Organizational Behavior",
            "details": [
              "Understanding organizational culture and dynamics.",
              "Motivation theories and their application in the workplace.",
              "Team building and leadership strategies."
            ]
          },
          {
            "key": "Performance Management",
            "details": [
              "Designing performance appraisal systems.",
              "Managing employee performance and productivity.",
              "Implementing reward and recognition programs."
            ]
          },
          {
            "key": "Employee Relations",
            "details": [
              "Building and maintaining positive employee relations.",
              "Employee engagement strategies.",
              "Handling employee grievances and disciplinary actions."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as HR manager, industrial relations officer, personnel manager, and more.",
          "Skill Development: Gain hands-on experience in managing industrial relations and human resources.",
          "Industry-Relevant Knowledge: Learn the latest trends and best practices in industrial relations and personnel management.",
          "Networking: Opportunity to connect with peers, instructors, and industry professionals."
        ],
        "eligibility": "B.Com"
      }
    ],
    freeCourse: [
      "ChatGPT",
      "Project Management",
      "Goods and Service Tax",
      "Micro Finance",
      "Excel for Beginners"
    ]
  },
  {
    name: "MSc. Applied Mathematics",
    ddp: [
      {
        "name": "Post Graduate Diploma in Digital & Social Media Marketing",
        "details": "A Post Graduate Diploma in Digital & Social Media Marketing is an advanced educational program designed to equip students with in-depth knowledge and practical skills in digital marketing and social media management. This diploma covers various advanced concepts and strategies in online marketing, including SEO, SEM, social media advertising, content marketing, analytics, and campaign optimization.",
        "keyPoints": [
          {
            "key": "Digital Marketing Fundamentals",
            "details": [
              "Overview of digital marketing strategies and tactics.",
              "Understanding the digital marketing landscape and trends.",
              "Differentiating between various digital marketing channels."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO)",
            "details": [
              "On-page and off-page SEO techniques.",
              "Keyword research and analysis.",
              "SEO tools and performance monitoring."
            ]
          },
          {
            "key": "Search Engine Marketing (SEM)",
            "details": [
              "Paid search advertising (PPC).",
              "Campaign setup and optimization.",
              "Google Ads and Bing Ads platforms."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating social media strategies for platforms like Facebook, Instagram, Twitter, LinkedIn, etc.",
              "Social media advertising and targeting.",
              "Engagement, community management, and influencer marketing."
            ]
          },
          {
            "key": "Content Marketing",
            "details": [
              "Content creation and curation.",
              "Blogging, video marketing, and visual content strategies.",
              "Content distribution and promotion."
            ]
          },
          {
            "key": "Analytics and Data Insights",
            "details": [
              "Using analytics tools to measure digital marketing performance.",
              "Interpreting data and making data-driven decisions.",
              "Optimizing campaigns based on analytics."
            ]
          },
          {
            "key": "Digital Marketing Strategy and Planning",
            "details": [
              "Developing comprehensive digital marketing plans.",
              "Budgeting and resource allocation.",
              "Aligning digital strategies with business goals."
            ]
          }
        ],
        "benefit": [
          "Career Opportunities: Prepares you for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Practical Skills: Gain hands-on experience with digital marketing tools and platforms.",
          "Industry-Relevant Knowledge: Stay updated with the latest trends and best practices in digital and social media marketing.",
          "Networking: Connect with industry experts and peers for collaboration and career growth."
        ],
        "eligibility": "Bachelor's degree or equivalent experience"
      },
      {
        "name": "Diploma in Computer Application and Business Management",
        "details": "The Diploma in Computer Application and Business Management is a comprehensive program that combines technical skills in computer applications with essential knowledge in business management. This diploma is designed to equip students with the capabilities to leverage technology effectively in business operations, decision-making, and strategic planning.",
        "keyPoints": [
          {
            "key": "Computer Applications",
            "details": [
              "Introduction to computer fundamentals and software applications.",
              "Operating systems, office productivity software, and programming basics.",
              "Database management and data handling techniques."
            ]
          },
          {
            "key": "Business Management Fundamentals",
            "details": [
              "Understanding business environments, structures, and functions.",
              "Principles of management, leadership, and organizational behavior.",
              "Business communication, ethics, and professional conduct."
            ]
          },
          {
            "key": "Information Technology in Business",
            "details": [
              "Integration of IT systems in business processes.",
              "IT infrastructure management and cybersecurity basics.",
              "Data analytics and decision support systems."
            ]
          },
          {
            "key": "Software Development for Business",
            "details": [
              "Developing business applications using programming languages.",
              "Software engineering principles and best practices.",
              "Testing, deployment, and maintenance of business software."
            ]
          },
          {
            "key": "Digital Marketing and E-commerce",
            "details": [
              "Digital marketing strategies for business growth.",
              "E-commerce platforms, online transactions, and security measures.",
              "Social media marketing and online brand management."
            ]
          },
          {
            "key": "Financial Management",
            "details": [
              "Financial planning, budgeting, and forecasting.",
              "Financial analysis, reporting, and performance evaluation.",
              "Understanding financial markets and investment strategies."
            ]
          },
          {
            "key": "Project Management",
            "details": [
              "Project planning, execution, and monitoring.",
              "Team management, risk assessment, and project documentation.",
              "Agile methodologies and project management tools."
            ]
          }
        ],
        "benefit": [
          "Diverse Skill Set: Gain expertise in both computer applications and business management.",
          "Career Opportunities: Prepare for roles such as IT analyst, business analyst, project manager, software developer, and more.",
          "Practical Learning: Apply knowledge through real-world projects and simulations.",
          "Entrepreneurial Skills: Develop an understanding of business strategies and market dynamics."
        ],
        "eligibility": "High school diploma or equivalent"
      }
    ],
    freeCourse: [
      "HTML",
      "Web Designing and Development ",
      "ChatGPT",
      "Excel for Beginners"
    ]
  },
  {
    name: "MA – English Language Teaching",
    ddp: [
      {
        "name": "Post Graduate Diploma in Digital & Social Media Marketing",
        "details": "The Post Graduate Diploma in Digital & Social Media Marketing is an advanced program designed to provide students with in-depth knowledge and practical skills in the dynamic field of digital marketing and social media management. This diploma covers advanced concepts and strategies, equipping students to develop effective digital marketing campaigns, analyze data, and leverage social media platforms for business growth.",
        "keyPoints": [
          {
            "key": "Digital Marketing Strategies",
            "details": [
              "In-depth understanding of digital marketing concepts and strategies.",
              "Developing integrated digital marketing campaigns.",
              "Utilizing different digital channels for brand building and customer engagement."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO) and Search Engine Marketing (SEM)",
            "details": [
              "Advanced SEO techniques for organic search ranking improvement.",
              "SEM strategies including PPC campaigns and keyword optimization.",
              "Using SEO/SEM tools and analytics for performance measurement."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating and executing advanced social media strategies.",
              "Effective management of social media platforms (Facebook, Instagram, Twitter, LinkedIn, etc.).",
              "Utilizing social media analytics for campaign optimization."
            ]
          },
          {
            "key": "Content Marketing and Blogging",
            "details": [
              "Developing content marketing strategies for various platforms.",
              "Creating engaging and relevant content (blogs, videos, infographics, etc.).",
              "Content distribution and promotion techniques."
            ]
          },
          {
            "key": "Email Marketing and Automation",
            "details": [
              "Designing and implementing targeted email marketing campaigns.",
              "Utilizing email marketing automation tools for efficiency and personalization.",
              "Measuring and analyzing email marketing performance."
            ]
          },
          {
            "key": "Web Analytics and Data-Driven Marketing",
            "details": [
              "Using web analytics tools (Google Analytics, etc.) for data analysis.",
              "Interpreting data insights to make informed marketing decisions.",
              "Optimizing digital marketing strategies based on data analysis."
            ]
          },
          {
            "key": "Digital Marketing Management",
            "details": [
              "Strategic planning and budgeting for digital marketing initiatives.",
              "Team management and collaboration in digital marketing projects.",
              "Legal and ethical considerations in digital marketing."
            ]
          }
        ],
        "benefit": [
          "Advanced Expertise: Gain advanced skills and knowledge in digital marketing and social media.",
          "Career Opportunities: Prepare for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Practical Application: Apply theoretical concepts through real-world projects and case studies.",
          "Industry-Relevant Insights: Stay updated with the latest trends and best practices in digital marketing."
        ],
        "eligibility": "Bachelor's degree or equivalent"
      }

    ],
    freeCourse: [
      "ChatGPT",
      "Excel for Beginners"
    ]
  },
  {
    name: "MA – Journalism and Mass Communication",
    ddp: [
      {
        "name": "Post Graduate Diploma in Digital & Social Media Marketing",
        "details": "The Post Graduate Diploma in Digital & Social Media Marketing is an advanced program designed to provide students with in-depth knowledge and practical skills in the dynamic field of digital marketing and social media management. This diploma covers advanced concepts and strategies, equipping students to develop effective digital marketing campaigns, analyze data, and leverage social media platforms for business growth.",
        "keyPoints": [
          {
            "key": "Digital Marketing Strategies",
            "details": [
              "In-depth understanding of digital marketing concepts and strategies.",
              "Developing integrated digital marketing campaigns.",
              "Utilizing different digital channels for brand building and customer engagement."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO) and Search Engine Marketing (SEM)",
            "details": [
              "Advanced SEO techniques for organic search ranking improvement.",
              "SEM strategies including PPC campaigns and keyword optimization.",
              "Using SEO/SEM tools and analytics for performance measurement."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating and executing advanced social media strategies.",
              "Effective management of social media platforms (Facebook, Instagram, Twitter, LinkedIn, etc.).",
              "Utilizing social media analytics for campaign optimization."
            ]
          },
          {
            "key": "Content Marketing and Blogging",
            "details": [
              "Developing content marketing strategies for various platforms.",
              "Creating engaging and relevant content (blogs, videos, infographics, etc.).",
              "Content distribution and promotion techniques."
            ]
          },
          {
            "key": "Email Marketing and Automation",
            "details": [
              "Designing and implementing targeted email marketing campaigns.",
              "Utilizing email marketing automation tools for efficiency and personalization.",
              "Measuring and analyzing email marketing performance."
            ]
          },
          {
            "key": "Web Analytics and Data-Driven Marketing",
            "details": [
              "Using web analytics tools (Google Analytics, etc.) for data analysis.",
              "Interpreting data insights to make informed marketing decisions.",
              "Optimizing digital marketing strategies based on data analysis."
            ]
          },
          {
            "key": "Digital Marketing Management",
            "details": [
              "Strategic planning and budgeting for digital marketing initiatives.",
              "Team management and collaboration in digital marketing projects.",
              "Legal and ethical considerations in digital marketing."
            ]
          }
        ],
        "benefit": [
          "Advanced Expertise: Gain advanced skills and knowledge in digital marketing and social media.",
          "Career Opportunities: Prepare for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Practical Application: Apply theoretical concepts through real-world projects and case studies.",
          "Industry-Relevant Insights: Stay updated with the latest trends and best practices in digital marketing."
        ],
        "eligibility": "Bachelor's degree or equivalent"
      }

    ],
    freeCourse: [
      "ChatGPT",
      "Excel for Beginners"
    ]
  },
  {
    name: "MA – Clinical Psychology",
    ddp: [
      {
        "name": "Post Graduate Diploma in Digital & Social Media Marketing",
        "details": "The Post Graduate Diploma in Digital & Social Media Marketing is an advanced program designed to provide students with in-depth knowledge and practical skills in the dynamic field of digital marketing and social media management. This diploma covers advanced concepts and strategies, equipping students to develop effective digital marketing campaigns, analyze data, and leverage social media platforms for business growth.",
        "keyPoints": [
          {
            "key": "Digital Marketing Strategies",
            "details": [
              "In-depth understanding of digital marketing concepts and strategies.",
              "Developing integrated digital marketing campaigns.",
              "Utilizing different digital channels for brand building and customer engagement."
            ]
          },
          {
            "key": "Search Engine Optimization (SEO) and Search Engine Marketing (SEM)",
            "details": [
              "Advanced SEO techniques for organic search ranking improvement.",
              "SEM strategies including PPC campaigns and keyword optimization.",
              "Using SEO/SEM tools and analytics for performance measurement."
            ]
          },
          {
            "key": "Social Media Marketing",
            "details": [
              "Creating and executing advanced social media strategies.",
              "Effective management of social media platforms (Facebook, Instagram, Twitter, LinkedIn, etc.).",
              "Utilizing social media analytics for campaign optimization."
            ]
          },
          {
            "key": "Content Marketing and Blogging",
            "details": [
              "Developing content marketing strategies for various platforms.",
              "Creating engaging and relevant content (blogs, videos, infographics, etc.).",
              "Content distribution and promotion techniques."
            ]
          },
          {
            "key": "Email Marketing and Automation",
            "details": [
              "Designing and implementing targeted email marketing campaigns.",
              "Utilizing email marketing automation tools for efficiency and personalization.",
              "Measuring and analyzing email marketing performance."
            ]
          },
          {
            "key": "Web Analytics and Data-Driven Marketing",
            "details": [
              "Using web analytics tools (Google Analytics, etc.) for data analysis.",
              "Interpreting data insights to make informed marketing decisions.",
              "Optimizing digital marketing strategies based on data analysis."
            ]
          },
          {
            "key": "Digital Marketing Management",
            "details": [
              "Strategic planning and budgeting for digital marketing initiatives.",
              "Team management and collaboration in digital marketing projects.",
              "Legal and ethical considerations in digital marketing."
            ]
          }
        ],
        "benefit": [
          "Advanced Expertise: Gain advanced skills and knowledge in digital marketing and social media.",
          "Career Opportunities: Prepare for roles such as digital marketing manager, social media strategist, SEO/SEM specialist, content marketing manager, and more.",
          "Practical Application: Apply theoretical concepts through real-world projects and case studies.",
          "Industry-Relevant Insights: Stay updated with the latest trends and best practices in digital marketing."
        ],
        "eligibility": "Bachelor's degree or equivalent"
      }
    ],
    freeCourse: [
      "ChatGPT",
      "Excel for Beginners"
    ]
  },
  {
    name: "MSW",
    ddp: [
      {
        "name": "Post Graduate Diploma in Labour Law",
        "details": "The Post Graduate Diploma in Labour Law is an advanced program designed to provide students with in-depth knowledge and expertise in the field of labor law and industrial relations. This diploma covers various aspects of labor legislation, employment rights, dispute resolution, and legal compliance, preparing students for careers in labor law consultancy, HR management, legal advisory roles, and more.",
        "keyPoints": [
          {
            "key": "Labor Legislation",
            "details": [
              "In-depth study of labor laws and regulations.",
              "Understanding employment contracts, wages, benefits, and working hours.",
              "Legal rights and protections for workers."
            ]
          },
          {
            "key": "Industrial Relations",
            "details": [
              "Roles and responsibilities of employers, employees, and trade unions.",
              "Collective bargaining agreements and negotiations.",
              "Dispute resolution mechanisms."
            ]
          },
          {
            "key": "Employment Law",
            "details": [
              "Termination of employment, layoffs, and severance.",
              "Discrimination and harassment laws in the workplace.",
              "Health and safety regulations."
            ]
          },
          {
            "key": "Legal Compliance",
            "details": [
              "Ensuring legal compliance in hiring, firing, and employee management.",
              "Understanding labor court procedures and legal documentation.",
              "Ethical considerations and professional conduct in labor law."
            ]
          },
          {
            "key": "Worker's Rights and Advocacy",
            "details": [
              "Advocacy for worker's rights and fair labor practices.",
              "Representation of workers in legal proceedings.",
              "Understanding the role of labor unions and labor movements."
            ]
          },
          {
            "key": "International Labour Laws",
            "details": [
              "Comparative analysis of labor laws across different countries.",
              "International conventions and standards on labor rights.",
              "Global labor market trends and challenges."
            ]
          },
          {
            "key": "Case Studies and Legal Research",
            "details": [
              "Analyzing real-world labor law cases and precedents.",
              "Conducting legal research and interpreting statutes.",
              "Drafting legal opinions and reports."
            ]
          }
        ],
        "benefit": [
          "Expertise in Labour Law: Gain in-depth knowledge and expertise in labor legislation and industrial relations.",
          "Career Opportunities: Prepare for roles such as labor law consultant, HR manager, legal advisor, labor court representative, and more.",
          "Practical Application: Apply legal principles through case studies, simulations, and legal research projects.",
          "Professional Development: Enhance legal research, writing, and advocacy skills in the field of labor law."
        ],
        "eligibility": "Bachelor's degree in law or a related field"
      },
      {
        "name": "Post Graduate Diploma in Industrial Relations & Personnel Management",
        "details": "The Post Graduate Diploma in Industrial Relations & Personnel Management is an advanced program designed to provide students with specialized knowledge and practical skills in managing industrial relations and human resources within organizations. This diploma covers various aspects of labor laws, employee relations, conflict resolution, HR policies, and strategic personnel management.",
        "keyPoints": [
          {
            "key": "Industrial Relations",
            "details": [
              "Understanding industrial relations frameworks and theories.",
              "Roles and functions of trade unions, management, and government in industrial disputes.",
              "Collective bargaining, negotiations, and conflict resolution strategies."
            ]
          },
          {
            "key": "Labor Laws and Compliance",
            "details": [
              "In-depth study of labor laws and regulations governing employment.",
              "Ensuring legal compliance in hiring, termination, and employee benefits.",
              "Managing legal disputes and grievances."
            ]
          },
          {
            "key": "Human Resource Management",
            "details": [
              "Recruitment, selection, and onboarding processes.",
              "Employee training, development, and performance management.",
              "Compensation and benefits administration."
            ]
          },
          {
            "key": "Employee Relations",
            "details": [
              "Building and maintaining positive employee relations.",
              "Handling employee grievances, disciplinary actions, and workplace conflicts.",
              "Employee engagement and motivation strategies."
            ]
          },
          {
            "key": "Strategic Personnel Management",
            "details": [
              "HR planning and forecasting based on organizational goals.",
              "Succession planning, talent management, and career development programs.",
              "Aligning HR strategies with business objectives."
            ]
          },
          {
            "key": "Organizational Behavior",
            "details": [
              "Understanding individual and group behavior in organizations.",
              "Motivation theories, leadership styles, and team dynamics.",
              "Organizational culture and change management."
            ]
          },
          {
            "key": "Industrial Psychology and Counselling",
            "details": [
              "Psychological aspects of employee behavior and motivation.",
              "Employee counseling, stress management, and mental health support programs.",
              "Creating a positive work environment and promoting well-being."
            ]
          }
        ],
        "benefit": [
          "Specialized Knowledge: Gain expertise in industrial relations, HR management, and personnel administration.",
          "Career Opportunities: Prepare for roles such as HR manager, industrial relations specialist, personnel manager, labor relations consultant, and more.",
          "Practical Skills: Apply theoretical concepts through case studies, simulations, and practical projects.",
          "Professional Development: Enhance leadership, negotiation, and conflict resolution skills in HR and industrial relations."
        ],
        "eligibility": "Bachelor's degree in HR, business administration, or a related field"
      }


    ],
    freeCourse: [
      "ChatGPT",
      "Excel for Beginners",
      "Fundamentals of Marketing Management"
    ]
  }
]