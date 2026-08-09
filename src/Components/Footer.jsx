"use client";
import Logo from "./Logo";
import "./styles/footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Link from "@/Utils/StateLink";

import {useMemo } from "react";
const Footer = () => {
  const topCoursesInIndia = [
    "B.Tech/B.E.",
    "MBBS",
    "BDS",
    "MBA",
    "BCA",
    "MCA",
    "B.Sc",
    "LLB",
    "B.Des",
    "M.Des",
    "B.Com",
    "M.Com",
    "BHM",
    "MHM",
    "BA",
    "Journalism",
    "B.Sc",
    "B.Pharm",
    "M.Pharm",
    "BBA",
    "MBA",
    "B.Ed",
    "M.Ed",
    "B.Arch",
    "M.Arch",
    "BCS",
    "MCS",
    "BFA",
    "MFA",
    "BPT",
    "MPT",
    "B.Sc",
    "M.Sc",
    "B.Voc",
    "M.Voc",
    "BMLT",
    "MMLT",
    "B.Tech",
    "M.Tech",
    "BBA LLB",
    "LLM",
    "CA",
    "CS",
  ];
  const socialMedia = [
    {
      id: 1,
      icon: <FaFacebookF />,
      url: "https://facebook.com",
    },
    {
      id: 2,
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@Uniscaler/",
    },
    {
      id: 3,
      icon: <FaInstagram />,
      url: "https://www.instagram.com/uniscaler?utm_source=qr&igsh=aHplZTFpY3I5aTRp",
    },
    {
      id: 4,
      icon: <FaXTwitter />,
      url: "https://twitter.com/Uniscaler",
    },
  ];
  const topLocation = [
    "Noida",
    "Gurugram",
    "Delhi",
    "Mohali",
    "Chandigarh",
    "Faridabad",
    "Agra",
    "Ghaziabad",
    "Jaipur",
    "Kolkata",
    "Kota",
  ];
  const address = {
    name: "Uniscaler",
    city: "Faridabad",
    state: "Haryana",
    pincode: 121004,
    country: "India",
    phone: "+91-9667956655",
    email: "hello@uniscaler.in",
    email2:"uniscalerx@gmail.com",
    website: "https://www.uniscaler.com",
    description: "NHPC Metro Station 13B, block A, DLF Industrial Area, Sec-32,Faridabad-121003,Haryana, India",
  };
  const Links = [
    {
      name: "Links",
      links: [
        {
          name: "About Us",
          path: "/about",
        },
        {
          name: "Contact Us",
          path: "/contact",
        },
        {
          name: "Blogs",
          path: "/blogs",
        },
      ],
    },
    {
      name: "Featured",
      links: [
        {
          name: "Top college",
          path: "/college/mba",
        },
        {
          name: "Top University",
          path: "/college/m.tech",
        },
        {
          name: "Top Courses",
          path: "/course",
        },
      ],
    },
    {
      name: "Quick Links",
      links: [
        {
            name:"Direct admission",
            path:"/direct-admission"
        },
        {
          name: "Education Loan",
          path: "/education-loan",
        },
        {
          name: "Scholarship",
          path: "/scholarship",
        },
        {
          name: "Common Application Form",
          path: "/common-application-form",
        },
        {
          name: "Sitemap",
          path: "/sitemap",
        },
      ],
    },
    {
      name: "Help & Support",
      links: [
        {
          name: "Help",
          path: "/help",
        },
        {
          name: "Privacy Policy",
          path: "/privacy-policy",
        },
        {
          name: "Terms & Conditions",
          path: "/terms-and-conditions",
        },
        {
          name: "Refund Policy",
          path: "/refund-policy",
        },
        {
          name: "Report a problem",
          path: "/report",
        },
        {
          name: "Copyright",
          path: "/copyright",
        },
      ],
    },
  ];
  const vocationalCourses = [
    "Web development",
    "Mern-stack developer",
    "Software developer",
    "Software engineer",
    "Electrical",
    "Mechanical",
    "Fitter",
    "Drafts man (Mech)",
    "Machinist",
    "Welder",
    "Plumber",
    "Art & Craft",
    "Computer software",
    "Computer hardware",
    "Hardware networking",
    "N.T.T",
    "P.T.T",
    "N.P.T.T",
    "Carpenter",
    "Beauty culture",
    "Auto Mobile",
    "Dipl. in electronics",
    "AC & refrigeration",
    "Dressmaking tailoring",
    "Cutting & Tailoring",
    "PG. & Dipl. in computer application",
    "Draughtsman(Civil)",
    "Draughtsman(Mech)",
    "Diesel mechanic",
    "Dipl. In line men",
    "Dipl. In Fire safety management",
    "Computer software 6 months",
    "Tally 3 months",
    "Multipurpose Health Worker",
    "Motor mechanic",
    "Tractor mechanical",
    "Gen. painter",
    "Draftsman (civil)",
    "Tally 3 month",
    "Dipl. In medical lab. tech.",
    "Bioler",
    "Dipl. in social work",
    "AC & Air condition",
    "Computer application",
    "Dip in civil surveyor",
    "Turner",
    "Computer science",
    "Dipl. in hairstyles & skincare",
    "DIPl. in civil",
    "Draftsman",
    "Dipl. in civil",
    "Wireman",
    "Computer hardware & networking",
    "Financial management",
    "PG dipl. In mass communication",
    "Dipl. in information tech.",
    "Welding & fitting mechanic(dual mode)",
    "Hotel management",
    "Dipl. in fitter",
    "Dipl. In operation theatre assistant",
    "Dipl. In tool & die",
    "Electronics & communication",
    "Dipl. In course Of concept On computer",
    "Iti electrician & plumber",
    "Dipl. in x-ray technology",
    "Dipl. In live stock",
    "Electrical & electronics",
    "Dipl. In beautician (6 Months)",
    "Dipl. In computer operator & programming asst.",
    "Dipl. In Computer Teacher Training",
    "Dipl. In Librarian",
    "Dipl. In Store Management",
    "Dipl. In Sanitary Inspection",
    "Dipl. in Business Management",
    "Computer Software Six Months",
    "Dipl. in Embroidery & Needle Work",
    "Dipl. in Radiation Imaging & ECG Tech",
    "Diary Technology",
    "Dipl. In Food & Nutrition",
    "Dipl. In Computer Application",
    "Dipl. In Printing",
    "Textile",
    "Dipl. In Retail Management",
    "Dipl. In Fireman",
    "Dipl. In Project Management",
    "Dipl. In Operation Theatre",
    "Dipl. in material management",
    "Dipl. in cooking",
    "Dipl. in information technology",
    "Leather Manufacturing",
    "Ac and air conditioner",
    "supply chain management",
    "Dipl in supply chain management",
    "Instrument & Technician",
    "Dip.In Financial Accounting",
    "Litho Offset Machine Minder",
    "Painter",
    "Welder & Federation",
    "Dipl. In Instrumentation Technology",
    "Welder & Fabrication",
    "Pump Operator",
    "Tele-Communication",
    "Dipl. In Bakery Confectionary",
    "Dipl. In Excel Face To Face Online Program",
    "Bachelor In Labrarian",
    "Cooking/Cookery",
    "Lab Technician",
    "Diploma In Fashion Designing",
    "welder mechanic",
    "cooking",
    "Health Visitor",
    "Health Sanitary Inspector",
    "Dipl. In Computer Hardware & Networking",
    "Boiler Operator",
    "Kathak Dance",
    "Dipl. In Typing",
    "Dipl. In Short Hand",
    "Dipl. In Chemical",
    "Agriculture",
    "Dip. In Cookery",
    "Cookery",
    "letter Press Machine Minder",
    "Draughtsman(Mech.)",
    "P.G Dip.In Information Technology",
    "Industrial Safety",
    "Script Writing",
    "Auxiliary Nurses & Midwifery",
    "Hair & Skin Care",
    "Beauty & Health Care",
    "Civil Structure",
    "PG Dip.In Hospital & Health Management",
    "Lineman",
    "Fright Forwarding",
    "Medical Assistance",
    "Commercial Cookery",
    "Medical Assistant",
    "Sanitary Inspector",
    "Dip.in Yoga",
    "Hair Dressing",
    "PG Dip. in Rural Development",
    "Dip.in Food Production",
    "Mechanical Production",
    "PG.Dip.in Hospital & Health Mgmt.",
    "PG.Dip.in Personal Manangement",
    "Diploma In Computer Hardware & Software",
    "Mechanical & Instrument",
    "P.G. Diploma in Office Management",
    "P.G. Diploma in Hotel Management",
    "Auto Mechanical",
    "Community Medical Service",
    "Cable Wireman",
    "Computer Software & Hardware Networking",
    "Computer Hardware Networking",
    "Typing",
    "Shorthand",
    "Industrial Safety & Hazard Mgmt",
    "Hindi Typing",
    "English Typing",
    "Tally & Accounting",
    "Building Construction",
    "Diploma in Horticulture",
    "Beauty & Wellness",
    "COMMUNITY HEALTH",
    "Diploma in Fire & Safety",
    "Dip In Electrical",
    "Dip In Electronics & Comm.",
    "Dip in Mechanical Engg",
    "Dip in Civil Engg.",
    "Dip In Electrical Engg.",
    "Electronics & Telecomm. Engg",
    "Dip in Computer Science Engg.",
    "Dip In Tool & Die",
    "Dip in Automobile Engg.",
    "Dip In Computer Science & Engg.",
    "Dip in Architecture",
    "Dip In Civil Building Material",
    "Dip In Hotel Management",
    "Bachelor-Program in Technology(Civil)",
    "Degree In Dairy Technology",
    "Dip In BBA",
    "Dipl. in instrumentation Technology",
    "Bachelor-Program in Business Administration",
    "Dip in Civil (Contraction Line)",
    "Dip in Draftsman (Civil)",
    "Dip In Business Management",
    "Electrical Engg.",
    "Dip In Hospitality Engg.",
    "Dip In Chemical Engg.",
    "Diploma in information Technology & Management",
    "Dip.In Computer Hardware & Networking",
    "Bachelor Of Medical Lab Technology",
    "Electrical & Electronics Engg.",
    "Bachelor Program In Journalism",
    "Welding Technology",
    "Dip In Boiler Engg",
    "Dip In Hotel Management Inn Food & Beverages",
    "Dip.In Mining Engg",
    "Dip.In Fire & Safety",
    "Dip.In Electrician Engg",
    "Motor Mechanic Engg.",
    "Dip.In Welder & Fabrication",
    "Dip.in Dairy & Food Production",
    "Dip.In Electronics Engg.",
    "Dip. in Mechanical Engg.(Tool & Die)",
    "Dip. in Accounting",
    "Dip.in Civil Surveyor",
    "Diploma in Cooking",
    "Diploma in Electronics & Communication Engg.",
    "Dip in Electrical Engg.",
    "Dip in Mechanical Engg.",
    "dip.In Textile Engg.",
    "B.Tech",
    "Bachelor-Program in Tech.(Civil)",
    "Bachelor-Program in Technology(Elec)",
    "bachelor-programming in tech.(Mech).",
    "Master Of Business Executive(HR)",
    "Dipl. In Business Management",
    "Dipl. in Hotel Management in food. & Beverages",
    "Bachelor of Business Management",
    "Bachelor-Programming Tech.(Mech)",
    "Bachelor-Programming Tech.(Electronics & Telecommunication Engg.)",
    "Bachelor Programming Technology (Electrical & Communication)",
    "Bachelor Programming Technology (Electronics & Communication)",
    "Bachelor In Computer Science",
    "Bachelor Programming in Technology ( Computer Science)",
    "Bachelor Programming In Computer Science",
    "Computer Science",
    "Bachelor-programming in tech.(Mech).",
    "Bachelor-Programming IN technology(IT)",
    "Bachelor Programming in Tech.(Electrical & Electronics)",
    "Bachelor Programming in Tech.(Automobile Engg)",
    "Bachelor Program in Technology(Civil)",
    "FITTER",
    "Bachelor-Program In Technology(CHEM.ENGG.)",
    "B-tech in Mechanical Engg.",
    "Dipl. in Mechanical Engg.",
    "mechanical engg.",
    "bachelor program in journalism",
    "Dip in Hotel Management in Food & Beverages",
    "Master Of Technology(Civil Engg)",
    "Master Of Technology(Civil Engg.)",
    "Bachelor In Librarian",
    "Bachelor Of Computer Application",
    "Bachelor of Business Administration",
    "B.E.Mechanical Engg.",
    "B.Sc in Hotel Management",
    "Bachelor Of Business Administration",
    "Certificate In Welder",
    "Certificate In Medical Lab Tech",
    "Welder",
    "Electrician",
    "Electrical",
    "Diesel Mechanic",
    "Electronic",
    "Civil",
    "Plumber",
    "Mechanical",
    "Carpenter",
    "Mechanic Refrigeration & Air Conditioning",
    "Master Of Business Administration",
    "MBA(Management)",
    "MBA(IT)",
    "Master of Business Administration(HR)",
    "Master of Computer Application",
    "Industrial in Electrical Repair & Maintenance",
    "Mba in information Technology (executive MBA)",
  ];
  function capitalizeFirstWord(str) {
    // Split the string into words using space as delimiter
    let words = str.split(' ');

    // Check if the array is not empty and capitalize the first word
    if (words.length > 0) {
        words[0] = words[0][0].toUpperCase() + words[0].substr(1);
    }

    // Join the words back into a single string
    return words.join(' ');
}
  const itemList = useMemo(() => {
    return [...new Set(vocationalCourses)].map((course) => {
      return (
        <Link href={`/admission`}
          state={{ name: course }}
          key={course}
          style={{ fontSize: "0.8em"}}
        >
          {capitalizeFirstWord(course)}
        </Link>
      );
    });
  }, []);
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="site-info">
          <Logo />
          <p className="name">
            <span>{address.name}</span> : Give Your Best College & University
            For You.
          </p>
          <div className="social-media">
            {socialMedia.map((item) => {
              return (
                <a
                  href={item.url}
                  key={item.id}
                  title={item.url}
                  aria-label={item.url}
                >
                  {item.icon}
                </a>
              );
            })}
          </div>
          <p className="address">
            <br />
            {address.description} &nbsp;{address.country}
            <a href={`tel:${address.phone}`}>{address.phone}</a>
            <a href={`tel:${address.fax}`}>{address.fax}</a>
            <a href={`mailto:${address.email}`}>{address.email}</a>
            <a href={`mailto:${address.email2}`}>{address.email2}</a>
            <a href={address.website}>{address.website}</a>
          </p>
        </div>

        <div className="links-wrapper">
          {Links.map((item) => {
            return (
              <div className="links" key={item.name}>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <ul>
                  {item.links.map((link) => {
                    return (
                      <li key={link.name}>
                        <Link href={link.path}>{link.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
      <div className="otherLinks course">
        <p>
          <strong>Top Courses Links</strong>
        </p>
        <div className="CourseLinksArea">
          {[...new Set(topCoursesInIndia)].map((course) => {
            return (
              <Link href={`/college/${encodeURIComponent(course)}`} key={course}>
                {course}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="otherLinks location">
        <p>
          <strong>Top Location</strong>
        </p>
        <div className="CourseLinksArea">
          {[...new Set(topLocation)].map((course) => {
            return (
              <Link href={`/college/${encodeURIComponent(course)}`} key={course}>
                {course}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="otherLinks">
        <p>
          <strong>Vocational Courses</strong>
        </p>
        <div className="CourseLinksArea">{itemList}</div>
      </div>
      <div className="copyright">
        {/* suppressHydrationWarning: the year is baked in at build time and
            recomputed on the client, which only diverges across a New Year
            boundary. Keeping the text server-rendered avoids a blank flash. */}
        <p suppressHydrationWarning>
          © 2013-{new Date().getFullYear()} Uniscaler | Powered by Skyone Educare
        </p>
      </div>
    </footer>
  );
};

export default Footer;
