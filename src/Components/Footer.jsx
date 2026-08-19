"use client";
import Logo from "./Logo";
import "./styles/footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Link from "@/Utils/StateLink";

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
