import "./styles/learnerWall.css";

/**
 * The "1.25 Lakh+ Learners Made A Choice" band from the client's collegevidya
 * reference: big stat on the left, a staggered wall of learner photo cards on
 * the right, each carrying the logo of the company that hired them.
 *
 * Every face is AI-generated (thispersondoesnotexist.com, downloaded once
 * into public/learners/) — the client asked for that explicitly so no real
 * person's photo appears. Company logos are reused from the placement-partner
 * set already in public/university/partners/.
 */
const LEARNERS = [
  { img: "/learners/learner-01.jpg", company: "Google", logo: "google.webp" },
  { img: "/learners/learner-02.jpg", company: "Wipro", logo: "wipro.webp" },
  { img: "/learners/learner-03.jpg", company: "TCS", logo: "tcs.webp" },
  { img: "/learners/learner-04.jpg", company: "Paytm", logo: "paytm.webp" },
  {
    img: "/learners/learner-05.jpg",
    company: "HDFC Bank",
    logo: "hdfc-bank.webp",
  },
  {
    img: "/learners/learner-06.jpg",
    company: "NTT Data",
    logo: "ntt-data.webp",
  },
  { img: "/learners/learner-07.jpg", company: "Amazon", logo: "amazon.webp" },
  {
    img: "/learners/learner-08.jpg",
    company: "Microsoft",
    logo: "microsoft.webp",
  },
  {
    img: "/learners/learner-09.jpg",
    company: "Deloitte",
    logo: "deloitte.webp",
  },
  { img: "/learners/learner-10.jpg", company: "Infosys", logo: "infosys.webp" },
  {
    img: "/learners/learner-11.jpg",
    company: "Accenture",
    logo: "accenture.webp",
  },
  { img: "/learners/learner-12.jpg", company: "IBM", logo: "ibm.webp" },
];

// Four columns, filled round-robin so the wall reads column-wise like the
// reference. Each column scrolls forever — odd ones drift up, even ones down
// (CSS animation on .lw-track) — so its card list renders twice: the second,
// aria-hidden copy is what makes the loop seamless when the track wraps at
// -50%.
const COLUMNS = [0, 1, 2, 3].map((c) =>
  LEARNERS.filter((_, i) => i % 4 === c)
);

const Cards = ({ items }) =>
  items.map((l) => (
    <figure key={l.img} className="lw-card">
      <img
        src={l.img}
        alt={`AI-generated portrait of a learner placed at ${l.company}`}
        loading="lazy"
      />
      <figcaption>
        <img
          src={`/university/partners/${l.logo}`}
          alt={l.company}
          title={l.company}
          loading="lazy"
        />
      </figcaption>
    </figure>
  ));

const LearnerWall = () => (
  <section className="lw-band">
    <div className="lw">
      <div className="lw-copy">
        <p className="lw-stat">1.25 Lakh+</p>
        <p className="lw-title">Learners Made A Choice</p>
        <p className="lw-sub">That Opened the Right Doors.</p>
      </div>
      <div className="lw-wall">
        {COLUMNS.map((column, ci) => (
          <div key={ci} className="lw-col">
            <div className="lw-track">
              <div className="lw-group">
                <Cards items={column} />
              </div>
              <div className="lw-group" aria-hidden="true">
                <Cards items={column} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LearnerWall;
