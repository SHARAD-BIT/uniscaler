import Link from "next/link";

const programs = [
  ["Bachelor’s", "Computer Science, BBA, Engineering, Economics", "3–4 years"],
  ["Master’s", "Data Science, Engineering, Public Policy, Finance", "1–2 years"],
  ["MBA & Management", "MBA, MiM, Business Analytics", "1–2 years"],
  ["Diplomas & Certificates", "Digital Marketing, Cybersecurity, Project Management", "6–24 months"],
  ["Research", "AI, Life Sciences, Economics, Engineering", "3–5+ years"],
];

const destinations = [
  ["United States", "Flexible programs, research opportunities and OPT pathways", "united-states"],
  ["United Kingdom", "Globally recognised degrees and many one-year master’s programs", "united-kingdom"],
  ["Canada", "Public universities, practical learning and post-study work options", "canada"],
  ["Germany", "Strong technical education and affordable public-university routes", "germany"],
  ["Australia", "Industry-focused courses and a diverse international community", "australia"],
  ["Ireland", "Fast-growing technology sector and graduate work opportunities", "ireland"],
];

const applicationSteps = [
  ["Shortlist", "Compare countries, courses, entry requirements, budgets and career outcomes."],
  ["Check eligibility", "Review academic prerequisites, test scores and course-specific requirements."],
  ["Prepare documents", "Collect transcripts, SOP, recommendations, CV, passport and funding evidence."],
  ["Apply", "Submit accurate applications through university or authorised application portals."],
  ["Review offers", "Compare conditions, tuition, scholarships, location and total cost before accepting."],
  ["Arrange funding", "Confirm scholarships, savings or an education loan and prepare financial proof."],
  ["Apply for a visa", "Use the destination’s official checklist and complete biometrics or interviews."],
  ["Plan departure", "Arrange accommodation, insurance, travel and pre-departure essentials."],
];

const documents = [
  ["Academic", "Transcripts, mark sheets, degree or provisional certificate"],
  ["Identity", "Valid passport and any destination-specific identity documents"],
  ["Application", "Statement of Purpose, recommendation letters, CV and portfolio where required"],
  ["Language & tests", "IELTS, TOEFL, PTE, Duolingo, SAT, GRE or GMAT as applicable"],
  ["Financial", "Bank statements, sponsor affidavit, scholarship or loan approval"],
  ["Health & background", "Insurance, medical reports and police clearance when requested"],
];

const funding = [
  ["Government awards", "Country-funded scholarships for eligible international applicants"],
  ["University scholarships", "Merit, need, course or region-based tuition support"],
  ["External scholarships", "Funding from trusts, foundations and professional organisations"],
  ["Education loans", "Secured or unsecured funding for tuition and eligible living expenses"],
];

const intakes = [
  ["United States", "Fall (Aug–Sep)", "Spring (Jan)", "Some summer options"],
  ["United Kingdom", "September–October", "January–February", "Limited April–May options"],
  ["Canada", "September", "January", "Selected May intakes"],
  ["Australia", "February", "July", "Selected November intakes"],
  ["Germany", "October", "April", "Varies by university"],
  ["Ireland", "September", "January", "Course-specific"],
];

const costFactors = [
  ["Tuition", "Course, institution, study level and scholarship"],
  ["Housing", "City, room type, distance from campus and utilities"],
  ["Daily living", "Food, local travel, phone, books and personal expenses"],
  ["Pre-departure", "Tests, applications, visa, insurance, flights and deposits"],
  ["Contingency", "Exchange-rate movement, emergencies and one-time setup costs"],
];

const visaOverview = [
  ["United States", "F-1 student visa", "I-20, finances, SEVIS and interview preparation"],
  ["United Kingdom", "Student visa", "CAS, funds, English evidence and health surcharge"],
  ["Canada", "Study permit", "Letter of acceptance, finances and provincial requirements where applicable"],
  ["Australia", "Student visa (Subclass 500)", "CoE, Genuine Student evidence, funds and health cover"],
  ["Germany", "National student visa", "Admission, blocked-account or funding proof and insurance"],
  ["Ireland", "Long-stay study visa", "Offer, fee payment evidence, finances and insurance"],
];

const faqs = [
  ["When should I start preparing?", "A lead time of roughly 9–15 months is useful for shortlisting, tests, applications, funding and visa work. Competitive courses and scholarships may need an earlier start."],
  ["Can I apply to more than one country?", "Yes. Keep a balanced shortlist, but tailor every application to the institution and track separate deadlines, document rules and costs."],
  ["Is an English-language test always required?", "Not always. Test and waiver policies vary by course and university, so confirm the exact rule on the official program page."],
  ["How do I choose between rankings and affordability?", "Prioritise course fit, accreditation, realistic total cost and outcomes. Use rankings as one comparison signal, not the only decision."],
  ["Can scholarships cover the full cost?", "Some awards are fully funded, but many cover only part of tuition. Build a funding plan that does not depend on an unconfirmed scholarship."],
  ["Can international students work while studying?", "Many destinations allow limited work, subject to visa conditions. Hours and eligible work can change, so check official immigration guidance."],
];

function Table({ headers, rows, links = false }) {
  return (
    <div className="sa-guide-table-wrap">
      <table className="sa-guide-table">
        <thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.slice(0, headers.length).map((cell, i) => (
                <td key={`${row[0]}-${i}`}>
                  {links && i === 0 ? <Link href={`/study-abroad/${row[2]}`}>{cell}</Link> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StudyAbroadGuide() {
  return (
    <section className="sa-guide">
      <article className="sa-guide-card">
        <header className="sa-guide-header">
          <h2>Study Abroad: <span>At a Glance</span></h2>
          <p className="sa-guide-kicker">Universities, courses, costs, eligibility, admissions, visas and scholarships</p>
          <p>Studying overseas can combine specialised education, international experience and access to new career markets. A strong plan starts with the right course and continues through eligibility, funding, applications and visa preparation.</p>
          <p>This guide gives you a practical overview. Requirements and costs change, so always confirm final details with the university and the destination’s official immigration website.</p>
        </header>

        <section>
          <h3>Why study abroad?</h3>
          <div className="sa-guide-reasons">
            {[
              ["Global universities", "Learn in established academic and research environments."],
              ["Career exposure", "Build experience, networks and skills across international markets."],
              ["Specialised programs", "Access focused courses that may not be widely available locally."],
              ["Multicultural learning", "Study with peers from different cultures and professional backgrounds."],
              ["Funding options", "Explore university, government and external scholarship opportunities."],
              ["Post-study pathways", "Some destinations provide time-limited graduate work routes."],
            ].map(([title, text], i) => (
              <div key={title}><b>{i + 1}</b><h4>{title}</h4><p>{text}</p></div>
            ))}
          </div>
        </section>

        <section>
          <h3>Popular study levels and programs</h3>
          <p>Choose a study level that fits your current qualification, career goal, preferred learning format and available time.</p>
          <Table headers={["Study level", "Popular fields", "Typical duration"]} rows={programs} />
        </section>

        <section>
          <h3>Popular study destinations</h3>
          <p>Compare the whole student experience—not only rankings. Tuition, living costs, course length, climate, work rules and long-term plans all matter.</p>
          <Table headers={["Destination", "Why students consider it"]} rows={destinations} links />
        </section>

        <section>
          <h3>How to shortlist universities</h3>
          <p>Start with course fit and verified outcomes. Then compare accreditation, curriculum, faculty, internships, graduate employment support, total cost and location. Rankings can provide context, but they should not replace a course-level comparison.</p>
          <ul>
            <li>Confirm that the exact program and campus match your goals.</li>
            <li>Check academic, language and portfolio requirements before applying.</li>
            <li>Review tuition, deposits, refund rules and realistic living expenses.</li>
            <li>Use official university and government sources for current policies.</li>
          </ul>
        </section>

        <section>
          <h3>Eligibility and entry requirements</h3>
          <p>Requirements vary by institution. Undergraduate applicants generally need an accepted Class 12 qualification; postgraduate applicants normally need a recognised bachelor’s degree. Competitive courses may also require prerequisite subjects, work experience, interviews or portfolios.</p>
          <Table headers={["Criteria", "Undergraduate", "Postgraduate"]} rows={[
            ["Academic qualification", "Class 12 or accepted equivalent", "Recognised bachelor’s degree"],
            ["Academic profile", "Course and institution-specific", "Course and institution-specific"],
            ["Subject background", "Prerequisites may apply", "Relevant prior study may be required"],
            ["Additional tests", "SAT/ACT at selected institutions", "GRE/GMAT at selected institutions"],
          ]} />
          <h4>English-language proficiency</h4>
          <p>Commonly accepted tests include IELTS Academic, TOEFL iBT, PTE Academic and the Duolingo English Test. Accepted tests, minimum scores and waiver rules differ by university and program.</p>
        </section>

        <section>
          <h3>Study abroad application process</h3>
          <div className="sa-guide-steps">
            {applicationSteps.map(([title, text], i) => (
              <div key={title}><span>{i + 1}</span><div><h4>{title}</h4><p>{text}</p></div></div>
            ))}
          </div>
        </section>

        <section>
          <h3>Documents commonly required</h3>
          <p>Prepare documents early and keep clear digital copies. Names, dates and academic details should remain consistent across every form.</p>
          <Table headers={["Document category", "Common examples"]} rows={documents} />
        </section>

        <section>
          <h3>Costs, scholarships and education loans</h3>
          <p>Your budget should include tuition, accommodation, food, transport, health insurance, visa fees, flights, deposits and an emergency buffer. Costs vary considerably by city, institution, course and exchange rate.</p>
          <Table headers={["Funding route", "What to check"]} rows={funding} />
          <div className="sa-guide-links">
            <Link href="/study-abroad/tools/cost-of-living">Estimate living costs</Link>
            <Link href="/study-abroad/tools/education-loan">Calculate loan EMI</Link>
            <Link href="/scholarship">Explore scholarships</Link>
            <Link href="/education-loan">Explore education loans</Link>
          </div>
        </section>

        <section>
          <h3>Student visa planning</h3>
          <p>A student visa application commonly needs a valid passport, university offer or enrolment confirmation, financial evidence, academic documents and health or background checks. The exact visa name, fee, processing time and work conditions depend on the destination.</p>
          <div className="sa-guide-note"><strong>Important:</strong> Immigration rules can change. Verify requirements on the destination government’s official website before paying fees or making travel plans.</div>
        </section>

        <section>
          <h3>Application timelines and major intakes</h3>
          <p>Intake availability depends on the university and course. Work backwards from the course deadline so there is enough time for tests, documents, scholarships, funding and visa processing.</p>
          <Table headers={["Destination", "Primary intake", "Secondary intake", "Other availability"]} rows={intakes} />
          <div className="sa-guide-note"><strong>Planning tip:</strong> Scholarship and competitive-program deadlines can close well before the general admission deadline.</div>
        </section>

        <section>
          <h3>Understanding the total cost of studying abroad</h3>
          <p>A useful comparison is the complete cost of attendance, not tuition alone. Convert every expense using a sensible exchange-rate buffer and compare the full course duration.</p>
          <Table headers={["Cost area", "What changes the amount"]} rows={costFactors} />
          <p>Build three budgets: the minimum documented amount, a realistic monthly budget and an emergency reserve. Use current figures from the university, accommodation providers and official visa guidance.</p>
        </section>

        <section>
          <h3>How to search and apply for scholarships</h3>
          <p>Scholarships may be awarded for academic merit, financial need, leadership, sport, research, nationality or a specific course. Check eligibility before spending time on an application.</p>
          <ol>
            <li>Search university funding pages and official government scholarship portals.</li>
            <li>Record eligibility, coverage, deadline and whether a separate application is needed.</li>
            <li>Prepare evidence such as grades, achievements, essays, recommendations and financial documents.</li>
            <li>Submit early and keep alternative funding available until an award is confirmed in writing.</li>
          </ol>
        </section>

        <section>
          <h3>Education-loan planning</h3>
          <p>Compare the annual percentage cost, collateral requirement, processing fee, margin money, moratorium, repayment period, co-applicant rules and covered expenses—not only the advertised interest rate.</p>
          <ul>
            <li>Estimate the amount after confirmed scholarships and personal contribution.</li>
            <li>Check whether living costs, insurance, equipment and travel are eligible expenses.</li>
            <li>Understand when interest starts accruing and when repayment begins.</li>
            <li>Keep sanction letters and disbursement schedules ready for visa documentation.</li>
          </ul>
        </section>

        <section>
          <h3>Student visa overview by destination</h3>
          <Table headers={["Destination", "Common study route", "Typical preparation areas"]} rows={visaOverview} />
          <p>Visa names and requirements are indicative. Always use the relevant government portal for the current fee, financial threshold, processing time, work rules and document checklist.</p>
        </section>

        <section>
          <h3>After receiving an offer</h3>
          <div className="sa-guide-reasons">
            {[
              ["Read the conditions", "Identify academic, language, deposit and document conditions."],
              ["Compare total value", "Review cost, curriculum, location, support and likely outcomes."],
              ["Accept correctly", "Follow the university process and keep proof of every payment."],
              ["Arrange accommodation", "Check contract terms, deposits, commute and included utilities."],
              ["Prepare for the visa", "Use consistent financial and academic evidence across documents."],
              ["Plan arrival", "Organise insurance, travel, orientation and essential registrations."],
            ].map(([title, text], i) => (
              <div key={title}><b>{i + 1}</b><h4>{title}</h4><p>{text}</p></div>
            ))}
          </div>
        </section>

        <section>
          <h3>Frequently asked questions</h3>
          <div className="sa-guide-faqs">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="sa-guide-help">
          <div><h3>Need help building your study-abroad plan?</h3><p>Our counsellors can help you compare programs, documents, funding and application timelines.</p></div>
          <Link href="/contact">Talk to a counsellor</Link>
        </section>
      </article>
    </section>
  );
}
