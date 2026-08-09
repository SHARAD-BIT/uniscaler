"use client";
import Faq from "../Decorators/Faq";
// import Button from "../Utils/Button";
import "./styles/help.css";

const FrequentAsk = () => {
  const faqs = [
    {
      title: "How do I apply for admission to Uniscaler?",
      description:
        "To apply for admission to Uniscaler, you can visit our website and fill out the online application form. Make sure to submit all required documents and pay the application fee as indicated. For specific application deadlines and requirements, please refer to our admissions page or contact the admissions office directly.",
    },
    {
      title: "What programs and courses does Uniscaler offer?",
      description:
        "Uniscaler offers a wide range of programs and courses across various disciplines, including arts, sciences, engineering, business, and more. You can explore our academic programs on our website or contact the academic departments for more information about specific programs.",
    },
    {
      title: "What are the admission requirements for Uniscaler?",
      description:
        "Admission requirements for Uniscaler vary depending on the program and level of study. Generally, applicants are required to submit high school transcripts, standardized test scores (such as the SAT or ACT), letters of recommendation, and a personal statement. Additional requirements may apply for specific programs or applicants. Please refer to our admissions page for detailed information.",
    },
    {
      title: "How can I schedule a campus tour or visit to Uniscaler?",
      description:
        "To schedule a campus tour or visit to Uniscaler, you can contact our admissions office or visit our website to see available tour dates and sign up for a tour. Campus tours are a great way to explore our facilities, meet faculty and staff, and learn more about life at Uniscaler.",
    },
    {
      title:
        "What financial aid options are available for students at Uniscaler?",
      description:
        "Uniscaler offers various financial aid options to help students fund their education, including scholarships, grants, loans, and work-study programs. Eligibility for financial aid depends on factors such as financial need, academic merit, and program of study. Our financial aid office is available to assist students in navigating the application process and exploring available funding options.",
    },
    {
      title: "Is housing available for students on campus?",
      description:
        "Yes, Uniscaler offers on-campus housing options for students. Our residential facilities provide comfortable living spaces, amenities, and a supportive community environment. To learn more about housing options and the application process, please visit our housing services page or contact the housing office.",
    },
    {
      title:
        "What support services does Uniscaler offer for students with disabilities?",
      description:
        "Uniscaler is committed to providing equal access and support for students with disabilities. Our disability services office offers a range of accommodations and support services to help students succeed academically and participate fully in campus life. To request accommodations or learn more about available services, please contact the disability services office.",
    },
    {
      title:
        "Are there opportunities for internships or co-op programs at Uniscaler?",
      description:
        "Yes, Uniscaler partners with employers and organizations to offer internship and co-op programs that provide valuable work experience and professional development opportunities for students. Our career services office can help you explore internship opportunities, develop your resume and interview skills, and prepare for your future career. Visit our career services page or contact the career services office for more information.",
    },
    {
      title:
        "What extracurricular activities and clubs are available for students?",
      description:
        "Uniscaler offers a wide range of extracurricular activities and clubs to suit diverse interests and hobbies. Whether you're interested in student government, sports, arts and culture, community service, or academic organizations, there's something for everyone to get involved in. Visit our student activities page or contact the student affairs office to learn more about available clubs and activities.",
    },
    {
      title:
        "How can I access my student portal and other online resources at Uniscaler?",
      description:
        "To access your student portal and other online resources at Uniscaler, you can log in to the student portal using your username and password. From the student portal, you can access course materials, grades, class schedules, and other important information. If you encounter any technical issues or need assistance with accessing online resources, please contact the IT help desk for support.",
    },
    {
      title: "What dining options are available on campus?",
      description:
        "Uniscaler offers a variety of dining options on campus to suit different tastes and dietary preferences. Our dining facilities include cafeterias, coffee shops, snack bars, and food courts offering a range of cuisines and meal options. Whether you're looking for a quick bite between classes or a sit-down meal with friends, you'll find plenty of delicious options to choose from.",
    },
    {
      title: "Can I transfer credits from another institution to Uniscaler?",
      description:
        "Yes, Uniscaler accepts transfer credits from accredited institutions under certain conditions. To transfer credits, you will need to submit official transcripts from your previous institution(s) and meet Uniscaler's transfer credit policies and requirements. Our transfer credit evaluation team will review your transcripts and determine the transferability of your credits. For more information about transferring credits, please visit our transfer admissions page or contact the admissions office.",
    },
    {
      title:
        "Are there opportunities for undergraduate research at Uniscaler?",
      description:
        "Yes, Uniscaler encourages undergraduate students to engage in research and scholarly activities under the guidance of faculty mentors. Our undergraduate research program provides opportunities for students to collaborate with faculty on research projects, gain hands-on experience in their field of study, and contribute to cutting-edge research. To learn more about undergraduate research opportunities, please contact the academic department or visit our undergraduate research page.",
    },

    {
      title:
        "What career services does Uniscaler offer to students and alumni?",
      description:
        "Uniscaler's career services office provides comprehensive career development resources and support to students and alumni. Our services include career counseling, resume and cover letter assistance, job search strategies, networking opportunities, and employer recruitment events. Whether you're exploring career options, preparing for internships or job interviews, or seeking employment opportunities, our career services team is here to help you succeed. Visit our career services page or contact the career services office for personalized assistance.",
    },

    {
      title:
        "How can I get involved in community service or volunteer opportunities through Uniscaler?",
      description:
        "Uniscaler offers a variety of community service and volunteer opportunities for students to give back to the local community and make a positive impact. Whether you're interested in volunteering with nonprofit organizations, participating in service-learning projects, or organizing community service events, there are plenty of ways to get involved. Visit our community service page or contact the student affairs office to learn more about volunteer opportunities and community service programs.",
    },

    {
      title:
        "What are the academic advising and counseling services available at Uniscaler?",
      description:
        "Uniscaler offers comprehensive academic advising and counseling services to help students achieve their academic and personal goals. Our academic advisors provide guidance on course selection, degree requirements, academic planning, and career pathways. Additionally, our counseling services offer support for personal and emotional issues, stress management, and mental health concerns. Whether you need assistance with academic planning or personal support, our advising and counseling services are here to help you succeed. Visit our academic advising and counseling page or contact the advising center for assistance.",
    },
    {
      title:
        "How can I request transcripts or other academic records from Uniscaler?",
      description:
        "To request transcripts or other academic records from Uniscaler, you can submit a request through our online portal or contact the registrar's office directly. Please note that there may be a processing fee for transcript requests, and processing times may vary depending on the volume of requests and the time of year. For more information about requesting transcripts or academic records, please visit our registrar's office page or contact the registrar's office.",
    },
    {
      title: "What campus safety measures are in place at Uniscaler?",
      description:
        "Uniscaler is committed to providing a safe and secure campus environment for all students, faculty, staff, and visitors. We have a dedicated campus safety and security team that works to maintain a safe campus through patrols, emergency response procedures, and crime prevention programs. Additionally, we offer resources and support services for victims of crime, emergency preparedness training, and campus safety awareness initiatives. To learn more about campus safety measures and resources, please visit our campus safety page or contact the campus safety office.",
    },
    {
      title:
        "Can international students apply to Uniscaler? What support services are available for them?",
      description:
        "Yes, international students are welcome to apply to Uniscaler. Our international admissions office provides support and assistance to international students throughout the admissions process, including visa application support, immigration advising, and cultural adjustment resources. Additionally, we offer international student orientation programs, English language support services, and international student organizations to help international students thrive academically and socially. For more information about applying as an international student and available support services, please visit our international admissions page or contact the international admissions office.",
    },
    {
      title:
        "How can I contact the admissions office or other departments at Uniscaler?",
      description:
        "To contact the admissions office or other departments at Uniscaler, you can visit our website for departmental contact information, including phone numbers, email addresses, and office locations. Additionally, you can submit inquiries through our online contact form or reach out to us via social media channels. Our staff members are available to assist you with any questions or concerns you may have. Visit our contact page for more information about how to reach us.",
    },
  ];
  const academicSupportContent = {
    title: "Academic Support",
    description:
      "At Uniscaler, we are committed to providing comprehensive academic support services to help students excel in their studies and achieve their academic goals. Whether you need assistance with coursework, study skills, or academic planning, our dedicated team of academic advisors, tutors, and support staff are here to help you succeed.Find out more about our academic support services here:",
    services: [
      {
        title: "Tutoring Services",
        description:
          "Our tutoring services offer one-on-one support and assistance to students who need extra help with course material or assignments. Tutors are available for a wide range of subjects and can help clarify concepts, review material, and provide study strategies to enhance your learning experience.",
      },
      {
        title: "Study Skills Workshops",
        description:
          "We offer study skills workshops and seminars to help students develop effective study habits, time management skills, and test-taking strategies. These workshops cover topics such as note-taking techniques, exam preparation, and stress management, equipping students with the tools they need to succeed academically.",
      },
      {
        title: "Academic Advising",
        description:
          "Our academic advising services provide personalized guidance and support to help students navigate their academic journey. Academic advisors work with students to develop academic plans, set goals, and explore opportunities for academic enrichment, ensuring that students stay on track towards graduation and academic success.",
      },
      {
        title: "Writing Center",
        description:
          "The Writing Center offers assistance with writing assignments, research papers, and other writing projects. Our writing tutors can help you brainstorm ideas, organize your thoughts, and improve your writing skills through constructive feedback and guidance. Whether you're working on an essay, report, or thesis, the Writing Center is here to help you become a more effective and confident writer.",
      },
      {
        title: "Academic Resources",
        description:
          "In addition to our support services, we provide access to a variety of academic resources, including online libraries, research databases, and study materials. These resources are designed to supplement classroom learning and provide students with additional support and information to enhance their academic experience.",
      },
      {
        title: "Peer Mentoring Programs",
        description:
          "Our peer mentoring programs pair experienced students with incoming students to provide academic and social support during their transition to college. Peer mentors offer guidance, encouragement, and advice to help new students navigate academic challenges, develop study skills, and adjust to college life.",
      },
      {
        title: "Math and Science Labs",
        description:
          "Our math and science labs provide hands-on learning opportunities and support for students enrolled in math and science courses. Lab assistants and tutors are available to help students with lab assignments, experiments, and concepts, reinforcing classroom learning and fostering a deeper understanding of course material.",
      },
      {
        title: "Language Support Services",
        description:
          "We offer language support services for students who are non-native speakers of English or who are studying foreign languages. Language support services include language tutoring, conversation practice sessions, and language proficiency assessments to help students improve their language skills and succeed academically.",
      },
    ],
  };
  const technicalAssistanceContent = {
    title: "Technical Assistance",
    description:
      "At Uniscaler, we understand that technology plays a crucial role in education. Our technical assistance services are designed to help students, faculty, and staff navigate technology-related challenges and ensure a seamless digital experience.",
    services: [
      {
        title: "IT Help Desk",
        description:
          "Our IT Help Desk provides technical support and assistance for students, faculty, and staff. Whether you're having trouble with your computer, need help accessing online resources, or have questions about software applications, our knowledgeable staff are here to help. You can reach the IT Help Desk by phone, email, or online chat for prompt assistance.",
      },
      {
        title: "E-Learning Platforms",
        description:
          "We offer support for e-learning platforms and online learning tools used in courses. Our technical support team can help you navigate the features of e-learning platforms, troubleshoot technical issues, and access course materials and resources online. Whether you're attending virtual lectures, participating in online discussions, or submitting assignments online, we're here to ensure a smooth learning experience.",
      },
      {
        title: "Computer Labs",
        description:
          "Our computer labs provide access to computers, printers, and software applications for students to use for coursework and projects. Lab assistants are available to provide technical assistance and support with computer hardware and software. Whether you need help printing documents, installing software, or troubleshooting computer problems, our computer labs are equipped to meet your needs.",
      },
      {
        title: "Wi-Fi and Network Services",
        description:
          "We provide Wi-Fi and network services to ensure reliable internet connectivity across campus. Our technical support team monitors and maintains the campus network infrastructure to ensure high-speed internet access and network reliability. If you're experiencing issues with Wi-Fi connectivity or network access, our support staff are available to assist you.",
      },
      {
        title: "Cybersecurity Awareness",
        description:
          "Cybersecurity is a top priority at Uniscaler, and we're committed to educating our community about online security best practices. Our cybersecurity awareness program provides resources and training to help students, faculty, and staff protect their personal information, prevent cyber threats, and stay safe online. Whether you need tips for creating secure passwords, identifying phishing scams, or safeguarding your devices, we're here to help you stay cyber aware.",
      },
    ],
  };
  const advisingAndCounselingContent = {
    title: "Advising and Counseling",
    description:
      "At Uniscaler, we understand that academic success is not just about coursework; it's also about personal growth and well-being. Our advising and counseling services are designed to provide students with the support and guidance they need to thrive academically, emotionally, and personally.",
    services: [
      {
        title: "Academic Advising",
        description:
          "Our academic advising services offer personalized guidance to help students navigate their academic journey. Academic advisors work with students to develop academic plans, set goals, and explore opportunities for academic enrichment. Whether you need assistance with course selection, degree planning, or career exploration, our advisors are here to help you succeed.",
      },
      {
        title: "Career Counseling",
        description:
          "Our career counseling services provide support and guidance to help students explore career options, develop career goals, and plan for their future. Career counselors offer assistance with resume writing, job search strategies, interview preparation, and career assessments. Whether you're exploring career paths, searching for internships, or preparing for your first job after graduation, our counselors can help you navigate the process.",
      },
      {
        title: "Personal Counseling",
        description:
          "We offer personal counseling services to support students' emotional and mental health needs. Our licensed counselors provide confidential counseling sessions to help students cope with personal challenges, manage stress, improve relationships, and enhance overall well-being. Whether you're dealing with academic stress, relationship issues, or mental health concerns, our counselors are here to listen and provide support.",
      },
      {
        title: "Wellness Workshops",
        description:
          "We offer wellness workshops and programs to promote students' physical, emotional, and mental well-being. These workshops cover topics such as stress management, mindfulness, self-care, and healthy living habits. Whether you're looking to reduce stress, improve sleep quality, or enhance your overall wellness, our workshops provide practical tips and strategies for living a balanced and healthy life.",
      },
      {
        title: "Support Groups",
        description:
          "We facilitate support groups and peer-led discussions to provide students with a supportive community and opportunities for connection and growth. These groups cover various topics such as academic success, identity exploration, cultural diversity, and LGBTQ+ support. Whether you're looking for academic support, personal growth, or a sense of community, our support groups offer a safe and inclusive space for students to connect and share experiences.",
      },
    ],
  };

  return (
    <main className="FequentAsk">
      {/* <Header
        title="Welcome to Uniscaler Help and Support Page!"
        image="https://www.york.ac.uk/media/studenthome/healthandwellbeing/1200x600_WellbeingGraphics_Support.png"
      /> */}
      <section className="page-section description">
        <p>
          We&apos;re here to provide you with all the assistance you need to
          navigate through your academic journey seamlessly. Whether you&apos;re
          a student, faculty member, or a visitor, we understand that you might
          encounter questions or challenges along the way. That&apos;s why
          we&apos;ve created this page to address your concerns and provide
          comprehensive guidance.
        </p>
      </section>
      <section className="page-section faqData description">
        <p>
          Before reaching out for assistance, you might find answers to your
          questions in our FAQ section. Here, we&apos;ve compiled a list of
          commonly asked questions covering various aspects of college life,
          academics, admissions, and more.
        </p>
        <Faq items={faqs} />
      </section>

      <section className="page-section">
        <Faq
          items={academicSupportContent.services}
          title={academicSupportContent.title}
          description={academicSupportContent.description}
        />
      </section>

      <section className="page-section">
        <Faq
          items={technicalAssistanceContent.services}
          title={technicalAssistanceContent.title}
          description={technicalAssistanceContent.description}
        />
      </section>

      <section className="page-section">
        <Faq
          items={advisingAndCounselingContent.services}
          title={advisingAndCounselingContent.title}
          description={advisingAndCounselingContent.description}
        />
      </section>

      {/* <section className="page-section contactUs">
        <h2>Contact Us</h2>
        <p>
          If you can&apos;t find the answers you&apos;re looking for or need
          further assistance, don&apos;t hesitate to reach out to us. You can
          contact our support team via email, phone, or visit our campus in
          person. We&apos;re committed to providing timely and helpful responses
          to all inquiries.
        </p>
        <Button text="Contact Us" link={"/contact"} />
      </section> */}
      {/* <NewsLetter /> */}
    </main>
  );
};

export default FrequentAsk;
