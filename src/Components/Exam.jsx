"use client";
import { usePathname, useSearchParams } from "next/navigation";

import ExamList from "../Utils/ExamList";
import Header from "../Utils/Header";
import { useEffect, useState } from "react";
import "./styles/exam.css";
import NewsLetter from "../Decorators/NewsLetter";
import ExplorePrograms from "../Decorators/ExplorePrograms";
import BookAConsult from "../Decorators/BookAConsult";
import ExamDetails from "../Components/ExamDetails";
import Faq from "../Decorators/Faq";
const Exam = () => {
  const param = usePathname().split("/")[2]?.toLocaleLowerCase();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = [
    {
      name: "Engineering",
      exams: [
        {
          examName: "JEE MAINS",
          description:
            "The Joint Entrance Examination (JEE) Main is a national level examination conducted for admission to various undergraduate engineering and architecture courses in institutes accepting the JEE Main scores, primarily the National Institutes of Technology (NITs), Indian Institutes of Information Technology (IIITs), and other Centrally Funded Technical Institutions (CFTIs) across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates must have passed the 12th class or equivalent exam from a recognized board with Physics, Mathematics, and at least one of Chemistry/Biotechnology/Biology/Technical Vocational subject.",
            ageLimit: {
              description:
                "There is no age limit for candidates to appear in the JEE Main examination. However, candidates should satisfy the age criteria of the institutes in which they wish to take admission.",
              note: "Candidates should check the age limit requirements of the specific institutes they are interested in.",
            },
            numberOfAttempts:
              "Candidates are allowed to appear for the JEE Main exam for three consecutive years from the year of passing their 12th class examination. The exam is conducted twice a year, and candidates can appear in both sessions within the same year.",
            numberOfSubjectsRequiredIn12th:
              "Candidates must have at least 5 subjects in the 12th class or equivalent examination. It is mandatory to have Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Technical Vocational subjects.",
            additionalCriteria:
              "The eligibility for admission to NITs, IIITs, and CFTIs participating through the Central Seat Allocation Board will be based on at least 75% marks in the 12th class examination, or be in the top 20 percentile in the 12th class examination conducted by the respective boards. For SC/ST candidates, the qualifying marks would be 65% in the 12th class examination.",
          },
        },
        {
          examName: "JEE ADVANCED",
          description:
            "The Joint Entrance Examination (JEE) Advanced is conducted for admission to the prestigious Indian Institutes of Technology (IITs) and a few other institutes. This exam is the second phase of the JEE and can only be attempted by candidates who clear the JEE Main examination.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have qualified the JEE Main exam of the current year and be among the top candidates in JEE Main, across various categories.",
            ageLimit: {
              description:
                "Candidates should be born on or after October 1, 1999. However, there is a relaxation of 5 years for SC, ST, and PwD candidates, meaning these candidates should have been born on or after October 1, 1994.",
              note: "Age criteria are subject to change, and it's advisable to check the official JEE Advanced notification for the most current information.",
            },
            numberOfAttempts:
              "Candidates can attempt JEE Advanced a maximum of two times in two consecutive years.",
            numberOfSubjectsRequiredIn12th:
              "Candidates must have passed their class 12th examination with Physics, Chemistry, and Mathematics as compulsory subjects. Additionally, they must have a language and any other subject as part of their qualifying examination.",
            additionalCriteria: {
              percentageRequirement:
                "While there is no specific percentage required to appear for JEE Advanced, candidates must have secured a pass mark in class 12th or equivalent.",
              top20PercentileRequirement:
                "Qualifying candidates must also satisfy conditions related to the top 20 percentile of the qualifying examination conducted by their respective boards, or secure 75% marks (65% for SC/ST/PwD) in the 12th class examination, whichever is lower.",
            },
          },
        },
        {
          examName: "GATE",
          description:
            "Graduate Aptitude Test in Engineering (GATE) is a national examination that tests the comprehensive understanding of various undergraduate subjects in engineering and science for admission into the Master’s Program and Recruitment by some Public Sector Companies.",
          eligibilityCriteria: {
            educationalQualification:
              "Bachelor’s degree holders in Engineering/Technology/Architecture and those who are in the final year of such programs. Candidates with Master’s degree in any branch of Science/Mathematics/Statistics/Computer Applications or equivalent and those who are in the final year of such programs.",
            ageLimit: {
              description: "There is no age limit for GATE applicants.",
              note: "",
            },
            numberOfAttempts: "There is no limit on the number of attempts.",
            numberOfSubjectsRequiredIn12th: "Not applicable for GATE.",
            additionalCriteria: {
              percentageRequirement: "Not specified.",
              top20PercentileRequirement: "Not applicable.",
            },
          },
        },
        {
          examName: "BITSAT",
          description:
            "Birla Institute of Technology and Science Admission Test (BITSAT) is an online test for admissions to Integrated First Degree programmes of BITS Pilani Campuses in Pilani, Goa and Hyderabad.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed the 12th examination of 10+2 system from a recognized Central or State board with Physics, Chemistry, and Mathematics and adequate proficiency in English.",
            ageLimit: {
              description:
                "Candidates should have passed 12th grade in 2023 or 2024.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt BITSAT only once in a year.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, and Mathematics are required.",
            additionalCriteria: {
              percentageRequirement:
                "A minimum of aggregate 75% marks in Physics, Chemistry and Mathematics subjects in 12th examination, with at least 60% marks in each of the Physics, Chemistry, and Mathematics subjects.",
              top20PercentileRequirement: "Not applicable.",
            },
          },
        },
        {
          examName: "VITEEE",
          description:
            "VIT Engineering Entrance Examination (VITEEE) is a common entrance exam for VIT Vellore, VIT Chennai, VIT-AP, and VIT-Bhopal.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates appearing for the VITEEE should have secured an aggregate of 60% in Physics, Chemistry, and Mathematics/Biology in the qualifying examination (+2/Intermediate).",
            ageLimit: {
              description:
                "Candidates born on or after July 1, 2002, are eligible to apply.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, and Mathematics/Biology.",
            additionalCriteria: {
              percentageRequirement:
                "60% in PCM/B for general candidates. For candidates from SC/ST, North Eastern states, and Jammu & Kashmir, the aggregate should be 50%.",
              top20PercentileRequirement: "Not applicable.",
            },
          },
        },
        {
          examName: "SRMJEEE",
          description:
            "SRM Joint Engineering Entrance Examination (SRMJEEE) is conducted by SRM Institute of Science and Technology for admission to its undergraduate engineering programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Passed Higher Secondary examination (10+2 pattern) with minimum 50% aggregate in PCM.",
            ageLimit: {
              description:
                "Candidates must have been born between July 1, 2002, and July 1, 2007.",
              note: "",
            },
            numberOfAttempts: "Candidates can attempt the exam once per year.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, and Mathematics.",
            additionalCriteria: {
              percentageRequirement: "Minimum 50% aggregate in PCM.",
              top20PercentileRequirement: "Not applicable.",
            },
          },
        },
      ],
    },
    {
      name: "Medical",
      exams: [
        {
          examName: "NEET (National Eligibility cum Entrance Test)",
          description:
            "NEET is a national-level entrance examination in India for students who wish to pursue undergraduate medical courses (MBBS) and dental courses (BDS) in government or private medical colleges in India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects from a recognized board.",
            ageLimit: {
              description:
                "Candidates must be at least 17 years old at the time of admission or will complete the age on or before December 31 of the year of admission. There is no upper age limit for NEET.",
              note: "",
            },
            numberOfAttempts:
              "There is no limit on the number of attempts for NEET.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, Biology/Biotechnology, and English.",
            additionalCriteria: {
              percentageRequirement:
                "General category candidates must score at least 50% aggregate marks in Physics, Chemistry, and Biology/Biotechnology in their qualifying examination. For SC/ST/OBC candidates, the minimum aggregate required is 40%, and for PwD candidates, it is 45%.",
              otherRequirements:
                "Candidates must also qualify for the NEET entrance examination.",
            },
          },
        },
        {
          examName: "AIIMS MBBS Entrance Examination",
          description:
            "The All India Institute of Medical Sciences (AIIMS) conducts its own entrance examination for admission to its MBBS program.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent with Physics, Chemistry, Biology, and English as core subjects from a recognized board.",
            ageLimit: {
              description:
                "Candidates must have attained or will attain the age of 17 years as of the 31st of December of the year of admission. There is no upper age limit.",
              note: "",
            },
            numberOfAttempts:
              "There is no limit on the number of attempts for AIIMS MBBS Entrance Examination.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, Biology, and English.",
            additionalCriteria: {
              percentageRequirement:
                "Candidates must have scored at least 60% marks (50% for SC/ST candidates) in aggregate in English, Physics, Chemistry, and Biology in the qualifying examination.",
              otherRequirements:
                "Candidates must also qualify the AIIMS MBBS entrance examination.",
            },
          },
        },
        {
          examName: "JIPMER MBBS Entrance Examination",
          description:
            "Jawaharlal Institute of Postgraduate Medical Education & Research (JIPMER) conducts its own entrance examination for admission to its MBBS program.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent with Physics, Chemistry, Biology/Biotechnology, and English as core subjects from a recognized board.",
            ageLimit: {
              description:
                "Candidates must have completed 17 years of age at the time of admission. There is no upper age limit.",
              note: "",
            },
            numberOfAttempts:
              "There is no restriction on the number of attempts for the JIPMER MBBS Entrance Examination.",
            numberOfSubjectsRequiredIn12th:
              "Physics, Chemistry, Biology/Biotechnology, and English.",
            additionalCriteria: {
              percentageRequirement:
                "General category candidates must obtain a minimum of 50% marks taken together in Physics, Chemistry, Biology/Biotechnology in the qualifying examination. For SC/ST/OBC candidates, the minimum aggregate required is 40%, and for PwD candidates, it is 45%.",
              otherRequirements:
                "Candidates must also qualify the JIPMER MBBS entrance examination.",
            },
          },
        },
      ],
    },
    {
      name: "law",
      exams: [
        {
          examName: "CLAT (Common Law Admission Test)",
          description:
            "CLAT is a centralized test for admission to 22 National Law Universities in India and several other institutions. It covers questions on English, general knowledge, mathematics, legal aptitude, and logical reasoning.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with a minimum of 45% marks (40% for SC/ST candidates).",
            ageLimit: {
              description: "There is no upper age limit for CLAT.",
              note: "",
            },
            numberOfAttempts:
              "There is no restriction on the number of attempts for CLAT.",
            additionalCriteria: {
              subjectsRequiredIn12th:
                "There is no specific subject requirement for CLAT, although proficiency in English, General Knowledge, Mathematics, Legal Aptitude, and Logical Reasoning is necessary.",
              otherRequirements:
                "Candidates must also clear the CLAT entrance examination.",
            },
          },
        },
        {
          examName: "AILET (All India Law Entrance Test)",
          description:
            "AILET is conducted by the National Law University, Delhi, for admission to its various undergraduate and postgraduate law programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with a minimum of 50% marks (45% for SC/ST candidates).",
            ageLimit: {
              description:
                "Candidates should be below 20 years of age as of July 1st of the year of examination (22 years in case of SC/ST candidates).",
              note: "",
            },
            numberOfAttempts:
              "There is no restriction on the number of attempts for AILET.",
            additionalCriteria: {
              subjectsRequiredIn12th:
                "There is no specific subject requirement for AILET, although proficiency in English, General Knowledge, Mathematics, Legal Aptitude, and Logical Reasoning is necessary.",
              otherRequirements:
                "Candidates must also clear the AILET entrance examination.",
            },
          },
        },
        {
          examName: "LSAT India (Law School Admission Test India)",
          description:
            "LSAT India is conducted by the Law School Admission Council (LSAC) for admissions to various law colleges and institutions in India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There is no age limit for LSAT India.",
              note: "",
            },
            numberOfAttempts:
              "There is no restriction on the number of attempts for LSAT India.",
            additionalCriteria: {
              subjectsRequiredIn12th:
                "There is no specific subject requirement for LSAT India, although proficiency in English and logical reasoning is crucial.",
              otherRequirements:
                "Candidates must also register and clear the LSAT India examination.",
            },
          },
        },
      ],
    },
    {
      name: "architecture",
      exams: [
        {
          examName: "NATA (National Aptitude Test in Architecture)",
          description:
            "NATA is a national level examination conducted by the Council of Architecture (COA) for admission to undergraduate architecture programs across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Mathematics as one of the subjects or a 10+3 Diploma recognized by the Central/State Government with Mathematics as a compulsory subject.",
            ageLimit: {
              description: "There is no age limit for NATA.",
              note: "",
            },
            numberOfAttempts:
              "Candidates may attempt NATA as many times as they wish within the validity period of the NATA scorecard.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must qualify the NATA examination.",
            },
          },
        },
        {
          examName: "JEE Main Paper 2",
          description:
            "JEE Main Paper 2 is conducted by the National Testing Agency (NTA) for admission to B.Arch courses offered by various engineering colleges across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Mathematics as one of the subjects, along with Physics and Chemistry.",
            ageLimit: {
              description:
                "There is no specific age limit for JEE Main Paper 2.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt JEE Main Paper 2 a maximum of three times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the JEE Main Paper 2 examination.",
            },
          },
        },
        {
          examName: "CEPT Entrance Exam",
          description:
            "CEPT University conducts its own entrance exam for admission to undergraduate and postgraduate architecture programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria vary for different programs. Generally, candidates should have passed 10+2 or equivalent examination with Mathematics as one of the subjects.",
            ageLimit: {
              description:
                "Age limit, if any, will be specified by CEPT University and may vary for different programs.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the CEPT entrance examination.",
            },
          },
        },
      ],
    },
    {
      name: "commerce",
      exams: [
        {
          examName: "CA Foundation (Chartered Accountancy Foundation)",
          description:
            "CA Foundation is an entry-level exam for Chartered Accountancy course conducted by the Institute of Chartered Accountants of India (ICAI). It tests fundamental knowledge in accounting, mercantile laws, general economics, and quantitative aptitude.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There is no specific age limit for CA Foundation.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can appear for CA Foundation exams any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also register with ICAI and fulfill other registration requirements.",
            },
          },
        },
        {
          examName: "CPT (Common Proficiency Test)",
          description:
            "CPT was an entry-level examination for the Chartered Accountancy course. It has been replaced by the CA Foundation course by ICAI.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There was no specific age limit for CPT.",
              note: "CPT has been discontinued, and candidates now need to appear for the CA Foundation exam.",
            },
            numberOfAttempts: "Not applicable.",
            additionalCriteria: {
              otherRequirements: "Not applicable.",
            },
          },
        },
        {
          examName: "CS Foundation (Company Secretary Foundation)",
          description:
            "CS Foundation is an entry-level exam for Company Secretaryship course conducted by the Institute of Company Secretaries of India (ICSI). It covers topics like business environment and law, business management, ethics and communication, economics, and fundamentals of accounting and auditing.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There is no specific age limit for CS Foundation.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can appear for CS Foundation exams any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also register with ICSI and fulfill other registration requirements.",
            },
          },
        },
        {
          examName: "BBA Entrance Exams",
          description:
            "Various colleges and universities conduct entrance exams for admission to Bachelor of Business Administration (BBA) programs. Some notable ones include DU JAT (Delhi University Joint Admission Test), IPM AT (Integrated Programme in Management Aptitude Test) for IIM Indore, and NPAT BBA for NMIMS Mumbai.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different BBA entrance exams. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description:
                "Age limit, if any, will be specified by the respective conducting authorities and may vary for different exams.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the respective conducting authorities for each BBA entrance exam.",
            },
          },
        },
      ],
    },
    {
      name: "Science",
      exams: [
        {
          examName: "JEE Main (Joint Entrance Examination Main)",
          description:
            "JEE Main is a national-level engineering entrance exam conducted for admission to undergraduate engineering programs at NITs, IIITs, and other centrally funded technical institutions, as well as for admission to the B.Tech programs offered by IITs.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Physics, Chemistry, and Mathematics as core subjects.",
            ageLimit: {
              description: "There is no age limit for appearing in JEE Main.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt JEE Main a maximum of three times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the JEE Main examination.",
            },
          },
        },
        {
          examName: "NEET (National Eligibility cum Entrance Test)",
          description:
            "NEET is a national-level medical entrance exam conducted for admission to undergraduate medical (MBBS), dental (BDS), and AYUSH courses in government or private medical colleges in India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Physics, Chemistry, Biology/Biotechnology, and English as core subjects.",
            ageLimit: {
              description:
                "Candidates must be at least 17 years old at the time of admission or will complete the age on or before December 31 of the year of admission. There is no upper age limit for NEET.",
              note: "",
            },
            numberOfAttempts:
              "There is no limit on the number of attempts for NEET.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the NEET examination.",
            },
          },
        },
        {
          examName: "KVPY (Kishore Vaigyanik Protsahan Yojana)",
          description:
            "KVPY is a national-level scholarship program funded by the Department of Science and Technology, Government of India. It aims to encourage students to take up research careers in science.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria vary for different streams (SA, SX, SB) of KVPY. Generally, candidates should have passed the 10th/11th/12th standard examination as per the respective stream requirements.",
            ageLimit: {
              description:
                "Age limit varies for different streams (SA, SX, SB) of KVPY. Candidates should check the official notification for the specific age criteria.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the KVPY examination.",
            },
          },
        },
        {
          examName: "IISER Aptitude Test",
          description:
            "The Indian Institutes of Science Education and Research (IISERs) conduct aptitude tests for admission to their 5-year integrated BS-MS degree programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Science subjects.",
            ageLimit: {
              description:
                "Candidates should be within the specified age limit as per the IISERs' guidelines.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the IISER Aptitude Test.",
            },
          },
        },
      ],
    },
    {
      name: "Management",
      exams: [
        {
          examName: "CAT (Common Admission Test)",
          description:
            "CAT is a national-level management entrance examination conducted by the Indian Institutes of Management (IIMs) for admission to postgraduate management programs (MBA) offered by various IIMs and other top B-schools in India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any discipline from a recognized university or equivalent. Final year students are also eligible to apply.",
            ageLimit: {
              description: "There is no age limit for appearing in CAT.",
              note: "",
            },
            numberOfAttempts: "Candidates can attempt CAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also meet the eligibility criteria specified by the respective IIMs and other participating institutes.",
            },
          },
        },
        {
          examName: "MAT (Management Aptitude Test)",
          description:
            "MAT is a national-level management entrance exam conducted by the All India Management Association (AIMA) for admission to various MBA and allied programs offered by B-schools across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any discipline from a recognized university or equivalent.",
            ageLimit: {
              description: "There is no age limit for appearing in MAT.",
              note: "",
            },
            numberOfAttempts: "Candidates can attempt MAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also meet the eligibility criteria specified by the participating management institutes.",
            },
          },
        },
        {
          examName: "XAT (Xavier Aptitude Test)",
          description:
            "XAT is a national-level management entrance exam conducted by XLRI Jamshedpur for admission to various management programs offered by XLRI and other participating institutes.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any discipline from a recognized university or equivalent.",
            ageLimit: {
              description: "There is no age limit for appearing in XAT.",
              note: "",
            },
            numberOfAttempts: "Candidates can attempt XAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also meet the eligibility criteria specified by XLRI and other participating institutes.",
            },
          },
        },
        {
          examName: "CMAT (Common Management Admission Test)",
          description:
            "CMAT is a national-level management entrance exam conducted by the National Testing Agency (NTA) for admission to MBA and PGDM programs offered by various AICTE-approved institutions across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any discipline from a recognized university or equivalent.",
            ageLimit: {
              description: "There is no age limit for appearing in CMAT.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt CMAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also meet the eligibility criteria specified by the participating institutes.",
            },
          },
        },
      ],
    },
    {
      name: "IT",
      exams: [
        {
          examName: "JEE Main Paper 2 (B.Arch)",
          description:
            "JEE Main Paper 2 is conducted by the National Testing Agency (NTA) for admission to B.Arch (Bachelor of Architecture) programs offered by various engineering colleges across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Mathematics as one of the subjects, along with Physics and Chemistry.",
            ageLimit: {
              description:
                "There is no specific age limit for JEE Main Paper 2.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt JEE Main Paper 2 a maximum of three times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the JEE Main Paper 2 examination.",
            },
          },
        },
        {
          examName:
            "NIMCET (National Institute of Technology MCA Common Entrance Test)",
          description:
            "NIMCET is a national-level entrance exam conducted by NITs for admission to the Master of Computer Applications (MCA) program.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any discipline from a recognized university with Mathematics/Statistics as one of the subjects, or they should have studied Mathematics/Statistics at 10+2 level.",
            ageLimit: {
              description: "There is no age limit for appearing in NIMCET.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt NIMCET a maximum of three times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also meet the eligibility criteria specified by the participating NITs.",
            },
          },
        },
        {
          examName:
            "GATE (Graduate Aptitude Test in Engineering) - Computer Science and Information Technology (CS)",
          description:
            "GATE is a national-level examination conducted for admission to postgraduate programs in engineering and technology.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in Engineering/Technology or Master's degree in any branch of Science/Mathematics/Statistics/Computer Applications or equivalent.",
            ageLimit: {
              description: "There is no age limit for appearing in GATE.",
              note: "",
            },
            numberOfAttempts:
              "There is no limit on the number of attempts for GATE.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the GATE examination.",
            },
          },
        },
        {
          examName: "B.Sc. IT Entrance Exams",
          description:
            "Various colleges and universities conduct entrance exams for admission to Bachelor of Science in Information Technology (B.Sc. IT) programs. Eligibility criteria and exam patterns may vary.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different B.Sc. IT entrance exams. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description:
                "Age limit, if any, will be specified by the respective conducting authorities and may vary for different exams.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the respective colleges or universities for each B.Sc. IT entrance exam.",
            },
          },
        },
      ],
    },
    {
      name: "Pharmacy",
      exams: [
        {
          examName: "GPAT (Graduate Pharmacy Aptitude Test)",
          description:
            "GPAT is a national-level entrance exam conducted by the National Testing Agency (NTA) for admission to postgraduate pharmacy courses (M.Pharm) in various colleges and universities across India.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in Pharmacy (4 years after 10+2, including lateral entry candidates) or equivalent from a recognized university.",
            ageLimit: {
              description: "There is no age limit for appearing in GPAT.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt GPAT a maximum of three times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the GPAT examination.",
            },
          },
        },
        {
          examName: "BPharm Entrance Exams",
          description:
            "Various colleges and universities conduct entrance exams for admission to Bachelor of Pharmacy (B.Pharm) programs. Eligibility criteria and exam patterns may vary.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different B.Pharm entrance exams. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board with Physics, Chemistry, and Biology/Mathematics as subjects.",
            ageLimit: {
              description:
                "Age limit, if any, will be specified by the respective conducting authorities and may vary for different exams.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the respective colleges or universities for each B.Pharm entrance exam.",
            },
          },
        },
        {
          examName: "BITSAT Pharmacy",
          description:
            "BITSAT is conducted by Birla Institute of Technology and Science (BITS) for admission to its integrated first-degree programs including B.Pharm.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination from a recognized board with Physics, Chemistry, and Mathematics/Biology as subjects.",
            ageLimit: {
              description: "There is no specific age limit for BITSAT.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt BITSAT a maximum of two times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the BITSAT examination.",
            },
          },
        },
      ],
    },
    {
      name: "Design",
      exams: [
        {
          examName:
            "NID DAT (National Institute of Design - Design Aptitude Test)",
          description:
            "NID DAT is a national-level entrance exam conducted by the National Institute of Design for admission to undergraduate and postgraduate design programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for undergraduate and postgraduate programs. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There is no specific age limit for NID DAT.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt NID DAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the NID DAT examination.",
            },
          },
        },
        {
          examName: "CEED (Common Entrance Examination for Design)",
          description:
            "CEED is a national-level entrance exam conducted by IIT Bombay for admission to postgraduate programs in design.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in Engineering/Architecture/Design/Interior Design or equivalent, or a Professional Diploma in Design (NID/CEPT or equivalent) with at least 55% marks (50% for SC/ST/PwD candidates).",
            ageLimit: {
              description: "There is no age limit for CEED.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt CEED a maximum of two times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the CEED examination.",
            },
          },
        },
        {
          examName:
            "NIFT Entrance Exam (National Institute of Fashion Technology)",
          description:
            "NIFT conducts its own entrance exam for admission to undergraduate and postgraduate programs in fashion design.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for undergraduate and postgraduate programs. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description:
                "There is no specific age limit for NIFT entrance exam.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt NIFT entrance exam any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the NIFT entrance examination.",
            },
          },
        },
      ],
    },
    {
      name: "Art",
      exams: [
        {
          examName: "CEED (Common Entrance Examination for Design)",
          description:
            "CEED is a national-level entrance exam conducted by IIT Bombay for admission to postgraduate programs in design. While it's not specifically focused on art, it includes aspects of visual and creative arts.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in Engineering/Architecture/Design/Interior Design or equivalent, or a Professional Diploma in Design (NID/CEPT or equivalent) with at least 55% marks (50% for SC/ST/PwD candidates).",
            ageLimit: {
              description: "There is no age limit for CEED.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt CEED a maximum of two times in consecutive years.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the CEED examination.",
            },
          },
        },
        {
          examName:
            "NID DAT (National Institute of Design - Design Aptitude Test)",
          description:
            "NID DAT is a national-level entrance exam conducted by the National Institute of Design for admission to undergraduate and postgraduate design programs. It involves aspects of art, creativity, and design thinking.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for undergraduate and postgraduate programs. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description: "There is no specific age limit for NID DAT.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt NID DAT any number of times.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the NID DAT examination.",
            },
          },
        },
        {
          examName: "BFA Entrance Exams (Bachelor of Fine Arts)",
          description:
            "Various colleges and universities conduct entrance exams for admission to Bachelor of Fine Arts (BFA) programs. These exams assess candidates' skills and aptitude in various forms of visual arts.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different BFA entrance exams. Generally, candidates should have passed 10+2 or equivalent examination from a recognized board.",
            ageLimit: {
              description:
                "Age limit, if any, will be specified by the respective conducting authorities and may vary for different exams.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the respective colleges or universities for each BFA entrance exam.",
            },
          },
        },
      ],
    },
    {
      name: "Aviation",
      exams: [
        {
          examName: "CPL (Commercial Pilot License) Entrance Exams",
          description:
            "Various aviation academies and flying schools conduct entrance exams for admission to Commercial Pilot License (CPL) training programs.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different CPL entrance exams. Generally, candidates should have passed 10+2 or equivalent examination with Physics and Mathematics as subjects from a recognized board.",
            ageLimit: {
              description:
                "Candidates should be at least 17 years old to apply for CPL training.",
              note: "",
            },
            numberOfAttempts: "Information not specified.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the respective aviation academies or flying schools for each CPL entrance exam.",
            },
          },
        },
        {
          examName:
            "IGRUA Entrance Exam (Indira Gandhi Rashtriya Uran Akademi)",
          description:
            "IGRUA conducts its own entrance exam for admission to its Commercial Pilot Training (CPL) program.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have passed 10+2 or equivalent examination with Physics, Mathematics, and English as subjects from a recognized board.",
            ageLimit: {
              description:
                "Candidates should be at least 17 years old to apply for the CPL program at IGRUA.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt the IGRUA entrance exam as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the IGRUA entrance examination.",
            },
          },
        },
        {
          examName: "AFCAT (Air Force Common Admission Test)",
          description:
            "AFCAT is conducted by the Indian Air Force for selection of officers in Flying, Ground Duty (Technical), and Ground Duty (Non-Technical) branches.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria vary for different branches. For Flying Branch, candidates should have a Bachelor's degree from a recognized university with Physics and Mathematics at 10+2 level, or should have passed Engineering/Technology degree. For Technical and Non-Technical branches, educational qualifications vary.",
            ageLimit: {
              description:
                "Age limit varies for different branches and posts. Candidates should check the official notification for specific age criteria.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt AFCAT as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must fulfill the eligibility criteria specified by the Indian Air Force for AFCAT.",
            },
          },
        },
      ],
    },
    {
      name: "biotechnology",
      exams: [
        {
          examName:
            "JGEEBILS (Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences)",
          description:
            "JGEEBILS is a national-level entrance exam conducted by the Tata Institute of Fundamental Research (TIFR) for admission to Ph.D. and Integrated Ph.D. programs in Biology and Interdisciplinary Life Sciences.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in any branch of science, mathematics, or computer science.",
            ageLimit: {
              description: "There is no specific age limit for JGEEBILS.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt JGEEBILS as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also fulfill the eligibility criteria specified by TIFR for JGEEBILS.",
            },
          },
        },
        {
          examName:
            "GATE (Graduate Aptitude Test in Engineering) - Biotechnology (BT)",
          description:
            "GATE is a national-level examination conducted for admission to postgraduate programs in engineering and technology. Biotechnology is one of the disciplines covered in GATE.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Bachelor's degree in Engineering/Technology or Master's degree in any branch of Science/Mathematics/Statistics/Computer Applications or equivalent.",
            ageLimit: {
              description: "There is no age limit for appearing in GATE.",
              note: "",
            },
            numberOfAttempts:
              "There is no limit on the number of attempts for GATE.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the GATE examination in Biotechnology (BT) paper.",
            },
          },
        },
        {
          examName:
            "ICAR AIEEA (Indian Council of Agricultural Research All India Entrance Examination)",
          description:
            "ICAR AIEEA is conducted for admission to undergraduate and postgraduate programs in agriculture and allied sciences, including biotechnology.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria vary for different courses. Generally, for undergraduate programs, candidates should have passed 10+2 or equivalent examination with Physics, Chemistry, Biology/Agriculture, and English as subjects. For postgraduate programs, educational qualifications vary.",
            ageLimit: {
              description: "There is no specific age limit for ICAR AIEEA.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt ICAR AIEEA as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also fulfill the eligibility criteria specified by ICAR for AIEEA.",
            },
          },
        },
      ],
    },
    {
      name: "Communication",
      exams: [
        {
          examName: "NET (National Eligibility Test) - Communication",
          description:
            "NET is a national-level eligibility test conducted by the National Testing Agency (NTA) on behalf of the University Grants Commission (UGC) for determining the eligibility for Assistant Professorship and for Junior Research Fellowship (JRF) in Indian universities and colleges. The Communication subject is part of the Humanities and Social Sciences category.",
          eligibilityCriteria: {
            educationalQualification:
              "Candidates should have a Master's degree in Communication or related fields such as Mass Communication, Journalism, Media Studies, Advertising, Public Relations, or equivalent from a recognized university.",
            ageLimit: {
              description:
                "There is no upper age limit for appearing in NET for Assistant Professorship. For JRF, the upper age limit is 30 years (relaxation applicable for reserved categories).",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt NET as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also qualify the NET examination in the Communication subject.",
            },
          },
        },
        {
          examName:
            "IIMC Entrance Exam (Indian Institute of Mass Communication)",
          description:
            "IIMC conducts its own entrance exam for admission to its various postgraduate diploma programs in journalism, advertising, public relations, radio and television journalism, and communication research.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different programs. Generally, candidates should have a Bachelor's degree in any discipline from a recognized university.",
            ageLimit: {
              description:
                "There is no specific age limit for IIMC entrance exam.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt IIMC entrance exam as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also fulfill the eligibility criteria specified by IIMC for the respective programs.",
            },
          },
        },
        {
          examName:
            "XIC OET (Xavier Institute of Communications Online Entrance Test)",
          description:
            "XIC conducts the Online Entrance Test (OET) for admission to its various diploma and certificate programs in fields such as journalism, advertising, public relations, and film and television production.",
          eligibilityCriteria: {
            educationalQualification:
              "Eligibility criteria may vary for different programs. Generally, candidates should have a Bachelor's degree in any discipline from a recognized university.",
            ageLimit: {
              description: "There is no specific age limit for XIC OET.",
              note: "",
            },
            numberOfAttempts:
              "Candidates can attempt XIC OET as per the specified guidelines.",
            additionalCriteria: {
              otherRequirements:
                "Candidates must also fulfill the eligibility criteria specified by XIC for the respective programs.",
            },
          },
        },
      ],
    },
  ];
  const examList = data.map((item) => {
    return item.name.toLocaleLowerCase();
  });
  const [filterData, setFilterData] = useState(null); // Default to the first item
  useEffect(() => {
    param
      ? setFilterData(
          data.filter((item) => item.name.toLocaleLowerCase() === param)[0]
        )
      : "";
  }, [param]);
  const examData = [
    {
      title: "Joint Entrance Examination (JEE) Main",
      description:
        "JEE Main is a national-level engineering entrance exam conducted by the National Testing Agency (NTA) for admission to various undergraduate engineering programs in India.",
    },
    {
      title: "Graduate Aptitude Test in Engineering (GATE)",
      description:
        "GATE is a national-level examination conducted jointly by the Indian Institute of Science (IISc) and seven Indian Institutes of Technology (IITs) for admission to postgraduate programs in engineering and technology.",
    },
    {
      title: "National Eligibility cum Entrance Test (NEET)",
      description:
        "NEET is the primary entrance exam for admission to undergraduate medical and dental courses in India. It is conducted by the National Testing Agency (NTA).",
    },
    {
      title: "Common Law Admission Test (CLAT)",
      description:
        "CLAT is a centralized entrance exam for admission to undergraduate and postgraduate law programs offered by National Law Universities (NLUs) in India.",
    },
    {
      title: "Common Admission Test (CAT)",
      description:
        "CAT is a computer-based test conducted for admission to various management programs offered by Indian Institutes of Management (IIMs) and other top B-Schools in India.",
    },
    {
      title: "National Entrance Screening Test (NEST)",
      description:
        "NEST is a national-level entrance examination conducted for admission to the National Institute of Science Education and Research (NISER) and the University of Mumbai - Department of Atomic Energy Centre for Excellence in Basic Sciences (UM-DAE CEBS).",
    },
    {
      title: "National Institute of Fashion Technology Entrance Exam (NIFT)",
      description:
        "NIFT entrance exam is conducted for admission to undergraduate and postgraduate programs in fashion design, fashion technology, and other allied fields offered by the National Institute of Fashion Technology (NIFT) campuses across India.",
    },
    {
      title: "Xavier Aptitude Test (XAT)",
      description:
        "XAT is a national-level management entrance exam conducted by Xavier Labour Relations Institute (XLRI), Jamshedpur, for admission to various management programs offered by XLRI and other XAT member institutes.",
    },
    {
      title: "Common Management Admission Test (CMAT)",
      description:
        "CMAT is a national-level entrance examination conducted by the National Testing Agency (NTA) for admission to management programs approved by the All India Council for Technical Education (AICTE) across India.",
    },
    {
      title: "National Institute of Design Entrance Exam (NID DAT)",
      description:
        "NID DAT is conducted by the National Institute of Design (NID) for admission to undergraduate and postgraduate design programs offered at its campuses located in Ahmedabad, Gandhinagar, and Bengaluru.",
    },
    {
      title: "Indian Institute of Foreign Trade Admission Test (IIFT)",
      description:
        "IIFT entrance exam is conducted by the Indian Institute of Foreign Trade (IIFT) for admission to its MBA (International Business) program offered at its campuses in Delhi, Kolkata, and Kakinada.",
    },
    {
      title: "Symbiosis National Aptitude Test (SNAP)",
      description:
        "SNAP is a national-level management entrance exam conducted by Symbiosis International (Deemed University) for admission to various postgraduate management programs offered by its affiliated institutes.",
    },
    {
      title: "Management Aptitude Test (MAT)",
      description:
        "MAT is a national-level management entrance exam conducted by the All India Management Association (AIMA) for admission to various management programs offered by AIMA-affiliated institutes across India.",
    },
    {
      title: "Indian Institutes of Technology Joint Admission Test (IIT JAM)",
      description:
        "IIT JAM is conducted for admission to M.Sc., Joint M.Sc.-Ph.D., M.Sc.-Ph.D. Dual Degree, and other post-bachelor's degree programs at the Indian Institutes of Technology (IITs) and Indian Institute of Science (IISc).",
    },
    {
      title:
        "National Council for Hotel Management Joint Entrance Examination (NCHM JEE)",
      description:
        "NCHM JEE is conducted by the National Testing Agency (NTA) for admission to undergraduate programs in hospitality and hotel administration offered by participating institutes across India.",
    },
    {
      title: "Indian Statistical Institute Admission Test (ISI Admission Test)",
      description:
        "ISI Admission Test is conducted by the Indian Statistical Institute (ISI) for admission to undergraduate, postgraduate, and doctoral programs offered by ISI campuses in Kolkata, Delhi, Bangalore, and Chennai.",
    },
    {
      title: "All India Institute of Medical Sciences Entrance Exam (AIIMS)",
      description:
        "AIIMS entrance exam is conducted by the All India Institute of Medical Sciences (AIIMS) for admission to undergraduate and postgraduate medical courses offered at its various campuses across India.",
    },
    {
      title:
        "Indian Council of Agricultural Research All India Entrance Examination (ICAR AIEEA)",
      description:
        "ICAR AIEEA is conducted for admission to undergraduate and postgraduate programs in agriculture and allied sciences, including biotechnology.",
    },
    {
      title:
        "Indian Council of Forestry Research and Education (ICFRE) Entrance Exam",
      description:
        "ICFRE Entrance Exam is conducted for admission to various undergraduate and postgraduate programs in forestry and allied disciplines offered by the Indian Council of Forestry Research and Education (ICFRE) and its affiliated institutes.",
    },
    {
      title:
        "Indian Institutes of Technology Joint Entrance Examination (IIT JEE Advanced)",
      description:
        "IIT JEE Advanced is conducted for admission to undergraduate programs offered by the Indian Institutes of Technology (IITs) and some other institutes. It is the second phase of the JEE and can only be attempted by candidates who clear the JEE Main examination.",
    },
  ];

  return (
    <main className="top exam">
      <Header
        title="Top Entrance Exams Details"
        image="https://digitallearning.eletsonline.com/wp-content/uploads/2017/03/o-INDIA-ENTRANCE-EXAM-facebook.jpg"
      />
      <section className="exam-detail">
        <h1>India&apos; Top Entrance Exams</h1>
        <p>
          Welcome to our comprehensive guide on top entrance exams! Whether
          you&apos;re a student preparing for higher education or a professional
          seeking career advancement, navigating the myriad of entrance exams
          can be daunting. In this guide, we&apos;ve compiled information on
          some of the most prominent entrance exams across various fields to
          help you make informed decisions about your educational and
          professional pursuits.
        </p>
        {param === undefined && !examList.includes(param) && (
          <section className="examList">
            <h3>
              Here We Have {param} Entrance Exams details by category of
              interest
            </h3>
            <ExamList list={examList} />
          </section>
        )}
        {param !== undefined && filterData && <ExamDetails data={filterData} />}
      </section>
      <ExplorePrograms />
      <BookAConsult />
      <Faq items={examData} />
      <NewsLetter />
    </main>
  );
};
export default Exam;
