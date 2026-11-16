"use client";
import "./styles/footer.css";
import Link from "@/Utils/StateLink";

const Footer = () => {
  const studySections = [
    {
      name: "Study Globally",
      links: [
        { name: "Study in USA", path: "/study-abroad/pathway-programs?country=USA" },
        { name: "Study in Germany", path: "/study-abroad/pathway-programs?country=Germany" },
        { name: "Study in France", path: "/study-abroad/pathway-programs?country=France" },
        { name: "Study in Finland", path: "/study-abroad/pathway-programs?country=Finland" },
        { name: "Study in UK", path: "/study-abroad/pathway-programs?country=UK" },
        { name: "Study in Canada", path: "/study-abroad/pathway-programs?country=Canada" },
        { name: "Study in Australia", path: "/study-abroad/pathway-programs?country=Australia" },
        { name: "Study in Ireland", path: "/study-abroad/pathway-programs?country=Ireland" },
      ],
    },
    {
      name: "Study Locally",
      links: [
        { name: "Bachelor of Business Administration", path: "/online-course/BBA" },
        { name: "Bachelor of Computer Applications", path: "/online-course/BCA" },
        { name: "Master of Business Administration", path: "/online-course/MBA" },
        { name: "Master of Computer Applications", path: "/online-course/MCA" },
        { name: "Master of Commerce", path: "/online-course/M.Com" },
        { name: "MSc Applied Mathematics", path: "/online-course/MSc.-Applied-Mathematics" },
        { name: "MA Journalism & Mass Communication", path: "/online-course/MA-%E2%80%93-Journalism-and-Mass-Communication" },
        { name: "MA Clinical Psychology", path: "/online-course/MA-%E2%80%93-Clinical-Psychology" },
      ],
    },
  ];
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
  const Links = [
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
        {
          // Load-bearing, not a courtesy: /image-credits carries the CC BY
          // attributions for the Study Abroad photos, and this is its one
          // link. Removing it un-satisfies those licenses — see
          // src/app/image-credits/page.js.
          name: "Image credits",
          path: "/image-credits",
        },
      ],
    },
    {
      name: "Help & Support",
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
      ],
    },
  ];
  return (
    <footer className="footer">
      {/* Hidden for live release: Study Globally & Study Locally links
      <div className="study-links-wrapper">
        {studySections.map((section) => (
          <div className="study-links" key={section.name}>
            <h2>{section.name}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      */}
      <div className="footer-wrapper">
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
        {/* The "Image credits" link that briefly sat here moved into the
            Quick Links list above on the client's ask (2026-09-01) — same
            license-bearing role, better home. */}
        <p suppressHydrationWarning>
          © 2013-{new Date().getFullYear()} Uniscaler |  Managed by Uniscaler Educational Society. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
