"use client";
import { useState } from "react";
import Program from "../Utils/Program";
import "./styles/explorePrograms.css";
import Button from "../Utils/Button";

const ExplorePrograms = () => {
  const tags = {
    "BE/B.Tech": {
      exams: ["JEE Main", "JEE Advanced", "BITSAT"],
      topColleges: [
        "Indian Institute of Technology, Bombay",
        "Indian Institute of Technology, Delhi",
        "Indian Institute of Technology, Madras",
      ],
    },
    "MBA/PGDM": {
      exams: ["CAT", "XAT", "GMAT"],
      topColleges: [
        "Indian Institute of Management, Ahmedabad",
        "Indian Institute of Management, Bangalore",
        "Indian Institute of Management, Calcutta",
      ],
    },
    MBBS: {
      exams: ["NEET-UG", "AIIMS MBBS", "JIPMER MBBS"],
      topColleges: [
        "All India Institute of Medical Sciences, New Delhi",
        "Christian Medical College, Vellore",
        "Maulana Azad Medical College, New Delhi",
      ],
    },
    "B.Sc": {
      exams: ["IISER Aptitude Test", "NEST"],
      topColleges: [
        "Indian Institute of Science, Bangalore",
        "St. Stephen’s College, Delhi",
        "Loyola College, Chennai",
      ],
    },
    BA: {
      exams: [
        "Various University Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Lady Shri Ram College for Women, New Delhi",
        "St. Xavier’s College, Mumbai",
        "Loyola College, Chennai",
        "Miranda House, New Delhi",
        "Christ University, Bangalore",
      ],
    },
    "B.Com": {
      exams: [
        "Various University Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Shri Ram College of Commerce, New Delhi",
        "Lady Shri Ram College for Women, New Delhi",
        "Loyola College, Chennai",
        "Christ University, Bangalore",
        "Hansraj College, New Delhi",
      ],
    },
    "M.Sc": {
      exams: [
        "Various University Entrance Exams",
        "GATE (for some universities)",
        "JAM",
      ],
      topColleges: [
        "Indian Institute of Science (IISc), Bangalore",
        "Indian Institutes of Technology (IITs)",
        "University of Delhi",
        "University of Hyderabad",
        "Banaras Hindu University (BHU)",
      ],
    },
    MA: {
      exams: [
        "Various University Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Jawaharlal Nehru University (JNU), New Delhi",
        "University of Delhi",
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "University of Mumbai",
        "University of Calcutta",
      ],
    },
    "M.Com": {
      exams: [
        "Various University Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Shri Ram College of Commerce (SRCC), New Delhi",
        "Lady Shri Ram College for Women (LSR), New Delhi",
        "Christ University, Bangalore",
        "Delhi School of Economics (DSE), New Delhi",
        "St. Xavier's College, Mumbai",
      ],
    },
    "Ph.D.": {
      exams: ["UGC NET", "CSIR NET", "GATE (for some universities)"],
      topColleges: [
        "Indian Institute of Science (IISc), Bangalore",
        "Indian Institutes of Technology (IITs)",
        "University of Delhi",
        "Tata Institute of Fundamental Research (TIFR), Mumbai",
        "Indian Statistical Institute (ISI), Kolkata",
      ],
    },
    "M.Phil": {
      exams: [
        "University-specific Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Jawaharlal Nehru University (JNU), New Delhi",
        "University of Delhi",
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "University of Mumbai",
        "University of Calcutta",
      ],
    },
    Diploma: {
      exams: ["Institute-specific Entrance Exams"],
      topColleges: [
        "Indian Institutes of Technology (IITs)",
        "National Institutes of Technology (NITs)",
        "Polytechnic Institutes",
        "Private Technical Institutes",
      ],
    },

    BBA: {
      exams: ["Various University Entrance Exams", "IPU CET", "SET"],
      topColleges: [
        "Shaheed Sukhdev College of Business Studies (SSCBS), Delhi",
        "Christ University, Bangalore",
        "NMIMS Mumbai",
        "Symbiosis Centre for Management Studies (SCMS), Pune",
        "Narsee Monjee College of Commerce and Economics, Mumbai",
      ],
    },
    BCA: {
      exams: ["Various University Entrance Exams", "IPU CET", "SET"],
      topColleges: [
        "Christ University, Bangalore",
        "Symbiosis Institute of Computer Studies and Research (SICSR), Pune",
        "Presidency College, Bangalore",
        "St. Xavier's College, Kolkata",
        "Madras Christian College, Chennai",
      ],
    },
    MCA: {
      exams: ["NIMCET", "MAH MCA CET", "ICAR AIEEA (for some universities)"],
      topColleges: [
        "National Institute of Technology (NITs)",
        "Birla Institute of Technology (BITs), Mesra",
        "VIT University, Vellore",
        "Pune University",
        "Banaras Hindu University (BHU)",
      ],
    },
    MD: {
      exams: ["NEET PG", "AIIMS PG", "PGIMER Entrance Exam"],
      topColleges: [
        "All India Institute of Medical Sciences (AIIMS), New Delhi",
        "Christian Medical College (CMC), Vellore",
        "Armed Forces Medical College (AFMC), Pune",
        "Post Graduate Institute of Medical Education and Research (PGIMER), Chandigarh",
        "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER), Puducherry",
      ],
    },
    BDS: {
      exams: ["NEET UG"],
      topColleges: [
        "Maulana Azad Institute of Dental Sciences (MAIDS), New Delhi",
        "Manipal College of Dental Sciences, Manipal",
        "Government Dental College & Hospital, Mumbai",
        "Christian Medical College (CMC), Vellore",
        "Nair Hospital Dental College, Mumbai",
      ],
    },
    LLB: {
      exams: ["CLAT", "LSAT India", "AILET"],
      topColleges: [
        "National Law School of India University (NLSIU), Bangalore",
        "National Academy of Legal Studies and Research (NALSAR), Hyderabad",
        "The West Bengal National University of Juridical Sciences (WBNUJS), Kolkata",
        "National Law University (NLU), Delhi",
        "Symbiosis Law School (SLS), Pune",
      ],
    },
    LLM: {
      exams: ["CLAT PG", "AILET PG", "DU LLM Entrance Exam"],
      topColleges: [
        "National Law School of India University (NLSIU), Bangalore",
        "National Academy of Legal Studies and Research (NALSAR), Hyderabad",
        "The West Bengal National University of Juridical Sciences (WBNUJS), Kolkata",
        "National Law University (NLU), Delhi",
        "Faculty of Law, University of Delhi",
      ],
    },
    "B.Ed": {
      exams: ["CTET", "UGC NET", "State-level B.Ed Entrance Exams"],
      topColleges: [
        "Banaras Hindu University (BHU), Varanasi",
        "Jamia Millia Islamia (JMI), New Delhi",
        "Indira Gandhi National Open University (IGNOU), New Delhi",
        "Delhi University (DU), New Delhi",
        "Punjab University (PU), Chandigarh",
      ],
    },
    "M.Ed": {
      exams: ["UGC NET (Education)", "State-level M.Ed Entrance Exams"],
      topColleges: [
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "Jamia Millia Islamia (JMI), New Delhi",
        "University of Delhi (DU), New Delhi",
        "Banaras Hindu University (BHU), Varanasi",
        "Aligarh Muslim University (AMU), Aligarh",
      ],
    },
    "B.Pharma": {
      exams: [
        "GPAT",
        "BITSAT (for some universities)",
        "State-level B.Pharma Entrance Exams",
      ],
      topColleges: [
        "Institute of Chemical Technology (ICT), Mumbai",
        "Birla Institute of Technology and Science (BITS), Pilani",
        "Manipal College of Pharmaceutical Sciences, Manipal",
        "University Institute of Pharmaceutical Sciences, Chandigarh",
        "Jamia Hamdard, New Delhi",
      ],
    },
    "M.Pharma": {
      exams: [
        "GPAT",
        "BITSAT (for some universities)",
        "State-level M.Pharma Entrance Exams",
      ],
      topColleges: [
        "National Institute of Pharmaceutical Education and Research (NIPER), Mohali",
        "Jamia Hamdard, New Delhi",
        "Bombay College of Pharmacy, Mumbai",
        "Manipal College of Pharmaceutical Sciences, Manipal",
        "Birla Institute of Technology and Science (BITS), Pilani",
      ],
    },
    MPH: {
      exams: [
        "AIIMS MPH Entrance Exam",
        "JIPMER PG",
        "NEET PG (for some universities)",
      ],
      topColleges: [
        "All India Institute of Medical Sciences (AIIMS), New Delhi",
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "Indian Institute of Public Health (IIPH), Gandhinagar",
        "School of Public Health, Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh",
        "National Institute of Epidemiology (NIE), Chennai",
      ],
    },
    MSW: {
      exams: [
        "TISSNET",
        "MAH B.Ed & M.Ed CET (for some universities)",
        "State-level MSW Entrance Exams",
      ],
      topColleges: [
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "Jamia Millia Islamia (JMI), New Delhi",
        "Delhi School of Social Work, University of Delhi",
        "Nirmala Niketan College of Social Work, Mumbai",
        "Madras School of Social Work, Chennai",
      ],
    },
    "B.Tech+M.Tech": {
      exams: ["JEE Main", "GATE", "BITSAT (for some universities)"],
      topColleges: [
        "Indian Institutes of Technology (IITs)",
        "National Institutes of Technology (NITs)",
        "Birla Institute of Technology and Science (BITS), Pilani",
        "Indian Institute of Information Technology (IIITs)",
        "Vellore Institute of Technology (VIT), Vellore",
      ],
    },
    "B.Sc+M.Sc": {
      exams: [
        "University-specific Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Indian Institute of Science (IISc), Bangalore",
        "Indian Institutes of Technology (IITs)",
        "University of Delhi",
        "University of Hyderabad",
        "Banaras Hindu University (BHU)",
      ],
    },
    BFA: {
      exams: [
        "State-level BFA Entrance Exams",
        "University-specific Entrance Exams",
      ],
      topColleges: [
        "Faculty of Fine Arts, MS University, Baroda",
        "Sir JJ School of Arts, Mumbai",
        "College of Art, Delhi",
        "Government College of Fine Arts, Chennai",
        "Kala Bhavana, Visva-Bharati, Santiniketan",
      ],
    },
    MFA: {
      exams: [
        "University-specific Entrance Exams",
        "CUET (for some universities)",
      ],
      topColleges: [
        "Faculty of Fine Arts, MS University, Baroda",
        "Sir JJ School of Arts, Mumbai",
        "College of Art, Delhi",
        "Government College of Fine Arts, Chennai",
        "Kala Bhavana, Visva-Bharati, Santiniketan",
      ],
    },
    "B.Arch": {
      exams: ["NATA", "JEE Main (Paper 2)"],
      topColleges: [
        "Indian Institute of Technology (IITs)",
        "School of Planning and Architecture (SPAs)",
        "National Institute of Technology (NITs)",
        "CEPT University, Ahmedabad",
        "Sir JJ College of Architecture, Mumbai",
      ],
    },
    "M.Arch": {
      exams: ["GATE (for some universities)", "CEED"],
      topColleges: [
        "Indian Institute of Technology (IITs)",
        "School of Planning and Architecture (SPAs)",
        "CEPT University, Ahmedabad",
        "Indian Institute of Engineering Science and Technology (IIEST), Shibpur",
        "Jawaharlal Nehru Architecture and Fine Arts University (JNAFAU), Hyderabad",
      ],
    },
    "PG Diploma": {
      exams: [
        "University-specific Entrance Exams",
        "State-level PG Diploma Entrance Exams",
      ],
      topColleges: [
        "Indian Institutes of Technology (IITs)",
        "National Institutes of Technology (NITs)",
        "Indian Institutes of Management (IIMs)",
        "Xavier School of Management (XLRI), Jamshedpur",
        "Indian Institute of Foreign Trade (IIFT), New Delhi",
      ],
    },
    "M.Tech": {
      exams: [
        "GATE",
        "BITSAT (for some universities)",
        "State-level M.Tech Entrance Exams",
      ],
      topColleges: [
        "Indian Institutes of Technology (IITs)",
        "National Institutes of Technology (NITs)",
        "Birla Institute of Technology and Science (BITS), Pilani",
        "Indian Institute of Information Technology (IIITs)",
        "Vellore Institute of Technology (VIT), Vellore",
      ],
    },
    "B.V.Sc": {
      exams: [
        "NEET-UG (for some universities)",
        "AIPVT",
        "State-level Veterinary Entrance Exams",
      ],
      topColleges: [
        "Indian Veterinary Research Institute (IVRI), Bareilly",
        "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS), Chennai",
        "Kerala Veterinary and Animal Sciences University (KVASU), Thrissur",
        "Guru Angad Dev Veterinary and Animal Sciences University (GADVASU), Ludhiana",
        "Karnataka Veterinary, Animal and Fisheries Sciences University (KVAFSU), Bidar",
      ],
    },
    "M.V.Sc": {
      exams: ["ICAR AIEEA (PG)", "State-level Veterinary Entrance Exams"],
      topColleges: [
        "Indian Veterinary Research Institute (IVRI), Bareilly",
        "Tamil Nadu Veterinary and Animal Sciences University (TANUVAS), Chennai",
        "Kerala Veterinary and Animal Sciences University (KVASU), Thrissur",
        "Guru Angad Dev Veterinary and Animal Sciences University (GADVASU), Ludhiana",
        "Karnataka Veterinary, Animal and Fisheries Sciences University (KVAFSU), Bidar",
      ],
    },
    BHM: {
      exams: ["NCHM JEE", "State-level Hotel Management Entrance Exams"],
      topColleges: [
        "Institute of Hotel Management (IHM), Mumbai",
        "Institute of Hotel Management (IHM), Delhi",
        "Welcomgroup Graduate School of Hotel Administration (WGSHA), Manipal",
        "Institute of Hotel Management (IHM), Bangalore",
        "Institute of Hotel Management (IHM), Chennai",
      ],
    },
    MHM: {
      exams: [
        "NCHM JEE (for some universities)",
        "State-level Hotel Management Entrance Exams",
      ],
      topColleges: [
        "Tata Institute of Social Sciences (TISS), Mumbai",
        "Indian Institute of Hotel Management (IHM), Delhi",
        "Welcomgroup Graduate School of Hotel Administration (WGSHA), Manipal",
        "Jamia Millia Islamia (JMI), New Delhi",
        "Banaras Hindu University (BHU), Varanasi",
      ],
    },
    "B.P.Ed": {
      exams: [
        "University-specific Entrance Exams",
        "State-level B.P.Ed Entrance Exams",
      ],
      topColleges: [
        "Lakshmibai National University of Physical Education (LNIPE), Gwalior",
        "Indira Gandhi Institute of Physical Education and Sports Sciences (IGIPESS), New Delhi",
        "Jamia Millia Islamia (JMI), New Delhi",
        "Panjab University (PU), Chandigarh",
        "University of Mumbai, Mumbai",
      ],
    },
    "M.P.Ed": {
      exams: [
        "University-specific Entrance Exams",
        "State-level M.P.Ed Entrance Exams",
      ],
      topColleges: [
        "Lakshmibai National University of Physical Education (LNIPE), Gwalior",
        "Indira Gandhi Institute of Physical Education and Sports Sciences (IGIPESS), New Delhi",
        "Jamia Millia Islamia (JMI), New Delhi",
        "Panjab University (PU), Chandigarh",
        "University of Mumbai, Mumbai",
      ],
    },
    "B.Lib": {
      exams: [
        "University-specific Entrance Exams",
        "State-level B.Lib Entrance Exams",
      ],
      topColleges: [
        "Banaras Hindu University (BHU), Varanasi",
        "Indira Gandhi National Open University (IGNOU), New Delhi",
        "Aligarh Muslim University (AMU), Aligarh",
        "University of Delhi, New Delhi",
        "Punjab University (PU), Chandigarh",
      ],
    },
    "M.Lib": {
      exams: [
        "University-specific Entrance Exams",
        "State-level M.Lib Entrance Exams",
      ],
      topColleges: [
        "Indira Gandhi National Open University (IGNOU), New Delhi",
        "Aligarh Muslim University (AMU), Aligarh",
        "University of Delhi, New Delhi",
        "University of Madras, Chennai",
        "Banaras Hindu University (BHU), Varanasi",
      ],
    },
    "B.Des": {
      exams: [
        "CEED",
        "NIFT Entrance Exam",
        "State-level Design Entrance Exams",
      ],
      topColleges: [
        "National Institute of Design (NID), Ahmedabad",
        "National Institute of Fashion Technology (NIFT), New Delhi",
        "Indian Institute of Technology (IITs)",
        "Srishti Institute of Art, Design, and Technology, Bangalore",
        "Pearl Academy, New Delhi",
      ],
    },
    "M.Des": {
      exams: [
        "CEED",
        "NIFT PG Entrance Exam",
        "State-level Design Entrance Exams",
      ],
      topColleges: [
        "National Institute of Design (NID), Ahmedabad",
        "Indian Institute of Technology (IITs)",
        "National Institute of Fashion Technology (NIFT), New Delhi",
        "Industrial Design Centre (IDC), IIT Bombay",
        "Srishti Institute of Art, Design, and Technology, Bangalore",
      ],
    },
  };

  const [tag, setTag] = useState("BE/B.Tech");
  return (
    <section className="explore-programs">
      <h2>Explore Programs</h2>
      <div className="slider">
        <div className="tags">
          {Object.keys(tags).map((item) => (
            <div
              key={item}
              className={`tag ${tag === item ? "active" : ""}`}
              onClick={() => setTag(item)}
            >
              {" "}
              {item}{" "}
            </div>
          ))}
        </div>
      </div>
      <div className="explore-programs-container">
        <div className="explore-programs-wrapper">
          <div className="programs">
            {tag && (
              <Program
                exams={tags[tag].exams}
                topColleges={tags[tag].topColleges}
                tag={tag}
              />
            )}
          </div>
        </div>
        <Button
          text={`View All ${tag} Programs`}
          link={`/college/${tag.split("/")[0]}`}
        />
      </div>
    </section>
  );
};

export default ExplorePrograms;
