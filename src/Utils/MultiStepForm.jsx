"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import convoCapSrc from "../assets/convoCap.svg";

const convoCap = convoCapSrc.src;
import { useRouter } from "next/navigation";


const MultiStepForm = () => {
  const [selectCourse, setSelectCourse] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [sCourse, setSCourse] = useState("");
  const navigate = useRouter();
  const stepHandler = (val) => {
    if (val == 1) {
      setStep((pre) => pre - 1);
    }
    if (val == 2 && step < 7) {
      if (sCourse === "") {
        setError("Please Select an option");
      } else {
        setStep((pre) => pre + 1);
      }
    }
  };
  const submitHandler = () => {
    sCourse == "" && setError("Please Select an option");
    sCourse &&
      navigate.push("/register");
  };
  useEffect(() => {
    setSCourse("");
    setError("");
  }, [step]);
  const selectHandler = (name) => {
    setSCourse(name);
    step < 6 && setStep((pre) => pre + 1);
  };
  const questionList = [
    {
      question: "Are you Currently Working?",
      option: ["yes", "no"],
    },
    {
      question: "Choose the total course fees you have in mind!",
      option: [
        "Less than 1 Lakhs",
        "1 lakhs to 1.5 lakhs",
        "1.5 lakhs to 2.5 lakhs",
        "2.5 lakhs to 4.5 lakhs",
        "More than 5 lakhs",
      ],
    },
    {
      question: "Your Highest Qualification?",
      option: [
        "10th",
        "12th",
        "Graduation",
        "Post Graduation",
        "Diploma or Certificate",
      ],
    },
    {
      question: "Percentage scored in last qualification?",
      option: [
        "Less than 50%",
        "50% to 60%",
        "60% to 70%",
        "70% to 80%",
        "80% to 90%",
        "More than 90%",
      ],
    },
  ];
  const questionListUg = [
    {
      question: "Are you in 12th or 10th?",
      option: ["10th", "12th"],
    },
    {
      question: "Percentage scored in last qualification?",
      option: [
        "Less than 50%",
        "50% to 60%",
        "60% to 70%",
        "70% to 80%",
        "80% to 90%",
        "More than 90%",
      ],
    },
    {
      question: "Which stream are you in for 12th?",
      option: ["Commerce", "Science", "Humanities"],
    },
    {
      question: "What is your pass out Year?",
      option: [
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "Before 2019",
      ],
    },
  ];
  const ProgramsAfter12 = [
    {
      name: "Bachelor's Degree Programs",
      list: [
        "Bachelor of Arts (BA)",
        "Bachelor of Science (BSc)",
        "Bachelor of Commerce (BCom)",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Computer Applications (BCA)",
        "Bachelor of Engineering (BE/BTech) in various disciplines",
        "Bachelor of Architecture (BArch)",
        "Bachelor of Design (BDes)",
        "Bachelor of Fine Arts (BFA)",
        "Bachelor of Pharmacy (BPharma)",
        "Bachelor of Education (BEd)",
      ],
      questionList: questionListUg,
    },
    {
      name: "Master's Degree Programs",
      list: [
        "Master of Arts (MA)",
        "Master of Science (MSc)",
        "Master of Business Administration (MBA)",
        "Master of Engineering (ME/MTech)",
        "Master of Computer Applications (MCA)",
        "Master of Fine Arts (MFA)",
        "Master of Social Work (MSW)",
        "Master of Education (MEd)",
        "Master of Public Administration (MPA)",
      ],
      questionList: questionList,
    },
    {
      name: "Medical and Health Sciences",
      list: [
        "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
        "Bachelor of Dental Surgery (BDS)",
        "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
        "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
        "Bachelor of Pharmacy (BPharma)",
        "Bachelor of Nursing (BSc Nursing)",
      ],
      questionList: questionListUg,
    },
    {
      name: "Diploma and Certificate Courses",
      list: [
        "Diploma in Engineering",
        "Diploma in Hotel Management",
        "Diploma in Fashion Designing",
        "Diploma in Interior Designing",
        "Certificate courses in various fields like IT, languages, digital marketing, etc.",
      ],
      questionList: questionListUg,
    },
    {
      name: "Entrepreneurship and Skill Development Programs",
      list: [
        "Startup and Entrepreneurship programs",
        "Skill development courses in areas like digital skills, vocational skills, etc.",
      ],
      questionList: questionListUg,
    },

    {
      name: "Doctoral Programs",
      list: [
        "Doctor of Philosophy (Ph.D.)",
        "Doctor of Medicine (MD)",
        "Doctor of Jurisprudence (JD)",
        "Doctor of Pharmacy (PharmD)",
        "Doctor of Education (EdD)",
        "Doctor of Business Administration (DBA)",
        "Doctor of Engineering (DEng)",
      ],
      questionList: questionList,
    },
    {
      name: "Professional Courses",
      list: [
        "Chartered Financial Analyst (CFA)",
        "Certified Public Accountant (CPA)",
        "Project Management Professional (PMP)",
        "Certified Information Systems Auditor (CISA)",
        "Certified Human Resources Professional (CHRP)",
        "Certified Marketing Professional (CMP)",
        "Certified Supply Chain Professional (CSCP)",
        "Certified Data Scientist (CDS)",
      ],
      questionList: questionList,
    },
    {
      name: "Specialized Certifications and Training",
      list: [
        "Professional Certifications in IT (e.g., Cisco, Microsoft, CompTIA)",
        "Industry-specific certifications (e.g., AWS Certified Solutions Architect, Google Analytics Certification)",
        "Leadership and Management Training Programs",
        "Entrepreneurship and Innovation Programs",
      ],
      questionList: questionList,
    },
  ];

  return (
    <div className="multi-step-form">
      {step === 1 && (
        <section className="multi-step">
          <h2>Which degree program catches your interest ?</h2>
          <ul className="stepList">
            {ProgramsAfter12.map((item, index) => (
              <li
                key={index}
                className="step"
                onClick={() => {
                  setSelectCourse(item.name);
                  selectHandler(item.name);
                }}
              >
                <div className="icon">
                  <img src={convoCap} alt="convocation cap" />
                </div>
                <h3>{item.name}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === 2 && (
        <section>
          <h2>{selectCourse}</h2>
          <ul className="stepList">
            {ProgramsAfter12.find(
              (item) => item.name === selectCourse
            ).list.map((item, index) => (
              <li
                key={index}
                className="step"
                onClick={() => {
                  selectHandler(item);
                }}
              >
                <div className="icon icon2">
                  <img src={convoCap} alt="convocation cap" />
                </div>
                <h3>{item}</h3>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === 3 && (
        <section>
          <h2>{selectCourse}</h2>
          <ul className="questionList">
            {ProgramsAfter12.find((item) => item.name === selectCourse)
              .questionList.length > 3 ? (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[0].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[0].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[0].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            ) : (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[0].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[0].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[0].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            )}
          </ul>
        </section>
      )}
      {step === 4 && (
        <section>
          <h2>{selectCourse}</h2>
          <ul className="questionList">
            {ProgramsAfter12.find((item) => item.name === selectCourse)
              .questionList.length === 3 ? (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[1].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[1].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[1].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            ) : (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[1].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[1].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[1].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            )}
          </ul>
        </section>
      )}
      {step === 5 && (
        <section>
          <h2>{selectCourse}</h2>
          <ul className="questionList">
            {ProgramsAfter12.find((item) => item.name === selectCourse)
              .questionList.length === 3 ? (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[2].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[2].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[2].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            ) : (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[2].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[2].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[2].option.map((item) => {
                    return <p key={item}>{item}</p>;
                  })}
                </div>
              </li>
            )}
          </ul>
        </section>
      )}
      {step === 6 && (
        <section>
          <h2>{selectCourse}</h2>
          <ul className="questionList">
            {ProgramsAfter12.find((item) => item.name === selectCourse)
              .questionList.length === 4 && (
              <li
                className="question"
                onClick={() => {
                  selectHandler(
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[3].question
                  );
                }}
              >
                <h2>
                  {
                    ProgramsAfter12.find((item) => item.name === selectCourse)
                      .questionList[3].question
                  }
                </h2>
                <div className="optWrap">
                  {ProgramsAfter12.find(
                    (item) => item.name === selectCourse
                  ).questionList[3]?.option?.map((item) => {
                    return (
                      <p
                        key={item}
                        onClick={(e) => {
                          e.target.classList.toggle("active")
                          setSCourse("")
                        }}
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              </li>
            )}
          </ul>
        </section>
      )}
      {error && <p className="error">{error} </p>}
      <div className="aiBtnGrp">
        <button
          onClick={() => stepHandler(1)}
          className="btn"
          style={
            step == 1 ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          {" "}
          Previous{" "}
        </button>
        {step === 6 && sCourse !== "" ? (
          <button onClick={submitHandler} className="btn">
            {" "}
            Submit{" "}
          </button>
        ) : (
          <button onClick={() => stepHandler(2)} className="btn">
            {" "}
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
MultiStepForm.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};
