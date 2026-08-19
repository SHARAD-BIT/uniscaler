/**
 * Authoritative Study Abroad Catalog & Metadata Dataset
 * Extracted and normalized from upGrad Study Abroad platform.
 * 
 * Contains:
 * - 205+ Verified International Degree Programs
 * - Country Flag SVGs, University Logos, Syllabus PDFs
 * - Category groupings (AI & ML, MBA, Engineering, Data Science, etc.)
 * - Hero Metrics & Counseling Form Meta
 */

export const studyAbroadStats = [
  { label: "Universities Partnered", value: "300+", subtitle: "Globally Accredited Institutions" },
  { label: "Admit Success Rate", value: "98%", subtitle: "Visa & Admission Support" },
  { label: "Enrolled Learners", value: "20,000+", subtitle: "Active Global Students" },
  { label: "Avg Cost Savings", value: "₹20 Lakhs", subtitle: "Via Hybrid & Credit Transfers" }
];

export const studyAbroadCountries = [
  {
    "name": "United States",
    "slug": "united-states",
    "flag": "/study-abroad/flags/united-states.svg",
    "isPopular": true,
    "totalPrograms": 141,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "6948f65827e91fd7f33c1f0a",
            "title": "Master of Business Administration at DePaul",
            "university": "DePaul University",
            "logo": "/study-abroad/logos/Uni_IMTG-DePaul-University-d32037d1a57847128e7087272c5f2044.svg",
            "syllabusUrl": "",
            "programPackageKey": "master-v19-smba-upgra-spa-bl"
          },
          {
            "id": "693c142210cf3da3cb915253",
            "title": "Master of Business Administration 90 ECTS",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MBA (1)-06d0810d9bfa498c827f940f2183b040.pdf",
            "programPackageKey": "master-v20-smba-upgra-spa-bl"
          },
          {
            "id": "6978b7dadde65ec2b8bcce52",
            "title": "MBA General Management",
            "university": "Munich Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Munich-Business-School-4ba5312f7ad34d09821ac75a143c3bff.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MBS-HD-BROCHURE-UPDATED-31d23b2e00e64c2b8ffb395f29b621ff.pdf",
            "programPackageKey": "master-v24-smba-upgra-spa-bl"
          },
          {
            "id": "699da5e5bfef1524b097b1f3",
            "title": "Master of Business Administration",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/IIM-Drexel-29bef4f2fb02418584810229667fbbdf.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Drexel_IIMU_MBA_Brochure_USA-7dbf573deed0469abd77740da54be51f.pdf",
            "programPackageKey": "master-v26-smba-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86ea",
            "title": "MBA at CityU Seattle",
            "university": "City University of Seattle",
            "logo": "/study-abroad/logos/Uni_IMTG-City-University-of-Seattle-US-06a4ddcfc9bc42ae9da44276921396cf.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/96/brochure/MBA_SeattleFHE6Q2.pdf",
            "programPackageKey": "masters-management-cityu-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f86ec",
            "title": "MBA with Placement at Roehampton",
            "university": "University of Roehampton",
            "logo": "/study-abroad/logos/Uni_IMTG-University-of-Roehampton-UK-8a045c683f5845f7a78d75bcef53684b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/101/brochure/mba_roehamptonF5CZSU.pdf",
            "programPackageKey": "master-v33-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86d3",
            "title": "MBA at Clark University",
            "university": "Clark University",
            "logo": "/study-abroad/logos/Uni_IMTG-Clark-ae7e5ef525ee45c9b5a8a0b2f56b0bc8.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/106/brochure/mba_clarkSPKGJG.pdf",
            "programPackageKey": "masters-manage-clarkuniversity-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f86d1",
            "title": "Master of Business Administration at Utica University",
            "university": "Utica University",
            "logo": "/study-abroad/logos/Uni_Edgewood-Utica-University-af1fafee7c5642b796c37cbb390624b4.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/248/brochure/mba_edgewood_utica_usa_BIWED3.pdf",
            "programPackageKey": "master-v58-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86d4",
            "title": "MBA at Clarkson University",
            "university": "Clarkson University",
            "logo": "/study-abroad/logos/Uni_IMTG-Clarkson-University-b51a2f9f88b24215be80bd670a31a8ac.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/73/brochure/mba_clarkson87E1Q2.pdf",
            "programPackageKey": "masters-management-clarkson-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f86d5",
            "title": "MBA at Utica University",
            "university": "Utica University",
            "logo": "/study-abroad/logos/Uni_IMTG-Utica-University-19a6d9f0f6a44df89eaac48f483324f6.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/93/brochure/mba_uticaSOJGEO.pdf",
            "programPackageKey": "mba-management-uticauniversity-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8700",
            "title": "MBA at Northeastern University",
            "university": "D'Amore McKim School of Business Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/278/brochure/Neu_D_amore_mba_usa1547WC.pdf",
            "programPackageKey": "master-v88-manag-upgra-psv2"
          },
          {
            "id": "686524ebe635d9dde80d9a65",
            "title": "MBA at Touro University USA",
            "university": "Touro University",
            "logo": "/study-abroad/logos/1-Touro-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/301/brochure/Touro_University_MBAIVXXRQ.pdf",
            "programPackageKey": "master-v1-smba-upgra-spa-bl"
          },
          {
            "id": "6a4f96bd33e6ed1cc4b3de56",
            "title": "Master of Business Administration at SRH",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MBA_IIMU_SRH_Brochure_Germany-d853f66464f041d0a43144fc0895f710.pdf",
            "programPackageKey": "master-v37-smba-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8732",
            "title": "Bachelor of Business Administration at ABC Paris",
            "university": "American Business College",
            "logo": "/study-abroad/logos/Uni_GGU-American-Business-School-ccd08353393248f09f09e6e6a607deb3.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_abs.pdf",
            "programPackageKey": "bachel-v1-manag-ggu-upgra-psv2"
          },
          {
            "id": "69d4aadaa1aabd2524e402e2",
            "title": "International Bachelor of Business Administration at Haaga-Helia",
            "university": "Haaga-Helia University of Applied Sciences",
            "logo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/HHU_INTL_BBA_Brochure_Finland-67e47a49ccc546cb83f267f1c6f5567b.pdf",
            "programPackageKey": "bachel-v20-smanag-upgra-spa-bl"
          },
          {
            "id": "6a54bf5c33e6ed1cc46931d5",
            "title": "BA International Business Administration at SRH",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BAIBA_Clark_SRH_Germany_Brochure-e802c7f6d7df4c008570bfa89ca7365e.pdf",
            "programPackageKey": "bachel-v37-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e7",
            "title": "MHSA & MBA Dual Degree at University of Detroit",
            "university": "University of Detroit Mercy",
            "logo": "/study-abroad/logos/Uni_IMTG-University-of-Detroit-Mercy-28b0b4833ff24fa0916113f4356fc00e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/292/brochure/MHSA_MBA_UDM_Brochure9NLYXO.pdf",
            "programPackageKey": "master-v12-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8743",
            "title": "MSc Psychology & Management",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/288/brochure/ISM_MSc_Psychology_ManagementLV61HO.pdf",
            "programPackageKey": "master-v2-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8733",
            "title": "BS in International Management",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_ism.pdf",
            "programPackageKey": "bachel-v29-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f873d",
            "title": "BS Management at Northeastern University, USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v30-smanag-upgra-spa-bl"
          },
          {
            "id": "69537c36874a8857c77bb931",
            "title": "Master of Science in Management",
            "university": "WHU - Otto Beisheim School of Management",
            "logo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/WHU- MSc Management-3c71b9c674654a519746a7f2e98c3548.pdf",
            "programPackageKey": "master-v57-smanag-upgra-spa-bl"
          },
          {
            "id": "6964a120874a8857c7f5140e",
            "title": "B.A. Business Management & Entrepreneurship ",
            "university": "Code University of Applied Sciences",
            "logo": "/study-abroad/logos/Uni_GGU-Code-db4e01329a05423d865530f36c702404.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BABME_Brochure-7acff52432254273893d9f7622642ed2.pdf  ",
            "programPackageKey": "bachel-v12-smanag-upgra-spa-bl"
          },
          {
            "id": "699fe2dc4f8f195fac31bd89",
            "title": "BS Leadership and Management at NYU USA",
            "university": "New York University",
            "logo": "/study-abroad/logos/Uni_GGU-New-York-University-313aaa1365ab414ba07a60f2752e850c.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSLM_NYU_USA_Brochure-20537c9317944ceca7adc39c0b6a73e2.pdf",
            "programPackageKey": "bachel-v18-smanag-upgra-spa-bl"
          },
          {
            "id": "69d895aba1aabd2524797828",
            "title": "Digital Business Innovations BBA at Haaga-Helia",
            "university": "Haaga-Helia University of Applied Sciences",
            "logo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/HHU_DIGIBBA_Brochure_Finland-2cba41dc4fce4b8d8a67f276eaf73d07.pdf",
            "programPackageKey": "bachel-v21-smanag-upgra-spa-bl"
          },
          {
            "id": "68b92b9404b18bde57f3ec52",
            "title": "BA Business Management (Hons) at LMU",
            "university": "London Metropolitan University",
            "logo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU-BABM-e5d6e23b46044c9da4b9bd6d96c4a702.pdf",
            "programPackageKey": "bachel-v5-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86eb",
            "title": "MSc Global Business Management at Roehampton",
            "university": "University of Roehampton",
            "logo": "/study-abroad/logos/Uni_IMTG-University-of-Roehampton-UK-8a045c683f5845f7a78d75bcef53684b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/102/brochure/gbm_roehamptonNIHATN.pdf",
            "programPackageKey": "master-v34-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86f4",
            "title": "MSc in Sustainable Luxury and Creative Industries at Excelia",
            "university": "Excelia Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/199/brochure/mscslci_excelia_france5VVBXZ.pdf",
            "programPackageKey": "master-v37-manag-upgra-psv2"
          },
          {
            "id": "6a1d66e510e07fb9189e8055",
            "title": "Master of Science in Entrepreneurship",
            "university": "WHU - Otto Beisheim School of Management",
            "logo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/WHU- Master of Science in Entrepreneurship-5da259495a51482483561121e269c249.pdf",
            "programPackageKey": "master-v108-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86d8",
            "title": "MS in Organizational Leadership at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/160/brochure/ms_in_ol_neu8Q8IF5.pdf",
            "programPackageKey": "master-v2-manag-upgra-psv2"
          },
          {
            "id": "6a02d54ca1aabd252492c18a",
            "title": "BS in Management at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIM_NU_USA_Brochure-06b5a6e797464e4193f451103647e9b3.pdf",
            "programPackageKey": "bachel-v24-smanag-upgra-spa-bl"
          },
          {
            "id": "695f55eba6878ba26a5dd0c8",
            "title": "Youth Leadership Program with Business Concentration at upGrad",
            "university": "upGrad",
            "logo": "/study-abroad/logos/upGrad_square_logo-8f3c5af8edde4aacb07b14493150b187.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Business Leadership Brochure-1ead5be972294156b8b3ce4722f91205.pdf",
            "programPackageKey": "bachel-v6-smanag-upgra-spa-bl"
          },
          {
            "id": "69eb0a9aa1aabd2524f2d3b1",
            "title": "MSc International Business at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc International Business_compressed-1923bb7d36c1402081dfa583b965dfc0.pdf",
            "programPackageKey": "master-v74-smanag-upgra-spa-bl"
          },
          {
            "id": "69d8c91012a515a3a7343a23",
            "title": "Professional Certificate in Business Management",
            "university": "IIM Udaipur",
            "logo": "/study-abroad/logos/IIM-Square-logo-7cd5601693c54664a459d439808f1429.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU_V2-1be32a5ea42540bd8c85f33c68565258.pdf",
            "programPackageKey": "certif-v38-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f870c",
            "title": "MPS in Informatics at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/154/brochure/mps_informatics_neu0B94VJ.pdf",
            "programPackageKey": "master-v1-data-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8717",
            "title": "MS DA at Clark University",
            "university": "Clark University",
            "logo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds_clark_university.pdf",
            "programPackageKey": "masters-globaldata-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f871a",
            "title": "MS DAV at Yeshiva University",
            "university": "Yeshiva University",
            "logo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/dav_yeshiva_university.pdf",
            "programPackageKey": "masters-v4-globaldata-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f86c0",
            "title": "MS DA at Touro University USA",
            "university": "Touro University",
            "logo": "/study-abroad/logos/1-Touro-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/300/brochure/MSDA_Touro6PHQND.pdf",
            "programPackageKey": "master-v2-sdata-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e4",
            "title": "MSc Psychology & Management at ISM",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU_ISM_MSc_Psychology_Management-d4c5993fd9af4a2dae9350242ef83752.pdf",
            "programPackageKey": "master-v2-shealt-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86ff",
            "title": "MS Fintech Management at Northeastern University",
            "university": "DAmore McKim School of Business Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/282/brochure/msfm_nu_dmsb_usa8KRGOY.pdf",
            "programPackageKey": "master-v97-manag-upgra-psv2"
          },
          {
            "id": "68b1900cc38f68076cc50c28",
            "title": "MS CS at Yeshiva University",
            "university": "Yeshiva University",
            "logo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/306/brochure/YU_MSCSTLP51W.pdf",
            "programPackageKey": "master-scompu-upgra-spa-bl"
          },
          {
            "id": "691d70578248129399077fe4",
            "title": "BBA Business Information Technology",
            "university": "Haaga-Helia University of Applied Sciences",
            "logo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/HH_BBA_BIT-a6b4ae3383f4457da067b3aab08ffa4d.pdf",
            "programPackageKey": "bachel-v1-scompu-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8702",
            "title": "MS CS at TROY University",
            "university": "Troy University",
            "logo": "/study-abroad/logos/Uni_IIITB-Troy-University-US-ae39c342ec1343cca741f08965f7fceb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/72/brochure/tu_mscsT3Y87Z.pdf",
            "programPackageKey": "masters-data-troyuniversity-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8706",
            "title": "MS CS at CityU Seattle",
            "university": "City University of Seattle",
            "logo": "/study-abroad/logos/Uni_IIITB-City-University-of-Seattle-US-0574cb047f7f4b44bdba53285fc5cefc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/94/brochure/cs_cityu3O2H8G.pdf",
            "programPackageKey": "masters-data-cityu-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8713",
            "title": "MS in Internet of Things at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/181/brochure/msit_drexel1NXBYZ.pdf",
            "programPackageKey": "master-v4-softw-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8719",
            "title": "MS IT at Clark University",
            "university": "Clark University",
            "logo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msit_clark_university.pdf",
            "programPackageKey": "masters-v2-globaldata-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8703",
            "title": "MS IT at UWF, Florida",
            "university": "University of West Florida",
            "logo": "/study-abroad/logos/Uni_IIITB-University-of-West-Florida-US-ab7ef22c2eb24bc89009a29476cc65fb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/78/brochure/uwf_msitFYE53A.pdf",
            "programPackageKey": "masters-v2-data-uwf1-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8705",
            "title": "MS IT Management at Central Washington University",
            "university": "Central Washington University",
            "logo": "/study-abroad/logos/Uni_IIITB-Central-Washington-University-b0d4b1676ada44bea9ddc2a43581dbf5.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/99/brochure/itam_cwuZ5CVNI.pdf",
            "programPackageKey": "masters-data-centralwashington-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8709",
            "title": "MS in Management Information Systems at UNLV",
            "university": "University of Nevada, Las Vegas",
            "logo": "/study-abroad/logos/Uni_IIITB-University-of-Nevada-Las-Vegas-988f399b29654bd2904593d8a68c8bba.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/117/brochure/mis_nevadaY7SSKC.pdf",
            "programPackageKey": "masters-v1-data-universityofnevada-pp"
          },
          {
            "id": "693c190610cf3da3cb988867",
            "title": "MSc International Logistics & Supply Chain Management",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc IG & SCM (1)-c6c274a3d7d847ca8e14c656a9713cbd.pdf",
            "programPackageKey": "master-v2-ssuppl-upgra-spa-bl"
          },
          {
            "id": "68cd543ac7be87eada82171f",
            "title": "MS Supply Chain Management at DePaul University",
            "university": "DePaul University",
            "logo": "/study-abroad/logos/Uni_IMTG-DePaul-University-d32037d1a57847128e7087272c5f2044.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/DU-MSSCM-814bdbb4131a4ff98d0e62b0a85a57a1.pdf",
            "programPackageKey": "master-ssuppl-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86f5",
            "title": "MSc in Sustainable Global Supply Chain Management at Excelia",
            "university": "Excelia Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/200/brochure/msc_sgscm_excelia_franceM74RO7.pdf",
            "programPackageKey": "master-v38-manag-upgra-psv2"
          },
          {
            "id": "69eb0b63a1aabd2524f38ef6",
            "title": "MSc Supply Chain Strategy at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc Supply Chain Strategy_compressed-6eca47715cbb468588d5f3b51d650909.pdf",
            "programPackageKey": "master-v4-ssuppl-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8744",
            "title": "MPS Digital Media at Northeastern USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_MICA-Northeastern-University-189918c416d544e7abdeea22f979ecb4.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/307/brochure/mpsdm_neu_usa3PZOP4.pdf",
            "programPackageKey": "master-v28-smanag-upgra-spa-bl"
          },
          {
            "id": "68d267712139326b21b90fb3",
            "title": "MA Digital Communication & Media Arts at DePaul University",
            "university": "DePaul University",
            "logo": "/study-abroad/logos/Uni_MICA-DePaul-University-d1991a68178b45c2abeb5369179eca18.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MICA-Depaul-MADCMA_-e6d3dd56bbdc461bb6784b2399117ee1.pdf",
            "programPackageKey": "master-smarke-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86f3",
            "title": "MSc Digital Marketing at Excelia",
            "university": "Excelia Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/198/brochure/mscdm_excelia_franceZ7MKW2.pdf",
            "programPackageKey": "master-v36-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86d2",
            "title": "MS in Digital Marketing and Media at Yeshiva University, USA",
            "university": "Yeshiva University",
            "logo": "/study-abroad/logos/Uni_MICA-Yeshiva-University-1c497af040874480a59e3498e8903819.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/165/brochure/ms_in_dm_yeshivaE4T1AR.pdf",
            "programPackageKey": "master-v6-manag-upgra-psv2"
          },
          {
            "id": "68b191adc38f68076cc8649d",
            "title": "MA Sustainable Urban Development",
            "university": "DePaul University",
            "logo": "/study-abroad/logos/Uni_IIITB-DePaul-University-8af5f32f1ba344adb54df62735be86bd.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/320/brochure/DU_MA_SUD_USA2QK8AN.pdf",
            "programPackageKey": "master-v34-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86d9",
            "title": "MS in Project Management (USA)",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/177/brochure/NEU_IMT_MS_PM_USA7I5M4K.pdf",
            "programPackageKey": "master-v17-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8718",
            "title": "MS PM at Clark University",
            "university": "Clark University",
            "logo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/mspm_clark_university.pdf",
            "programPackageKey": "masters-v1-globaldata-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f870e",
            "title": "MS in Project Management at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/156/brochure/mspm_neuV66XCR.pdf",
            "programPackageKey": "master-v2-data-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86fd",
            "title": "MS Technology Leadership & PM, Touro University",
            "university": "Touro University",
            "logo": "/study-abroad/logos/Uni_IMTG-Touro-University-df406223ff084aa9bd70c044e1ed5d5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/289/brochure/Touro_MS_TL_PMUZDL66.pdf",
            "programPackageKey": "master-v87-manag-upgra-psv2"
          },
          {
            "id": "6a46167572ddd6939076da98",
            "title": "M.Sc. Technology & Management",
            "university": "Code University of Applied Sciences",
            "logo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_IMTG_MSc Technology_Management-9408f59851b9484c9b825a288698f654.pdf",
            "programPackageKey": "master-v5-sproje-upgra-spa-bl"
          },
          {
            "id": "69e9eabe59e68049ddabd8fe",
            "title": "MSc Hospitality & Tourism Management at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCHTM_EDC_FRANCE_BROCHURE_New-57715e02f0844c25be3368b764f1b944.pdf",
            "programPackageKey": "master-v1-shospi-upgra-spa-bl"
          },
          {
            "id": "6a475191cac4a6ad2a880404",
            "title": "B.A. Digital Design & Innovation",
            "university": "Code University of Applied Sciences ",
            "logo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BADDI_Germany_Brochure%20(2)-4ef752e1fb1247869314f0e4d8e1c75e.pdf",
            "programPackageKey": "bachel-sdesig-upgra-spa-bl"
          },
          {
            "id": "6a4768e472ddd693900d2109",
            "title": "M.A. Innovation Design",
            "university": "Code University of Applied Sciences",
            "logo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_IMTG_MA Innovation Design-6506753e7a084580a1fb181d53a4b26a.pdf",
            "programPackageKey": "master-sdesig-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Bachelors",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f872f",
            "title": "BS Business at Colorado State, USA",
            "university": "Colorado State University",
            "logo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v2-sbache-upgra-spa-bl"
          },
          {
            "id": "691d6d1e7b3593050dfaade4",
            "title": "Bachelor of Commerce at Newcastle",
            "university": "University of Newcastle",
            "logo": "/study-abroad/logos/Uni_GGU-The-University-of-Newcastle-3d69805207944af0a6beb4a2914a89d4.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Newcastle-Bachelor of Commerce (1)-be1353c4f30946158f5e5adb68d2643d.pdf",
            "programPackageKey": "bachel-v8-smanag-upgra-spa-bl"
          },
          {
            "id": "6932b441af6b3d6a34ea0e87",
            "title": "Bachelor of Business at Newcastle",
            "university": "University of Newcastle",
            "logo": "/study-abroad/logos/Uni_GGU-The-University-of-Newcastle-3d69805207944af0a6beb4a2914a89d4.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Newcastle-Bachelor of Business (1)-11c2eaf1ba2c4d168e6efe471066c420.pdf",
            "programPackageKey": "bachel-v9-smanag-upgra-spa-bl"
          },
          {
            "id": "6a1fde3f75e63d422ef95119",
            "title": "BSc International Business at SIU",
            "university": "Schiller International University  ",
            "logo": "/study-abroad/logos/GGU_SIU-5ae3f6c447ad462895fa29c8327ff2e0.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/SIU-BSc International Business-cc4f8de04205475bacb335ff3c563ff5.pdf",
            "programPackageKey": "bachel-v27-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8739",
            "title": "BS Astrophysics at IllinoisTech Chicago",
            "university": "Illinois Institute of Technology",
            "logo": "/study-abroad/logos/Uni_GGU-Illinois-Institute-of-Technology-1c0fb050c9994c19afdad565b95aab8e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v2-sengin-upgra-spa-bl"
          },
          {
            "id": "68e60f46e5e3c16d4b078204",
            "title": "BS Food Science at Colorado State, USA",
            "university": "Colorado State University",
            "logo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v10-shealt-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8738",
            "title": "BS Neuroscience at WSU, USA",
            "university": "Washington State University",
            "logo": "/study-abroad/logos/Uni_GGU-Washington-State-University-7ab176d6910440dd839048bc61b251ec.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v7-shealt-upgra-spa-bl"
          },
          {
            "id": "696a0fdfd22b007fc8b0c812",
            "title": "BS Psychology at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v5-shealt-upgra-spa-bl"
          },
          {
            "id": "69a9450cf6400c91c77c17fe",
            "title": "BS Information Systems & Technology at NYU USA",
            "university": "New York University",
            "logo": "/study-abroad/logos/Uni_GGU-New-York-University-313aaa1365ab414ba07a60f2752e850c.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/NYU-BSÂ Information Systems & Technology (3)-eedc2f43b990484bb53d32c0240dfc31.pdf",
            "programPackageKey": "bachel-v2-sdata-upgra-spa-bl"
          },
          {
            "id": "68e5f4416a6a6e9d672adbad",
            "title": "BS IT at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v2-sinfor-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8736",
            "title": "BS Cybersecurity at Clark University, USA",
            "university": "Clark University",
            "logo": "/study-abroad/logos/1-Clark-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-softw-ggu-upgra-psv2"
          },
          {
            "id": "69fb38cd846671b504703d4c",
            "title": "BS in Information Technology at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIT_NU_USA_Brochure-ce88f11f498c4bbb841c57edd00a9471.pdf",
            "programPackageKey": "bachel-v1-sinfor-upgra-spa-bl"
          },
          {
            "id": "6a327fec50313d769357093a",
            "title": "BS in Cybersecurity at Touro",
            "university": "Touro University ",
            "logo": "/study-abroad/logos/GGU-touroberlin-3b15bc19bfe94f53b0652581d52bf5be.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/TU-Berlin-BS%20in%20Cybersecurity-0e7b699234fd4e00a1c3d6d0665a0f97.pdf",
            "programPackageKey": "bachel-scyber-upgra-spa-bl"
          },
          {
            "id": "68d3d0212139326b21a127f0",
            "title": "BS Digital Communication & Media at Northeastern USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/1-Northeaster-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v2-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68a6edf26e724fa368e71e81",
            "title": "BSc Data Science (Hons) at LMU",
            "university": "London Metropolitan University",
            "logo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU-BS DS-968a15d1c5a343a195d54b4440ecd262.pdf",
            "programPackageKey": "bachel-sdata-upgra-spa-bl"
          },
          {
            "id": "68b159f3c38f68076c702971",
            "title": "MS in Data Science at UMass Dartmouth",
            "university": "UMass Dartmouth",
            "logo": "/study-abroad/logos/Uni_IIITB-UMass-Dartmouth-17de0a62607b4d2ea233002825f3c37a.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/118/brochure/msds_umass0WPKT0.pdf",
            "programPackageKey": "masters-data-umassdartmouth-pp"
          },
          {
            "id": "69fb2b3159e68049dd385458",
            "title": "BS in Analytics at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIA_NU_USA_Brochure-be25d738e13f400dafe6ee18d95197fe.pdf",
            "programPackageKey": "bachel-v1-sbusin-upgra-spa-bl"
          },
          {
            "id": "68e3dcc6ff6d0afae6f1e575",
            "title": "MS in Data Analytics Engineering at Northeastern University - College of Engineering",
            "university": "Northeastern University - College of Engineering",
            "logo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
            "syllabusUrl": "",
            "programPackageKey": "master-v7-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8726",
            "title": "BSc Applied Data Science & Business Analytics, ISM",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/175/brochure/ISM_GGU_B_STEM_ProgramV006XN.pdf",
            "programPackageKey": "bachel-v4-sdata-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8704",
            "title": "MS Data Science at UWF, Florida",
            "university": "University of West Florida",
            "logo": "/study-abroad/logos/Uni_IIITB-University-of-West-Florida-US-ab7ef22c2eb24bc89009a29476cc65fb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/77/brochure/UWF_MSDS_1_1IVQEV.pdf",
            "programPackageKey": "masters-v1-data-uwf1-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8707",
            "title": "MSc Data Science with Work Placement at Roehampton",
            "university": "University of Roehampton",
            "logo": "/study-abroad/logos/Uni_IIITB-University-of-Roehampton-UK-17a141ef17ed4dadbf6f9c9ecdc585b0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/103/brochure/ds_roehamptonLMKPC0.pdf",
            "programPackageKey": "msc-v1-data-universityofroehampton-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8708",
            "title": "MS Data Analytics at UNLV",
            "university": "University of Nevada, Las Vegas",
            "logo": "/study-abroad/logos/Uni_IIITB-University-of-Nevada-Las-Vegas-988f399b29654bd2904593d8a68c8bba.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/115/brochure/msda_nevadaWTSTKQ.pdf",
            "programPackageKey": "masters-data-universityofnevada-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f871d",
            "title": "MSc in Data Analytics",
            "university": "Dundalk Institute of Technology",
            "logo": "/study-abroad/logos/1-Dundalk.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds_dkit.pdf",
            "programPackageKey": "masters-v7-data-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f871f",
            "title": "MSc Data Engineering",
            "university": "Aivancity School for Technology, Business and Society",
            "logo": "/study-abroad/logos/1-Aivancity-School-for-Technology.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/133/brochure/msde_aivancityST9K03.pdf",
            "programPackageKey": "master-v1-data-iiitb-upgra-astbs-psv2"
          },
          {
            "id": "68e60e6be5e3c16d4b06d1e3",
            "title": "BS Data Science at Colorado State, USA",
            "university": "Colorado State University",
            "logo": "/study-abroad/logos/1-Colorado.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-softw-ggu-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f873c",
            "title": "BS Analytics at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v6-sdata-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e0",
            "title": "MS Business Analytics, Northeastern University",
            "university": "DAmore McKim School of Business Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/283/brochure/NEU_D_Amore_MS_Business_Analytics_PGMPVQNW52.pdf",
            "programPackageKey": "master-v98-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f870f",
            "title": "MPS in Analytics at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/157/brochure/mps_in_analytics_neuRGN9C8.pdf",
            "programPackageKey": "master-v3-data-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86fe",
            "title": "MS Business Analytics at Northeastern University",
            "university": "DAmore McKim School of Business Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/280/brochure/NEU_D_Amore_MS_Business_AnalyticsIDSJLX.pdf",
            "programPackageKey": "master-v93-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8701",
            "title": "MS Applied Data Science at Clarkson University",
            "university": "Clarkson University",
            "logo": "/study-abroad/logos/Uni_IIITB-Clarkson-University-9d86e49c816a45f281a69a423733e6f7.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds-clarkson.pdf",
            "programPackageKey": "masters-data-clarkson-pp"
          },
          {
            "id": "69e1ca3a846671b5047b3767",
            "title": "MSc Digital Marketing & Data Driven Strategy at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCDMDDS_EDC_FRANCE_BROCHURE_New-9f2753473fc9491ca5cd017de2217d6f.pdf",
            "programPackageKey": "master-v3-smarke-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "AI & ML",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8740",
            "title": "MSc Business Intelligence and Data Science at ISM",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc Business Intelligence and Data Science (1)-53e8f28cfaa7496d9f5cf7a8254acf68.pdf",
            "programPackageKey": "master-v16-sdata-upgra-spa-bl"
          },
          {
            "id": "693c190ddbd3dcdbc674c767",
            "title": "MSc in Business Intelligence & Data Science ",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc Business Intelligence and Data Science (1)-53e8f28cfaa7496d9f5cf7a8254acf68.pdf",
            "programPackageKey": "master-v16-sdata-upgra-spa-bl"
          },
          {
            "id": "699438f8dc0516b727b126dc",
            "title": "MSc Applied Artificial Intelligence ",
            "university": "Northeastern University, London",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-London- MSc Applied Artificial Intelligence Brochure-6253b05295ef4b2aa7e794fa531584a1.pdf",
            "programPackageKey": "master-v27-sdata-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e2",
            "title": "MSc Business Intelligence & Data Science at ISM",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/284/brochure/mscbids_pgmp_ismC7MM9P.pdf",
            "programPackageKey": "master-v99-manag-upgra-psv2"
          },
          {
            "id": "69fc34c9846671b5040ab67b",
            "title": "BS in Applied AI at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSAI_Brochure_Final-497d276993d649f78da6872f65106d95.pdf",
            "programPackageKey": "bachel-v2-saian-upgra-spa-bl"
          },
          {
            "id": "69aa7211d84686bcac290aff",
            "title": "Universal AI Program by MIT",
            "university": " MIT Open Learning ",
            "logo": "/study-abroad/logos/MIT-sqaure-d4fb3cc150004e048d546eb13bd41910.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MIT UAI_Brochure-11de4a3858464d63899a9e1edd298dc5.pdf",
            "programPackageKey": "certif-v28-saian-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f870d",
            "title": "MPS in Applied AI at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/155/brochure/mps_in_ami_neu30O1HD.pdf",
            "programPackageKey": "master-data-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f871b",
            "title": "MS AI at Yeshiva University",
            "university": "Yeshiva University",
            "logo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/ai_yeshiva_university.pdf",
            "programPackageKey": "masters-v3-globaldata-iiitb-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f870b",
            "title": "MS in Machine Learning Engineering at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/126/brochure/msmle_duTZMJZN.pdf",
            "programPackageKey": "master-v1-data-iiitb-du-psv2"
          },
          {
            "id": "68652f5e35106c62e354b8ab",
            "title": "MS AI at Touro University USA",
            "university": "Touro University",
            "logo": "/study-abroad/logos/1-Touro-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/301/brochure/Touro_University_MBAIVXXRQ.pdf",
            "programPackageKey": "master-sai&-upgra-v1-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f871e",
            "title": "MSc Artificial Intelligence Engineering",
            "university": "Aivancity School for Technology, Business and Society",
            "logo": "/study-abroad/logos/1-Aivancity-School-for-Technology.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/132/brochure/msai_aivancityY95ASF.pdf",
            "programPackageKey": "master-data-iiitb-upgra-astbs-psv2"
          },
          {
            "id": "6a60a2315ef51d32a5025c6b",
            "title": "MSc Artificial Intelligence and Adaptive Systems ",
            "university": "University of Sussex",
            "logo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc Artificial Intelligence and Adaptive Systems-827c0bb7bf7442c1b47e74f7e0476e44.pdf",
            "programPackageKey": "master-v11-saian-upgra-spa-bl"
          },
          {
            "id": "695f5357b4d4a38934bf8aea",
            "title": "Youth Leadership Program with AI Concentration at upGrad",
            "university": "upGrad",
            "logo": "/study-abroad/logos/upGrad_square_logo-8f3c5af8edde4aacb07b14493150b187.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/LDP_AI_Brochure_New-4cce175256124c6db2c44c0aecdca1ea.pdf",
            "programPackageKey": "bachel-saian-upgra-spa-bl"
          },
          {
            "id": "6a0ae1a368e0bcddf119e823",
            "title": "Dual Master’s in Global Business and Artificial Intelligence",
            "university": "Northeastern University, London",
            "logo": "/study-abroad/logos/NEU-london-sqaure-e2c3e8e543c0454e9cf4f92bed9da871.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU-NEU-London-Dual M GB&AI-d2262aab83a34b91b0b9c3c9b049bd1e.pdf",
            "programPackageKey": "master-v8-saian-upgra-spa-bl"
          },
          {
            "id": "6a4f5cf572b1c599f03717af",
            "title": "M.Sc. Applied Data Science & AI",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSC_ADS_AI_IIITB_SRH_Germany_Brochure-be0ecde682e7479ab5cf8165ec848716.pdf",
            "programPackageKey": "master-v12-saian-upgra-spa-bl"
          },
          {
            "id": "69e72c2a12a515a3a7b8ab72",
            "title": "MSc AI in Business Analytics at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc AI in Business Analytics_compressed-46f61b30936b4ad7a588d4fa7fd71f21.pdf",
            "programPackageKey": "master-sbusin-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "ENGINEERING",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8711",
            "title": "MS Robotics and Autonomy at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/180/brochure/msras_drexel0UE7B0.pdf",
            "programPackageKey": "master-v3-softw-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8748",
            "title": "MS Engineering Management at UMass Lowell",
            "university": "University of Massachusetts Lowell",
            "logo": "/study-abroad/logos/Uni_IMTG-University-of-Massachusetts-Lowell-2a9a3f77dac94202b189381edc028f55.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/311/brochure/UMASS_Lowell_MS_Engineering_Management4LLGTE.pdf",
            "programPackageKey": "master-v31-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8737",
            "title": "BS Mechanical Engineering at WSU, USA",
            "university": "Washington State University",
            "logo": "/study-abroad/logos/Uni_GGU-Washington-State-University-7ab176d6910440dd839048bc61b251ec.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v4-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f873b",
            "title": "BS Aerospace Engineering at IllinoisTech Chicago",
            "university": "Illinois Institute of Technology",
            "logo": "/study-abroad/logos/Uni_GGU-Illinois-Institute-of-Technology-1c0fb050c9994c19afdad565b95aab8e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v3-sengin-upgra-spa-bl"
          },
          {
            "id": "68e4f19c61c754660b35c4b2",
            "title": "MS in Advanced and Intelligent Manufacturing at Northeastern University - College of Engineering",
            "university": "Northeastern University - College of Engineering",
            "logo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/msaim_nu_coe_usa-dc278b72cd5c498e8441b6af762f5470.pdf",
            "programPackageKey": "master-v8-sengin-upgra-spa-bl"
          },
          {
            "id": "68e4f3146a6a6e9d67cd6adb",
            "title": "MS in Industrial Engineering at Northeastern University - College of Engineering",
            "university": "Northeastern University - College of Engineering",
            "logo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/msie_nu_coe_usa-22f6c6d5cb3f483ba83b3a0b25c4e669.pdf",
            "programPackageKey": "master-v9-sengin-upgra-spa-bl"
          },
          {
            "id": "69aff8337908f321645d8f96",
            "title": "MS Computer Engineering at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/msce_drexel_brochure-5d1d77f8c2494e3c8133b5b9266d30e6.pdf",
            "programPackageKey": "master-v13-sengin-upgra-spa-bl"
          },
          {
            "id": "6a4cae3e72b1c599f0e39c3e",
            "title": "MSc Robotics and Autonomous Systems at Sussex",
            "university": "University of Sussex",
            "logo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Brochure_Sussex-MSc Robotics and Autonomous Systems-6ad31be931c049b3b931d4fa90c9e24a.pdf",
            "programPackageKey": "master-v16-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8712",
            "title": "MS in Civil Engineering at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/182/brochure/msce_drexel017903.pdf",
            "programPackageKey": "master-v13-data-upgra-psv2"
          },
          {
            "id": "6a5f5d5c7ba40535ee6402d0",
            "title": "MSc Advanced Electronic and Electrical Engineering at Sussex",
            "university": "University of Sussex",
            "logo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc%20Advanced%20Electronic%20and%20Electrical%20Engineering%20(1)-edd841abee414490aee881b82f77a4dd.pdf",
            "programPackageKey": "master-v17-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f873a",
            "title": "BS Computer Engineering at IllinoisTech Chicago",
            "university": "Illinois Institute of Technology",
            "logo": "/study-abroad/logos/1-Illinois-Institute-of-Technology.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-softw-ggu-upgra-psv2"
          },
          {
            "id": "68a6e8d7502ae10165024f8b",
            "title": "BSc Computer Science (Hons) at LMU",
            "university": "London Metropolitan University",
            "logo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU- BSCS_new-8505e78ab1a443a1aeeaf3004f02aeb2.pdf",
            "programPackageKey": "bachel-scompu-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f872d",
            "title": "BS Computer Science at Colorado State, USA",
            "university": "Colorado State University",
            "logo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v5-scompu-upgra-spa-bl"
          },
          {
            "id": "69579ec0874a8857c7e81be6",
            "title": "B.Sc. Software Engineering",
            "university": "Code University of Applied Sciences ",
            "logo": "/study-abroad/logos/Uni_GGU-Code-db4e01329a05423d865530f36c702404.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BSc_Software_Engineering_Brochure-ea83dbf91aac4ec5bd99bf9d30a755ed.pdf",
            "programPackageKey": "bachel-v5-ssoftw-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8710",
            "title": "MS Computer Science at Clark University",
            "university": "Clark University",
            "logo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/170/brochure/mscs_clark_usaJ0FS13.pdf",
            "programPackageKey": "master-v7-data-upgra-psv2"
          },
          {
            "id": "6a5f4e02771964625967f1c4",
            "title": "MSc Advanced Computer Science at Sussex",
            "university": "University of Sussex",
            "logo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc Advanced Computer Science-9b7fd275337d47c3a28031f1918bc65d.pdf",
            "programPackageKey": "master-v11-scompu-upgra-spa-bl"
          },
          {
            "id": "6a212c055466337fc5c34d6a",
            "title": "BSc Computer Science at SIU",
            "university": "Schiller International University",
            "logo": "/study-abroad/logos/GGU_SIU-5ae3f6c447ad462895fa29c8327ff2e0.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/SIU-BSc Computer Science-f61e464a0e1d4709be909b073e960cce.pdf",
            "programPackageKey": "bachel-v4-scompu-upgra-spa-bl"
          },
          {
            "id": "68e4f3f76a6a6e9d67cdd3b5",
            "title": "MS in Engineering Management at Northeastern University - College of Engineering",
            "university": "Northeastern University - College of Engineering",
            "logo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/msem_nu_coe_usa-5ba18133d06b4e019c295d467e1dcf4a.pdf",
            "programPackageKey": "master-v10-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86d7",
            "title": "MS in Engineering Management at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IMTG-Drexel-University-80d98d07477f48bbb03e6ff59aa712a2.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/128/brochure/msem_drexel_imtg8PFJPK.pdf",
            "programPackageKey": "master-manag-imt-du-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f870a",
            "title": "MS Engineering Management at Drexel University",
            "university": "Drexel University",
            "logo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/125/brochure/DU_MS_EMECLIJH.pdf",
            "programPackageKey": "master-data-iiitb-du-psv2"
          }
        ]
      },
      {
        "name": "Health & Science",
        "courses": [
          {
            "id": "696a127c874a8857c7c6984e",
            "title": " BS Biotechnology at Northeastern University USA",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-v6-shealt-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e6",
            "title": "Master of Health Services Administration at UDM",
            "university": "University of Detroit Mercy",
            "logo": "/study-abroad/logos/Uni_IMTG-University-of-Detroit-Mercy-28b0b4833ff24fa0916113f4356fc00e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/290/brochure/MHSA_UDM_BrochureCUR5YE.pdf",
            "programPackageKey": "master-v9-smanag-upgra-spa-bl"
          },
          {
            "id": "6a018407846671b5047e67d2",
            "title": "BS in Health Services at Northeastern University",
            "university": "Northeastern University",
            "logo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSHS_Brochure_Final-33d5af1d49364c10a51e4afc9981af6c.pdf",
            "programPackageKey": "bachel-v2-shealt-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8735",
            "title": "BS Biotechnology at Clark University, USA",
            "university": "Clark University",
            "logo": "/study-abroad/logos/1-Clark-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
            "programPackageKey": "bachel-softw-ggu-upgra-psv2"
          }
        ]
      },
      {
        "name": "Finance & Commerce",
        "courses": [
          {
            "id": "69afe9467908f3216442e6c5",
            "title": "Master in Finance (M.A.)",
            "university": "Munich Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Munich-Business-School-4ba5312f7ad34d09821ac75a143c3bff.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MBS_Master_in_Finance(MA)_IMTG_Brochure-bf0358b3f67b40968fca5286e0e14c87.pdf",
            "programPackageKey": "master-v3-sfinan-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e3",
            "title": "MSc Finance",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/287/brochure/imt_ism_mscfXO3RH7.pdf",
            "programPackageKey": "master-v3-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86df",
            "title": "MS Quantitative Finance at Northeastern University",
            "university": "DAmore McKim School of Business Northeastern University",
            "logo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/281/brochure/D_Amore_NU__MSQFOI3ZWD.pdf",
            "programPackageKey": "master-v96-manag-upgra-psv2"
          },
          {
            "id": "6a1d645e75e63d422ee8138b",
            "title": "Master of Science in Finance at WHU",
            "university": "WHU - Otto Beisheim School of Management",
            "logo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSIF_Brochure_WHU_Germany-dc9dacccfb754c9d82727be454820a61.pdf",
            "programPackageKey": "master-v8-sfinan-upgra-spa-bl"
          },
          {
            "id": "69eafa60a1aabd2524e94345",
            "title": "MSc International Finance at EDC Paris Business School",
            "university": "EDC Paris Business School",
            "logo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCIF_EDC_FRANCE_BROCHURE_New-5059a74849b644eaa4d2fe47d90d24e7.pdf",
            "programPackageKey": "master-v5-sfinan-upgra-spa-bl"
          }
        ]
      }
    ]
  },
  {
    "name": "Germany",
    "slug": "germany",
    "flag": "/study-abroad/flags/germany.svg",
    "isPopular": true,
    "totalPrograms": 20,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f86d6",
            "title": "MBA 90 ECTS at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/100/brochure/management_ismL02YIB.pdf",
            "programPackageKey": "masters-management-ism-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f86c6",
            "title": "MBA 90 ECTS at SRH Germany",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/304/brochure/SRH_MBA44XIL6.pdf",
            "programPackageKey": "master-v2-smba-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86c2",
            "title": "MBA 90 ECTS at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/UAM-MBA 90_compressed-7accc6df37404300b1a1c0e2ca89ac8c.pdf",
            "programPackageKey": "master-v20-smanag-upgra-spa-bl"
          },
          {
            "id": "68b193c1db576fc15445a341",
            "title": "MBA at Touro University Germany",
            "university": "Touro University, Germany",
            "logo": "/study-abroad/logos/1-Touro-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/322/brochure/mba_touro_germany_brochureUFXBDU.pdf",
            "programPackageKey": "master-v10-smba-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86c3",
            "title": "Executive MBA 60 ECTS at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/UAM-MBA 60_compressed-358f7a65d36046898cf12aa99f4f4ec6.pdf",
            "programPackageKey": "master-v18-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8746",
            "title": "BA Management at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_ism.pdf",
            "programPackageKey": "bachel-v3-smanag-upgra-spa-bl"
          },
          {
            "id": "693c18a941fe5c2b808d8ec4",
            "title": "MSc International Management, ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MSc International Management (1)-cc892acce78c4d928aae8e4bc4621ba5.pdf",
            "programPackageKey": "master-v54-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86e1",
            "title": "MSc International Management at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/286/brochure/MSc_International_ManagementNS6JWD.pdf",
            "programPackageKey": "master-v100-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86c8",
            "title": "MA International Business & Leadership at SRH Germany",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/303/brochure/SRH_MAIBL_GermanyR69TI2.pdf",
            "programPackageKey": "master-v21-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8725",
            "title": "MSc International Management, ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/188/brochure/ggu_ism_msc_im07LEI7.pdf",
            "programPackageKey": "master-v23-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8741",
            "title": "MSc International Logistics & Supply Chain Management, ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/285/brochure/ISM_MSc_IG_SCMSZJKV5.pdf",
            "programPackageKey": "master-v101-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8723",
            "title": "MSc International Logistics & Supply Chain Management at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/183/brochure/ggu_ism_mslscm81OV91.pdf",
            "programPackageKey": "master-v19-manag-upgra-psv2"
          },
          {
            "id": "698d67dadc0516b727358202",
            "title": "M.A. Strategic Marketing Management at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/MASMM_IIMU_ISM_Germany_Brochure-8b9d52abd0d64563a5ff6d75913a54d1.pdf",
            "programPackageKey": "master-v2-smarke-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86c7",
            "title": "MA International Hospitality Management at SRH Germany",
            "university": "SRH University of Applied Sciences",
            "logo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/305/brochure/SRH_MAIHM_GermanyB238NY.pdf",
            "programPackageKey": "master-v24-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "AI & ML",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8720",
            "title": "MSc Business Intelligence & Data Science at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/111/brochure/ggu_ism_bids1RLSYP.pdf",
            "programPackageKey": "masters-manage-ism-pp"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68b1959cdecfc573f00ddfa0",
            "title": "MS in Data Analytics",
            "university": "Touro University, Germany",
            "logo": "/study-abroad/logos/1-Touro-University.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/321/brochure/TU_Berlin_MS_DA_compressedIIX1OV.pdf",
            "programPackageKey": "master-v17-sdata-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "ENGINEERING",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8747",
            "title": "BEngg. Digital Engineering at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_ism_germany.pdf",
            "programPackageKey": "bachel-sengin-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8745",
            "title": "BSc Software Developement at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_ism_germany.pdf",
            "programPackageKey": "bachel-v2-ssoftw-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86c1",
            "title": "MS Computer Science 90 ECTS at UAM Germany",
            "university": "University of Applied Management",
            "logo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/295/brochure/mscs90ects_uam_germany_2_Q3TKQE.pdf",
            "programPackageKey": "master-v2-scompu-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Finance & Commerce",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8742",
            "title": "MSc Finance at ISM Germany",
            "university": "International School of Management",
            "logo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/287/brochure/imt_ism_mscfXO3RH7.pdf",
            "programPackageKey": "master-v3-smanag-upgra-spa-bl"
          }
        ]
      }
    ]
  },
  {
    "name": "France",
    "slug": "france",
    "flag": "/study-abroad/flags/france.svg",
    "isPopular": true,
    "totalPrograms": 18,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "69b3bd2cf46890e260ec747f",
            "title": "Master of Business Administration at PSB, France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/269/brochure/mba_psb_franceEIYZ6I.pdf",
            "programPackageKey": "master-v74-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f86f8",
            "title": "MSc Luxury and Innovation Management at EMLV France",
            "university": "EMLV Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-EMLV-Business-School-b680e694f8cb4dab9e0d9b0c1eb77d58.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/205/brochure/msclim_emlv_franceZS3HHG.pdf",
            "programPackageKey": "master-v41-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86cc",
            "title": "MSc in Luxury and Fashion Management at PSB France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/271/brochure/PSB_MSc_in_Luxury_and_Fashion_Management_1_DQ1PP2.pdf",
            "programPackageKey": "master-v77-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86f1",
            "title": "MSc Impact Finance & Fintech Management at ESDES France",
            "university": "ESDES Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/169/brochure/msiffm_esdes_france2KH7HE.pdf",
            "programPackageKey": "master-v9-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86f0",
            "title": "MSc Circular Economy & Sustainable Innovation at ESDES France",
            "university": "ESDES Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/168/brochure/mscesi_esdes_france8CTWJX.pdf",
            "programPackageKey": "master-v10-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86ce",
            "title": "MSc Supply Chain Management at PSB France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/294/brochure/PSB_MSc_in_Supply_Chain_Management4P5OGZ.pdf",
            "programPackageKey": "master-v14-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86de",
            "title": "MSc Global Supply Chain Management at KEDGE France",
            "university": "KEDGE Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/276/brochure/msc_gscm_pgmp_kedge_franceB7LSGG.pdf",
            "programPackageKey": "master-v91-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86fa",
            "title": "MSc Global Supply Chain Management at KEDGE, France",
            "university": "KEDGE Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/239/brochure/msc_gscm_kedge_france82VCCM.pdf",
            "programPackageKey": "master-v55-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86f9",
            "title": "MSc Marketing at KEDGE, France",
            "university": "KEDGE Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/238/brochure/mscm_kedge_france33L19D.pdf",
            "programPackageKey": "master-v54-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86ef",
            "title": "MSc Sustainable Tourism & Event Management at ESDES France",
            "university": "ESDES Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/167/brochure/msstem_esdes_franceSRBNP9.pdf",
            "programPackageKey": "master-v8-manag-upgra-psv2"
          },
          {
            "id": "68b15504c38f68076c67b049",
            "title": "MSc in International Hospitality at Excelia, France",
            "university": "Excelia Tourism School",
            "logo": "/study-abroad/logos/1-Excelia-Business-School.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/204/brochure/msc_ih_excelia_franceLXHS6J.pdf",
            "programPackageKey": "master-v44-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f86fc",
            "title": "MSc Data Analytics for Business at KEDGE, France",
            "university": "KEDGE Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/243/brochure/mscda_franceQLSQA3.pdf",
            "programPackageKey": "master-v61-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86f7",
            "title": "MSc Digital Business Analytics at EMLV France",
            "university": "EMLV Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-EMLV-Business-School-b680e694f8cb4dab9e0d9b0c1eb77d58.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/203/brochure/mscdba_emlv_france3GIXGH.pdf",
            "programPackageKey": "master-v40-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "AI & ML",
        "courses": [
          {
            "id": "6a13f38d33a25f9ed77f1c70",
            "title": "MSc AI, Business Analytics & Cybersecurity at PSB France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/PSB_MSc%20AI_Business_Analytics%20_Cybersecurity-113e409992444c298812e4017e306ae4.pdf",
            "programPackageKey": "master-v5-ssuppl-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86cb",
            "title": "MSc in Marketing Analytics and Data Intelligence at PSB France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/270/brochure/PSB_MSc_in_Marketing_Analytics_and_Data_Intelligence8MFWQX.pdf",
            "programPackageKey": "master-v76-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "Finance & Commerce",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f86f6",
            "title": "MSc in International Corporate Finance at Excelia France",
            "university": "Excelia Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/202/brochure/msc_icf_excelia_franceQFE6PH.pdf",
            "programPackageKey": "master-v42-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86fb",
            "title": "MSc Banking & Finance at KEDGE, France",
            "university": "KEDGE Business School",
            "logo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/242/brochure/msccf_kedge_franceGX0YXL.pdf",
            "programPackageKey": "master-v60-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f86c9",
            "title": "MSc in International Finance at PSB, France",
            "university": "Paris School Of Business",
            "logo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/262/brochure/msc_if_psb_france76N0A6.pdf",
            "programPackageKey": "master-v70-manag-upgra-psv2"
          }
        ]
      }
    ]
  },
  {
    "name": "United Kingdom",
    "slug": "united-kingdom",
    "flag": "/study-abroad/flags/united-kingdom.svg",
    "isPopular": true,
    "totalPrograms": 8,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8728",
            "title": "Master of Business Administration at Sunderland, UK",
            "university": "University of Sunderland",
            "logo": "/study-abroad/logos/Uni_GGU-University-of-Sunderland-7dff1557371d4e7ea03f215f28bcf805.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/257/brochure/mba_university_of_sunderland_uk07CHZO.pdf",
            "programPackageKey": "master-v68-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "Bachelors",
        "courses": [
          {
            "id": "6995965d8b7dc4fb41c4b96a",
            "title": "BSc Business (Hons) at NU London",
            "university": "Northeastern University London",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU london Brochure BSc Business (Hons)-0ed3a2e8e4f042a8831d11bce4c8d533.pdf",
            "programPackageKey": "bachel-v16-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68b18bdcc38f68076cba63fc",
            "title": "MSc IBM at Northeastern London",
            "university": "Northeastern University, London",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/319/brochure/NEU_London_MSc_IBXIQL1Z.pdf",
            "programPackageKey": "master-v33-smanag-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f86ed",
            "title": "MSc International Business Management at St. Mary's London",
            "university": "St Marys University Twickenham London",
            "logo": "/study-abroad/logos/Uni_IMTG-St-Marys-University-Twickenham-London-UK-dd3a68631c3f450395d77754f3e39ad6.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/104/brochure/ibm_stmarysMW6SQI.pdf",
            "programPackageKey": "msc-v1-management-stmarys-pp"
          },
          {
            "id": "69d6067c59e68049ddc8f53a",
            "title": "MSc Fintech Management at Northeastern London",
            "university": "Northeastern University, London",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-London- MSc-FM-2c03059dca254966ba1e69dce3cb89e2.pdf",
            "programPackageKey": "master-v4-sfinan-upgra-spa-bl"
          },
          {
            "id": "68b186d6c38f68076caf403d",
            "title": "MSc Project Management at Northeastern London",
            "university": "Northeastern University, London",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/314/brochure/MSc_PM_NU_UKWXEWZY.pdf",
            "programPackageKey": "master-v32-smanag-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "698ef8ad4f8f195fac6c0a44",
            "title": "BSc Data Science (Hons) at NU London",
            "university": "Northeastern University London",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-london-BSc Data Science (Hons) (1)-30c0bb57bb7a42d9b5857c72d87e705d.pdf",
            "programPackageKey": "bachel-v1-sdata-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "ENGINEERING",
        "courses": [
          {
            "id": "698ad8664f8f195fac2452b0",
            "title": "BSc Computer Science & Business (Hons) at NU London",
            "university": "Northeastern University London",
            "logo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
            "syllabusUrl": "https://d2o2utebsixu4k.cloudfront.net/BSCCSB_NU_UK_Brochure-2b18c2e40a8e4638830199525863634b.pdf",
            "programPackageKey": "bachel-v2-scompu-upgra-spa-bl"
          }
        ]
      }
    ]
  },
  {
    "name": "Finland",
    "slug": "finland",
    "flag": "/study-abroad/flags/finland.svg",
    "isPopular": true,
    "totalPrograms": 2,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "68b18389c38f68076caa8ea0",
            "title": "MBA IBM at XAMK Finland",
            "university": "South-Eastern Finland University of Applied Sciences (XAMK)",
            "logo": "/study-abroad/logos/Uni_GGU-XAMK-7e50804d780443a7ab9033f23da7bef5.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/313/brochure/XAMK_GGU_MBA_IBM_ACAMBJ.pdf",
            "programPackageKey": "master-v9-smba-upgra-spa-bl"
          },
          {
            "id": "68654c5facd8a9c70e9f8727",
            "title": "MBA IBM at SeAMK Finland",
            "university": "Seinajoki University of Applied Sciences",
            "logo": "/study-abroad/logos/Uni_GGU-Seinajoki-University-of-Applied-Sciences-775497667b4d4948b8b68c898831390c.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/201/brochure/mbaibm_seamk_finlandYOZ179.pdf",
            "programPackageKey": "master-v39-manag-upgra-psv2"
          }
        ]
      }
    ]
  },
  {
    "name": "Australia",
    "slug": "australia",
    "flag": "/study-abroad/flags/australia.svg",
    "isPopular": true,
    "totalPrograms": 3,
    "categories": [
      {
        "name": "Bachelors",
        "courses": [
          {
            "id": "68889c7fb82f0b10dfe18fd1",
            "title": "Bachelor of Business at Macquarie University, Australia",
            "university": "Macquarie University",
            "logo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/263/brochure/BachelorOfBusiness_Macquarie_University8AHA0Z.pdf",
            "programPackageKey": "bachel-v4-manag-upgra-psv2"
          },
          {
            "id": "6888996aa83cce9f0d98547f",
            "title": "Bachelor of Information Technology at Macquarie University, Australia",
            "university": "Macquarie University",
            "logo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/268/brochure/MacU_Bachelor_of_Information_TechnologyAK27J7.pdf",
            "programPackageKey": "bachel-v1-data-upgra-psv2"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68889b85a83cce9f0d9be788",
            "title": "Bachelor of Business Analytics at Macquarie University, Australia",
            "university": "Macquarie University",
            "logo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/267/brochure/BachelorOfBusinessAnalytics_Macquarie_University7DAYPG.pdf",
            "programPackageKey": "bachel-data-upgra-psv2"
          }
        ]
      }
    ]
  },
  {
    "name": "Canada",
    "slug": "canada",
    "flag": "/study-abroad/flags/canada.svg",
    "isPopular": true,
    "totalPrograms": 8,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f86e8",
            "title": "MBA at UCW Canada",
            "university": "University Canada West",
            "logo": "/study-abroad/logos/Uni_IMTG-UCW-9064ef48fa464e7f9106aaee2a35400b.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/mba_ucw.pdf",
            "programPackageKey": "mba-management-upgrad-pp"
          },
          {
            "id": "68654c5facd8a9c70e9f8722",
            "title": "MBA in Technology, Innovation and Entrepreneurship at IBU Canada",
            "university": "International Business University",
            "logo": "/study-abroad/logos/Uni_GGU-International-Business-School-IBS-e6412e7f99d84bde8210aeef49eb3a3d.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/173/brochure/mba_ibu_canadaU43QBG.pdf",
            "programPackageKey": "master-v16-manag-upgra-psv2"
          },
          {
            "id": "68654c5facd8a9c70e9f8730",
            "title": "Bachelor of Business Administration at Algoma, Canada",
            "university": "Algoma University",
            "logo": "/study-abroad/logos/Uni_GGU-Algoma-University-fd2118bc6287414a83892c6e83b2e00e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_program_canada.pdf",
            "programPackageKey": "bachel-v1-sbache-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68b14a2bc38f68076c552ca7",
            "title": "MPS in Informatics at Northeastern University Canada",
            "university": "Northeastern University, Canada",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/162/brochure/mps_informatics_neu_canadaEC99ZM.pdf",
            "programPackageKey": "master-v6-data-upgra-psv2"
          },
          {
            "id": "68b14c27decfc573f0ac28cf",
            "title": "MS in Project Management at Northeastern University Canada",
            "university": "Northeastern University, Canada",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/159/brochure/mspm_neu_canadaI41BPL.pdf",
            "programPackageKey": "master-v4-data-upgra-psv2"
          },
          {
            "id": "68b1a3304b8c118d72a795c3",
            "title": "MS in Project Management (Canada)",
            "university": "Northeastern University, Canada",
            "logo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/176/brochure/NEU_IMT_MS_PM_CANADAW5PS29.pdf",
            "programPackageKey": "master-v18-manag-upgra-psv2"
          }
        ]
      },
      {
        "name": "ENGINEERING",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8731",
            "title": "Bachelor of Computer Science at Algoma, Canada",
            "university": "Algoma University",
            "logo": "/study-abroad/logos/Uni_GGU-Algoma-University-fd2118bc6287414a83892c6e83b2e00e.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_program_canada.pdf",
            "programPackageKey": "bachel-v6-scompu-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68b17453db576fc154066abe",
            "title": "MPS in Analytics at Northeastern University Canada",
            "university": "Northeastern University, Canada",
            "logo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/161/brochure/mps_in_analytics_neuFJMLBS.pdf",
            "programPackageKey": "master-v5-data-upgra-psv2"
          }
        ]
      }
    ]
  },
  {
    "name": "UAE",
    "slug": "uae",
    "flag": "/study-abroad/flags/uae.svg",
    "isPopular": true,
    "totalPrograms": 4,
    "categories": [
      {
        "name": "Data Science",
        "courses": [
          {
            "id": "68654c5facd8a9c70e9f8749",
            "title": "Masters in Data Analytics at RIT Dubai",
            "university": "Rochester Institute of Technology of Dubai",
            "logo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/312/brochure/MPS_DA_RIT_DubaiA6WKZZ.pdf",
            "programPackageKey": "master-v3-sdata-upgra-spa-bl"
          },
          {
            "id": "68b17f65db576fc1541f321d",
            "title": "Master's in Data Analytics at RIT Dubai",
            "university": "Rochester Institute of Technology of Dubai",
            "logo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/312/brochure/MPS_DA_RIT_DubaiA6WKZZ.pdf",
            "programPackageKey": "master-v3-sdata-upgra-spa-bl"
          }
        ]
      },
      {
        "name": "Management",
        "courses": [
          {
            "id": "68b17b91db576fc154164424",
            "title": "Master's in Future Foresight and Planning at RIT Dubai",
            "university": "Rochester Institute of Technology of Dubai",
            "logo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/316/brochure/RIT_Dubai_MPS_Future_Foresight_and_PlanningONYRFS.pdf",
            "programPackageKey": "master-v3-sengin-upgra-spa-bl"
          },
          {
            "id": "68b17e58decfc573f0eae568",
            "title": "Master's in Smart Cities at RIT Dubai",
            "university": "Rochester Institute of Technology of Dubai",
            "logo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/315/brochure/RIT_Dubai_MPS_Smart_Cities57PUYB.pdf",
            "programPackageKey": "master-v2-sengin-upgra-spa-bl"
          }
        ]
      }
    ]
  },
  {
    "name": "Hungary",
    "slug": "hungary",
    "flag": "/study-abroad/flags/hungary.svg",
    "isPopular": false,
    "totalPrograms": 1,
    "categories": [
      {
        "name": "MBA",
        "courses": [
          {
            "id": "68b178f0db576fc15410700e",
            "title": "MBA in Strategic Data Driven Management at IBS Hungary",
            "university": "International Business School",
            "logo": "/study-abroad/logos/Uni_GGU-International-Business-School-IBS-e6412e7f99d84bde8210aeef49eb3a3d.svg",
            "syllabusUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/191/brochure/mba_ibs_ggu3S6PEY.pdf",
            "programPackageKey": "master-v26-manag-upgra-psv2"
          }
        ]
      }
    ]
  }
];

export const allStudyAbroadPrograms = [
  {
    "id": "68b178f0db576fc15410700e",
    "name": "MBA in Strategic Data Driven Management at IBS Hungary",
    "universityName": "International Business School",
    "programPackageKey": "master-v26-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-Business-School-IBS-e6412e7f99d84bde8210aeef49eb3a3d.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/191/brochure/mba_ibs_ggu3S6PEY.pdf",
    "category": "MBA",
    "country": "Hungary"
  },
  {
    "id": "68b18389c38f68076caa8ea0",
    "name": "MBA IBM at XAMK Finland",
    "universityName": "South-Eastern Finland University of Applied Sciences (XAMK)",
    "programPackageKey": "master-v9-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-XAMK-7e50804d780443a7ab9033f23da7bef5.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/313/brochure/XAMK_GGU_MBA_IBM_ACAMBJ.pdf",
    "category": "MBA",
    "country": "Finland"
  },
  {
    "id": "68654c5facd8a9c70e9f8727",
    "name": "MBA IBM at SeAMK Finland",
    "universityName": "Seinajoki University of Applied Sciences",
    "programPackageKey": "master-v39-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Seinajoki-University-of-Applied-Sciences-775497667b4d4948b8b68c898831390c.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/201/brochure/mbaibm_seamk_finlandYOZ179.pdf",
    "category": "MBA",
    "country": "Finland"
  },
  {
    "id": "68654c5facd8a9c70e9f8728",
    "name": "Master of Business Administration at Sunderland, UK",
    "universityName": "University of Sunderland",
    "programPackageKey": "master-v68-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-University-of-Sunderland-7dff1557371d4e7ea03f215f28bcf805.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/257/brochure/mba_university_of_sunderland_uk07CHZO.pdf",
    "category": "MBA",
    "country": "United Kingdom"
  },
  {
    "id": "6948f65827e91fd7f33c1f0a",
    "name": "Master of Business Administration at DePaul",
    "universityName": "DePaul University",
    "programPackageKey": "master-v19-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DePaul-University-d32037d1a57847128e7087272c5f2044.svg",
    "syllabusFileUrl": "",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "693c142210cf3da3cb915253",
    "name": "Master of Business Administration 90 ECTS",
    "universityName": "International School of Management",
    "programPackageKey": "master-v20-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MBA (1)-06d0810d9bfa498c827f940f2183b040.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "6978b7dadde65ec2b8bcce52",
    "name": "MBA General Management",
    "universityName": "Munich Business School",
    "programPackageKey": "master-v24-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Munich-Business-School-4ba5312f7ad34d09821ac75a143c3bff.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MBS-HD-BROCHURE-UPDATED-31d23b2e00e64c2b8ffb395f29b621ff.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "699da5e5bfef1524b097b1f3",
    "name": "Master of Business Administration",
    "universityName": "Drexel University",
    "programPackageKey": "master-v26-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-Drexel-29bef4f2fb02418584810229667fbbdf.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Drexel_IIMU_MBA_Brochure_USA-7dbf573deed0469abd77740da54be51f.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e8",
    "name": "MBA at UCW Canada",
    "universityName": "University Canada West",
    "programPackageKey": "mba-management-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-UCW-9064ef48fa464e7f9106aaee2a35400b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/mba_ucw.pdf",
    "category": "MBA",
    "country": "Canada"
  },
  {
    "id": "68654c5facd8a9c70e9f86ea",
    "name": "MBA at CityU Seattle",
    "universityName": "City University of Seattle",
    "programPackageKey": "masters-management-cityu-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-City-University-of-Seattle-US-06a4ddcfc9bc42ae9da44276921396cf.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/96/brochure/MBA_SeattleFHE6Q2.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86ec",
    "name": "MBA with Placement at Roehampton",
    "universityName": "University of Roehampton",
    "programPackageKey": "master-v33-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-University-of-Roehampton-UK-8a045c683f5845f7a78d75bcef53684b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/101/brochure/mba_roehamptonF5CZSU.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d3",
    "name": "MBA at Clark University",
    "universityName": "Clark University",
    "programPackageKey": "masters-manage-clarkuniversity-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Clark-ae7e5ef525ee45c9b5a8a0b2f56b0bc8.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/106/brochure/mba_clarkSPKGJG.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d1",
    "name": "Master of Business Administration at Utica University",
    "universityName": "Utica University",
    "programPackageKey": "master-v58-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_Edgewood-Utica-University-af1fafee7c5642b796c37cbb390624b4.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/248/brochure/mba_edgewood_utica_usa_BIWED3.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d4",
    "name": "MBA at Clarkson University",
    "universityName": "Clarkson University",
    "programPackageKey": "masters-management-clarkson-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Clarkson-University-b51a2f9f88b24215be80bd670a31a8ac.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/73/brochure/mba_clarkson87E1Q2.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d5",
    "name": "MBA at Utica University",
    "universityName": "Utica University",
    "programPackageKey": "mba-management-uticauniversity-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Utica-University-19a6d9f0f6a44df89eaac48f483324f6.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/93/brochure/mba_uticaSOJGEO.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d6",
    "name": "MBA 90 ECTS at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "masters-management-ism-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/100/brochure/management_ismL02YIB.pdf",
    "category": "MBA",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f8722",
    "name": "MBA in Technology, Innovation and Entrepreneurship at IBU Canada",
    "universityName": "International Business University",
    "programPackageKey": "master-v16-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-Business-School-IBS-e6412e7f99d84bde8210aeef49eb3a3d.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/173/brochure/mba_ibu_canadaU43QBG.pdf",
    "category": "MBA",
    "country": "Canada"
  },
  {
    "id": "68654c5facd8a9c70e9f8700",
    "name": "MBA at Northeastern University",
    "universityName": "D'Amore McKim School of Business Northeastern University",
    "programPackageKey": "master-v88-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/278/brochure/Neu_D_amore_mba_usa1547WC.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86c6",
    "name": "MBA 90 ECTS at SRH Germany",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "master-v2-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/304/brochure/SRH_MBA44XIL6.pdf",
    "category": "MBA",
    "country": "Germany"
  },
  {
    "id": "69b3bd2cf46890e260ec747f",
    "name": "Master of Business Administration at PSB, France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v74-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/269/brochure/mba_psb_franceEIYZ6I.pdf",
    "category": "MBA",
    "country": "France"
  },
  {
    "id": "686524ebe635d9dde80d9a65",
    "name": "MBA at Touro University USA",
    "universityName": "Touro University",
    "programPackageKey": "master-v1-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Touro-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/301/brochure/Touro_University_MBAIVXXRQ.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86c2",
    "name": "MBA 90 ECTS at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "master-v20-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/UAM-MBA 90_compressed-7accc6df37404300b1a1c0e2ca89ac8c.pdf",
    "category": "MBA",
    "country": "Germany"
  },
  {
    "id": "68b193c1db576fc15445a341",
    "name": "MBA at Touro University Germany",
    "universityName": "Touro University, Germany",
    "programPackageKey": "master-v10-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Touro-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/322/brochure/mba_touro_germany_brochureUFXBDU.pdf",
    "category": "MBA",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f86c3",
    "name": "Executive MBA 60 ECTS at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "master-v18-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/UAM-MBA 60_compressed-358f7a65d36046898cf12aa99f4f4ec6.pdf",
    "category": "MBA",
    "country": "Germany"
  },
  {
    "id": "6a4f96bd33e6ed1cc4b3de56",
    "name": "Master of Business Administration at SRH",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "master-v37-smba-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MBA_IIMU_SRH_Brochure_Germany-d853f66464f041d0a43144fc0895f710.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8746",
    "name": "BA Management at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "bachel-v3-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_ism.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "68889c7fb82f0b10dfe18fd1",
    "name": "Bachelor of Business at Macquarie University, Australia",
    "universityName": "Macquarie University",
    "programPackageKey": "bachel-v4-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/263/brochure/BachelorOfBusiness_Macquarie_University8AHA0Z.pdf",
    "category": "Bachelors",
    "country": "Australia"
  },
  {
    "id": "68654c5facd8a9c70e9f8743",
    "name": "MSc Psychology & Management",
    "universityName": "International School of Management",
    "programPackageKey": "master-v2-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/288/brochure/ISM_MSc_Psychology_ManagementLV61HO.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f872f",
    "name": "BS Business at Colorado State, USA",
    "universityName": "Colorado State University",
    "programPackageKey": "bachel-v2-sbache-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8730",
    "name": "Bachelor of Business Administration at Algoma, Canada",
    "universityName": "Algoma University",
    "programPackageKey": "bachel-v1-sbache-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Algoma-University-fd2118bc6287414a83892c6e83b2e00e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_program_canada.pdf",
    "category": "MBA",
    "country": "Canada"
  },
  {
    "id": "68654c5facd8a9c70e9f8732",
    "name": "Bachelor of Business Administration at ABC Paris",
    "universityName": "American Business College",
    "programPackageKey": "bachel-v1-manag-ggu-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-American-Business-School-ccd08353393248f09f09e6e6a607deb3.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_abs.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8733",
    "name": "BS in International Management",
    "universityName": "International School of Management",
    "programPackageKey": "bachel-v29-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_ism.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f873d",
    "name": "BS Management at Northeastern University, USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v30-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "693c18a941fe5c2b808d8ec4",
    "name": "MSc International Management, ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v54-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSc International Management (1)-cc892acce78c4d928aae8e4bc4621ba5.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "69537c36874a8857c77bb931",
    "name": "Master of Science in Management",
    "universityName": "WHU - Otto Beisheim School of Management",
    "programPackageKey": "master-v57-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/WHU- MSc Management-3c71b9c674654a519746a7f2e98c3548.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6964a120874a8857c7f5140e",
    "name": "B.A. Business Management & Entrepreneurship ",
    "universityName": "Code University of Applied Sciences",
    "programPackageKey": "bachel-v12-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Code-db4e01329a05423d865530f36c702404.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BABME_Brochure-7acff52432254273893d9f7622642ed2.pdf  ",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6995965d8b7dc4fb41c4b96a",
    "name": "BSc Business (Hons) at NU London",
    "universityName": "Northeastern University London",
    "programPackageKey": "bachel-v16-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU london Brochure BSc Business (Hons)-0ed3a2e8e4f042a8831d11bce4c8d533.pdf",
    "category": "Bachelors",
    "country": "United Kingdom"
  },
  {
    "id": "699fe2dc4f8f195fac31bd89",
    "name": "BS Leadership and Management at NYU USA",
    "universityName": "New York University",
    "programPackageKey": "bachel-v18-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-New-York-University-313aaa1365ab414ba07a60f2752e850c.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSLM_NYU_USA_Brochure-20537c9317944ceca7adc39c0b6a73e2.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68b18bdcc38f68076cba63fc",
    "name": "MSc IBM at Northeastern London",
    "universityName": "Northeastern University, London",
    "programPackageKey": "master-v33-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/319/brochure/NEU_London_MSc_IBXIQL1Z.pdf",
    "category": "Management",
    "country": "United Kingdom"
  },
  {
    "id": "69d895aba1aabd2524797828",
    "name": "Digital Business Innovations BBA at Haaga-Helia",
    "universityName": "Haaga-Helia University of Applied Sciences",
    "programPackageKey": "bachel-v21-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/HHU_DIGIBBA_Brochure_Finland-2cba41dc4fce4b8d8a67f276eaf73d07.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68b92b9404b18bde57f3ec52",
    "name": "BA Business Management (Hons) at LMU",
    "universityName": "London Metropolitan University",
    "programPackageKey": "bachel-v5-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU-BABM-e5d6e23b46044c9da4b9bd6d96c4a702.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "69d4aadaa1aabd2524e402e2",
    "name": "International Bachelor of Business Administration at Haaga-Helia",
    "universityName": "Haaga-Helia University of Applied Sciences",
    "programPackageKey": "bachel-v20-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/HHU_INTL_BBA_Brochure_Finland-67e47a49ccc546cb83f267f1c6f5567b.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "691d6d1e7b3593050dfaade4",
    "name": "Bachelor of Commerce at Newcastle",
    "universityName": "University of Newcastle",
    "programPackageKey": "bachel-v8-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-The-University-of-Newcastle-3d69805207944af0a6beb4a2914a89d4.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Newcastle-Bachelor of Commerce (1)-be1353c4f30946158f5e5adb68d2643d.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "6932b441af6b3d6a34ea0e87",
    "name": "Bachelor of Business at Newcastle",
    "universityName": "University of Newcastle",
    "programPackageKey": "bachel-v9-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-The-University-of-Newcastle-3d69805207944af0a6beb4a2914a89d4.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Newcastle-Bachelor of Business (1)-11c2eaf1ba2c4d168e6efe471066c420.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86ed",
    "name": "MSc International Business Management at St. Mary's London",
    "universityName": "St Marys University Twickenham London",
    "programPackageKey": "msc-v1-management-stmarys-pp",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-St-Marys-University-Twickenham-London-UK-dd3a68631c3f450395d77754f3e39ad6.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/104/brochure/ibm_stmarysMW6SQI.pdf",
    "category": "Management",
    "country": "United Kingdom"
  },
  {
    "id": "68654c5facd8a9c70e9f86eb",
    "name": "MSc Global Business Management at Roehampton",
    "universityName": "University of Roehampton",
    "programPackageKey": "master-v34-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-University-of-Roehampton-UK-8a045c683f5845f7a78d75bcef53684b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/102/brochure/gbm_roehamptonNIHATN.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e1",
    "name": "MSc International Management at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v100-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/286/brochure/MSc_International_ManagementNS6JWD.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f86f4",
    "name": "MSc in Sustainable Luxury and Creative Industries at Excelia",
    "universityName": "Excelia Business School",
    "programPackageKey": "master-v37-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/199/brochure/mscslci_excelia_france5VVBXZ.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f8",
    "name": "MSc Luxury and Innovation Management at EMLV France",
    "universityName": "EMLV Business School",
    "programPackageKey": "master-v41-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-EMLV-Business-School-b680e694f8cb4dab9e0d9b0c1eb77d58.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/205/brochure/msclim_emlv_franceZS3HHG.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86c8",
    "name": "MA International Business & Leadership at SRH Germany",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "master-v21-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/303/brochure/SRH_MAIBL_GermanyR69TI2.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "6a1d66e510e07fb9189e8055",
    "name": "Master of Science in Entrepreneurship",
    "universityName": "WHU - Otto Beisheim School of Management",
    "programPackageKey": "master-v108-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/WHU- Master of Science in Entrepreneurship-5da259495a51482483561121e269c249.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8725",
    "name": "MSc International Management, ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v23-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/188/brochure/ggu_ism_msc_im07LEI7.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f86d8",
    "name": "MS in Organizational Leadership at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v2-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/160/brochure/ms_in_ol_neu8Q8IF5.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a02d54ca1aabd252492c18a",
    "name": "BS in Management at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v24-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIM_NU_USA_Brochure-06b5a6e797464e4193f451103647e9b3.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86cc",
    "name": "MSc in Luxury and Fashion Management at PSB France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v77-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/271/brochure/PSB_MSc_in_Luxury_and_Fashion_Management_1_DQ1PP2.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "6a1fde3f75e63d422ef95119",
    "name": "BSc International Business at SIU",
    "universityName": "Schiller International University  ",
    "programPackageKey": "bachel-v27-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/GGU_SIU-5ae3f6c447ad462895fa29c8327ff2e0.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/SIU-BSc International Business-cc4f8de04205475bacb335ff3c563ff5.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "695f55eba6878ba26a5dd0c8",
    "name": "Youth Leadership Program with Business Concentration at upGrad",
    "universityName": "upGrad",
    "programPackageKey": "bachel-v6-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/upGrad_square_logo-8f3c5af8edde4aacb07b14493150b187.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Business Leadership Brochure-1ead5be972294156b8b3ce4722f91205.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "69eb0a9aa1aabd2524f2d3b1",
    "name": "MSc International Business at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-v74-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc International Business_compressed-1923bb7d36c1402081dfa583b965dfc0.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "69d8c91012a515a3a7343a23",
    "name": "Professional Certificate in Business Management",
    "universityName": "IIM Udaipur",
    "programPackageKey": "certif-v38-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-Square-logo-7cd5601693c54664a459d439808f1429.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU_V2-1be32a5ea42540bd8c85f33c68565258.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a54bf5c33e6ed1cc46931d5",
    "name": "BA International Business Administration at SRH",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "bachel-v37-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BAIBA_Clark_SRH_Germany_Brochure-e802c7f6d7df4c008570bfa89ca7365e.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "68a6edf26e724fa368e71e81",
    "name": "BSc Data Science (Hons) at LMU",
    "universityName": "London Metropolitan University",
    "programPackageKey": "bachel-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU-BS DS-968a15d1c5a343a195d54b4440ecd262.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8749",
    "name": "Masters in Data Analytics at RIT Dubai",
    "universityName": "Rochester Institute of Technology of Dubai",
    "programPackageKey": "master-v3-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/312/brochure/MPS_DA_RIT_DubaiA6WKZZ.pdf",
    "category": "Data Science",
    "country": "UAE"
  },
  {
    "id": "68b14a2bc38f68076c552ca7",
    "name": "MPS in Informatics at Northeastern University Canada",
    "universityName": "Northeastern University, Canada",
    "programPackageKey": "master-v6-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/162/brochure/mps_informatics_neu_canadaEC99ZM.pdf",
    "category": "Management",
    "country": "Canada"
  },
  {
    "id": "68b159f3c38f68076c702971",
    "name": "MS in Data Science at UMass Dartmouth",
    "universityName": "UMass Dartmouth",
    "programPackageKey": "masters-data-umassdartmouth-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-UMass-Dartmouth-17de0a62607b4d2ea233002825f3c37a.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/118/brochure/msds_umass0WPKT0.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68b17f65db576fc1541f321d",
    "name": "Master's in Data Analytics at RIT Dubai",
    "universityName": "Rochester Institute of Technology of Dubai",
    "programPackageKey": "master-v3-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/312/brochure/MPS_DA_RIT_DubaiA6WKZZ.pdf",
    "category": "Data Science",
    "country": "UAE"
  },
  {
    "id": "69fb2b3159e68049dd385458",
    "name": "BS in Analytics at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v1-sbusin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIA_NU_USA_Brochure-be25d738e13f400dafe6ee18d95197fe.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8740",
    "name": "MSc Business Intelligence and Data Science at ISM",
    "universityName": "International School of Management",
    "programPackageKey": "master-v16-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc Business Intelligence and Data Science (1)-53e8f28cfaa7496d9f5cf7a8254acf68.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "693c190ddbd3dcdbc674c767",
    "name": "MSc in Business Intelligence & Data Science ",
    "universityName": "International School of Management",
    "programPackageKey": "master-v16-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc Business Intelligence and Data Science (1)-53e8f28cfaa7496d9f5cf7a8254acf68.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "698ef8ad4f8f195fac6c0a44",
    "name": "BSc Data Science (Hons) at NU London",
    "universityName": "Northeastern University London",
    "programPackageKey": "bachel-v1-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-london-BSc Data Science (Hons) (1)-30c0bb57bb7a42d9b5857c72d87e705d.pdf",
    "category": "Data Science",
    "country": "United Kingdom"
  },
  {
    "id": "699438f8dc0516b727b126dc",
    "name": "MSc Applied Artificial Intelligence ",
    "universityName": "Northeastern University, London",
    "programPackageKey": "master-v27-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-London- MSc Applied Artificial Intelligence Brochure-6253b05295ef4b2aa7e794fa531584a1.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68e3dcc6ff6d0afae6f1e575",
    "name": "MS in Data Analytics Engineering at Northeastern University - College of Engineering",
    "universityName": "Northeastern University - College of Engineering",
    "programPackageKey": "master-v7-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
    "syllabusFileUrl": "",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8726",
    "name": "BSc Applied Data Science & Business Analytics, ISM",
    "universityName": "International School of Management",
    "programPackageKey": "bachel-v4-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/175/brochure/ISM_GGU_B_STEM_ProgramV006XN.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e2",
    "name": "MSc Business Intelligence & Data Science at ISM",
    "universityName": "International School of Management",
    "programPackageKey": "master-v99-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/284/brochure/mscbids_pgmp_ismC7MM9P.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870c",
    "name": "MPS in Informatics at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v1-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/154/brochure/mps_informatics_neu0B94VJ.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8717",
    "name": "MS DA at Clark University",
    "universityName": "Clark University",
    "programPackageKey": "masters-globaldata-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds_clark_university.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f871a",
    "name": "MS DAV at Yeshiva University",
    "universityName": "Yeshiva University",
    "programPackageKey": "masters-v4-globaldata-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/dav_yeshiva_university.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8720",
    "name": "MSc Business Intelligence & Data Science at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "masters-manage-ism-pp",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/111/brochure/ggu_ism_bids1RLSYP.pdf",
    "category": "AI & ML",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f86fc",
    "name": "MSc Data Analytics for Business at KEDGE, France",
    "universityName": "KEDGE Business School",
    "programPackageKey": "master-v61-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/243/brochure/mscda_franceQLSQA3.pdf",
    "category": "Data Science",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f8704",
    "name": "MS Data Science at UWF, Florida",
    "universityName": "University of West Florida",
    "programPackageKey": "masters-v1-data-uwf1-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-University-of-West-Florida-US-ab7ef22c2eb24bc89009a29476cc65fb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/77/brochure/UWF_MSDS_1_1IVQEV.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8707",
    "name": "MSc Data Science with Work Placement at Roehampton",
    "universityName": "University of Roehampton",
    "programPackageKey": "msc-v1-data-universityofroehampton-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-University-of-Roehampton-UK-17a141ef17ed4dadbf6f9c9ecdc585b0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/103/brochure/ds_roehamptonLMKPC0.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8708",
    "name": "MS Data Analytics at UNLV",
    "universityName": "University of Nevada, Las Vegas",
    "programPackageKey": "masters-data-universityofnevada-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-University-of-Nevada-Las-Vegas-988f399b29654bd2904593d8a68c8bba.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/115/brochure/msda_nevadaWTSTKQ.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86c0",
    "name": "MS DA at Touro University USA",
    "universityName": "Touro University",
    "programPackageKey": "master-v2-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Touro-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/300/brochure/MSDA_Touro6PHQND.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f871d",
    "name": "MSc in Data Analytics",
    "universityName": "Dundalk Institute of Technology",
    "programPackageKey": "masters-v7-data-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/1-Dundalk.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds_dkit.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f871f",
    "name": "MSc Data Engineering",
    "universityName": "Aivancity School for Technology, Business and Society",
    "programPackageKey": "master-v1-data-iiitb-upgra-astbs-psv2",
    "universityLogo": "/study-abroad/logos/1-Aivancity-School-for-Technology.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/133/brochure/msde_aivancityST9K03.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68b1959cdecfc573f00ddfa0",
    "name": "MS in Data Analytics",
    "universityName": "Touro University, Germany",
    "programPackageKey": "master-v17-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Touro-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/321/brochure/TU_Berlin_MS_DA_compressedIIX1OV.pdf",
    "category": "Data Science",
    "country": "Germany"
  },
  {
    "id": "68e60e6be5e3c16d4b06d1e3",
    "name": "BS Data Science at Colorado State, USA",
    "universityName": "Colorado State University",
    "programPackageKey": "bachel-softw-ggu-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Colorado.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "69fc34c9846671b5040ab67b",
    "name": "BS in Applied AI at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v2-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSAI_Brochure_Final-497d276993d649f78da6872f65106d95.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "69aa7211d84686bcac290aff",
    "name": "Universal AI Program by MIT",
    "universityName": " MIT Open Learning ",
    "programPackageKey": "certif-v28-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/MIT-sqaure-d4fb3cc150004e048d546eb13bd41910.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MIT UAI_Brochure-11de4a3858464d63899a9e1edd298dc5.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870d",
    "name": "MPS in Applied AI at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "master-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/155/brochure/mps_in_ami_neu30O1HD.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8711",
    "name": "MS Robotics and Autonomy at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-v3-softw-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/180/brochure/msras_drexel0UE7B0.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f871b",
    "name": "MS AI at Yeshiva University",
    "universityName": "Yeshiva University",
    "programPackageKey": "masters-v3-globaldata-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/ai_yeshiva_university.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870b",
    "name": "MS in Machine Learning Engineering at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-v1-data-iiitb-du-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/126/brochure/msmle_duTZMJZN.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68652f5e35106c62e354b8ab",
    "name": "MS AI at Touro University USA",
    "universityName": "Touro University",
    "programPackageKey": "master-sai&-upgra-v1-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Touro-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/301/brochure/Touro_University_MBAIVXXRQ.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f871e",
    "name": "MSc Artificial Intelligence Engineering",
    "universityName": "Aivancity School for Technology, Business and Society",
    "programPackageKey": "master-data-iiitb-upgra-astbs-psv2",
    "universityLogo": "/study-abroad/logos/1-Aivancity-School-for-Technology.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/132/brochure/msai_aivancityY95ASF.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "6a60a2315ef51d32a5025c6b",
    "name": "MSc Artificial Intelligence and Adaptive Systems ",
    "universityName": "University of Sussex",
    "programPackageKey": "master-v11-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc Artificial Intelligence and Adaptive Systems-827c0bb7bf7442c1b47e74f7e0476e44.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "695f5357b4d4a38934bf8aea",
    "name": "Youth Leadership Program with AI Concentration at upGrad",
    "universityName": "upGrad",
    "programPackageKey": "bachel-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/upGrad_square_logo-8f3c5af8edde4aacb07b14493150b187.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/LDP_AI_Brochure_New-4cce175256124c6db2c44c0aecdca1ea.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "6a0ae1a368e0bcddf119e823",
    "name": "Dual Master’s in Global Business and Artificial Intelligence",
    "universityName": "Northeastern University, London",
    "programPackageKey": "master-v8-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/NEU-london-sqaure-e2c3e8e543c0454e9cf4f92bed9da871.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU-NEU-London-Dual M GB&AI-d2262aab83a34b91b0b9c3c9b049bd1e.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "6a13f38d33a25f9ed77f1c70",
    "name": "MSc AI, Business Analytics & Cybersecurity at PSB France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v5-ssuppl-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/PSB_MSc%20AI_Business_Analytics%20_Cybersecurity-113e409992444c298812e4017e306ae4.pdf",
    "category": "AI & ML",
    "country": "France"
  },
  {
    "id": "6a4f5cf572b1c599f03717af",
    "name": "M.Sc. Applied Data Science & AI",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "master-v12-saian-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSC_ADS_AI_IIITB_SRH_Germany_Brochure-be0ecde682e7479ab5cf8165ec848716.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8747",
    "name": "BEngg. Digital Engineering at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "bachel-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_ism_germany.pdf",
    "category": "ENGINEERING",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f8748",
    "name": "MS Engineering Management at UMass Lowell",
    "universityName": "University of Massachusetts Lowell",
    "programPackageKey": "master-v31-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-University-of-Massachusetts-Lowell-2a9a3f77dac94202b189381edc028f55.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/311/brochure/UMASS_Lowell_MS_Engineering_Management4LLGTE.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8737",
    "name": "BS Mechanical Engineering at WSU, USA",
    "universityName": "Washington State University",
    "programPackageKey": "bachel-v4-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Washington-State-University-7ab176d6910440dd839048bc61b251ec.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8739",
    "name": "BS Astrophysics at IllinoisTech Chicago",
    "universityName": "Illinois Institute of Technology",
    "programPackageKey": "bachel-v2-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Illinois-Institute-of-Technology-1c0fb050c9994c19afdad565b95aab8e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f873b",
    "name": "BS Aerospace Engineering at IllinoisTech Chicago",
    "universityName": "Illinois Institute of Technology",
    "programPackageKey": "bachel-v3-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Illinois-Institute-of-Technology-1c0fb050c9994c19afdad565b95aab8e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68e4f19c61c754660b35c4b2",
    "name": "MS in Advanced and Intelligent Manufacturing at Northeastern University - College of Engineering",
    "universityName": "Northeastern University - College of Engineering",
    "programPackageKey": "master-v8-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/msaim_nu_coe_usa-dc278b72cd5c498e8441b6af762f5470.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68e4f3146a6a6e9d67cd6adb",
    "name": "MS in Industrial Engineering at Northeastern University - College of Engineering",
    "universityName": "Northeastern University - College of Engineering",
    "programPackageKey": "master-v9-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/msie_nu_coe_usa-22f6c6d5cb3f483ba83b3a0b25c4e669.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "69aff8337908f321645d8f96",
    "name": "MS Computer Engineering at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-v13-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/msce_drexel_brochure-5d1d77f8c2494e3c8133b5b9266d30e6.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68e60f46e5e3c16d4b078204",
    "name": "BS Food Science at Colorado State, USA",
    "universityName": "Colorado State University",
    "programPackageKey": "bachel-v10-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "6a4cae3e72b1c599f0e39c3e",
    "name": "MSc Robotics and Autonomous Systems at Sussex",
    "universityName": "University of Sussex",
    "programPackageKey": "master-v16-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Brochure_Sussex-MSc Robotics and Autonomous Systems-6ad31be931c049b3b931d4fa90c9e24a.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8712",
    "name": "MS in Civil Engineering at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-v13-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/182/brochure/msce_drexel017903.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "6a5f5d5c7ba40535ee6402d0",
    "name": "MSc Advanced Electronic and Electrical Engineering at Sussex",
    "universityName": "University of Sussex",
    "programPackageKey": "master-v17-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc%20Advanced%20Electronic%20and%20Electrical%20Engineering%20(1)-edd841abee414490aee881b82f77a4dd.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f873a",
    "name": "BS Computer Engineering at IllinoisTech Chicago",
    "universityName": "Illinois Institute of Technology",
    "programPackageKey": "bachel-softw-ggu-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Illinois-Institute-of-Technology.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8738",
    "name": "BS Neuroscience at WSU, USA",
    "universityName": "Washington State University",
    "programPackageKey": "bachel-v7-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Washington-State-University-7ab176d6910440dd839048bc61b251ec.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "696a127c874a8857c7c6984e",
    "name": " BS Biotechnology at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v6-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Health & Science",
    "country": "United States"
  },
  {
    "id": "696a0fdfd22b007fc8b0c812",
    "name": "BS Psychology at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v5-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e4",
    "name": "MSc Psychology & Management at ISM",
    "universityName": "International School of Management",
    "programPackageKey": "master-v2-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/IIMU_ISM_MSc_Psychology_Management-d4c5993fd9af4a2dae9350242ef83752.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e6",
    "name": "Master of Health Services Administration at UDM",
    "universityName": "University of Detroit Mercy",
    "programPackageKey": "master-v9-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-University-of-Detroit-Mercy-28b0b4833ff24fa0916113f4356fc00e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/290/brochure/MHSA_UDM_BrochureCUR5YE.pdf",
    "category": "Health & Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86e7",
    "name": "MHSA & MBA Dual Degree at University of Detroit",
    "universityName": "University of Detroit Mercy",
    "programPackageKey": "master-v12-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-University-of-Detroit-Mercy-28b0b4833ff24fa0916113f4356fc00e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/292/brochure/MHSA_MBA_UDM_Brochure9NLYXO.pdf",
    "category": "MBA",
    "country": "United States"
  },
  {
    "id": "6a018407846671b5047e67d2",
    "name": "BS in Health Services at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v2-shealt-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSHS_Brochure_Final-33d5af1d49364c10a51e4afc9981af6c.pdf",
    "category": "Health & Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8735",
    "name": "BS Biotechnology at Clark University, USA",
    "universityName": "Clark University",
    "programPackageKey": "bachel-softw-ggu-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Clark-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Health & Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8742",
    "name": "MSc Finance at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v3-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/287/brochure/imt_ism_mscfXO3RH7.pdf",
    "category": "Finance & Commerce",
    "country": "Germany"
  },
  {
    "id": "69afe9467908f3216442e6c5",
    "name": "Master in Finance (M.A.)",
    "universityName": "Munich Business School",
    "programPackageKey": "master-v3-sfinan-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Munich-Business-School-4ba5312f7ad34d09821ac75a143c3bff.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MBS_Master_in_Finance(MA)_IMTG_Brochure-bf0358b3f67b40968fca5286e0e14c87.pdf",
    "category": "Finance & Commerce",
    "country": "United States"
  },
  {
    "id": "69d6067c59e68049ddc8f53a",
    "name": "MSc Fintech Management at Northeastern London",
    "universityName": "Northeastern University, London",
    "programPackageKey": "master-v4-sfinan-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/NEU-London- MSc-FM-2c03059dca254966ba1e69dce3cb89e2.pdf",
    "category": "Management",
    "country": "United Kingdom"
  },
  {
    "id": "68654c5facd8a9c70e9f86e3",
    "name": "MSc Finance",
    "universityName": "International School of Management",
    "programPackageKey": "master-v3-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/287/brochure/imt_ism_mscfXO3RH7.pdf",
    "category": "Finance & Commerce",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f1",
    "name": "MSc Impact Finance & Fintech Management at ESDES France",
    "universityName": "ESDES Business School",
    "programPackageKey": "master-v9-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/169/brochure/msiffm_esdes_france2KH7HE.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86f6",
    "name": "MSc in International Corporate Finance at Excelia France",
    "universityName": "Excelia Business School",
    "programPackageKey": "master-v42-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/202/brochure/msc_icf_excelia_franceQFE6PH.pdf",
    "category": "Finance & Commerce",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86df",
    "name": "MS Quantitative Finance at Northeastern University",
    "universityName": "DAmore McKim School of Business Northeastern University",
    "programPackageKey": "master-v96-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/281/brochure/D_Amore_NU__MSQFOI3ZWD.pdf",
    "category": "Finance & Commerce",
    "country": "United States"
  },
  {
    "id": "6a1d645e75e63d422ee8138b",
    "name": "Master of Science in Finance at WHU",
    "universityName": "WHU - Otto Beisheim School of Management",
    "programPackageKey": "master-v8-sfinan-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-WHU-0918444e839a4368b4727f1f3d7055a7.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSIF_Brochure_WHU_Germany-dc9dacccfb754c9d82727be454820a61.pdf",
    "category": "Finance & Commerce",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86fb",
    "name": "MSc Banking & Finance at KEDGE, France",
    "universityName": "KEDGE Business School",
    "programPackageKey": "master-v60-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/242/brochure/msccf_kedge_franceGX0YXL.pdf",
    "category": "Finance & Commerce",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86ff",
    "name": "MS Fintech Management at Northeastern University",
    "universityName": "DAmore McKim School of Business Northeastern University",
    "programPackageKey": "master-v97-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/282/brochure/msfm_nu_dmsb_usa8KRGOY.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86c9",
    "name": "MSc in International Finance at PSB, France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v70-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/262/brochure/msc_if_psb_france76N0A6.pdf",
    "category": "Finance & Commerce",
    "country": "France"
  },
  {
    "id": "69eafa60a1aabd2524e94345",
    "name": "MSc International Finance at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-v5-sfinan-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCIF_EDC_FRANCE_BROCHURE_New-5059a74849b644eaa4d2fe47d90d24e7.pdf",
    "category": "Finance & Commerce",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8745",
    "name": "BSc Software Developement at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "bachel-v2-ssoftw-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-University-of-Applied-Management-a6b05c052834458bbebfb8ae2135030d.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_ism_germany.pdf",
    "category": "ENGINEERING",
    "country": "Germany"
  },
  {
    "id": "68a6e8d7502ae10165024f8b",
    "name": "BSc Computer Science (Hons) at LMU",
    "universityName": "London Metropolitan University",
    "programPackageKey": "bachel-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-London-Metropolitan-University-db0dca245ee44b00a3cbc9df2a5c357b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/LMU- BSCS_new-8505e78ab1a443a1aeeaf3004f02aeb2.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f872d",
    "name": "BS Computer Science at Colorado State, USA",
    "universityName": "Colorado State University",
    "programPackageKey": "bachel-v5-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Colorado-State-University-6c26eb14ff6c4f718ac884db09c04bf8.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8731",
    "name": "Bachelor of Computer Science at Algoma, Canada",
    "universityName": "Algoma University",
    "programPackageKey": "bachel-v6-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Algoma-University-fd2118bc6287414a83892c6e83b2e00e.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_program_canada.pdf",
    "category": "ENGINEERING",
    "country": "Canada"
  },
  {
    "id": "69579ec0874a8857c7e81be6",
    "name": "B.Sc. Software Engineering",
    "universityName": "Code University of Applied Sciences ",
    "programPackageKey": "bachel-v5-ssoftw-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Code-db4e01329a05423d865530f36c702404.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BSc_Software_Engineering_Brochure-ea83dbf91aac4ec5bd99bf9d30a755ed.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "698ad8664f8f195fac2452b0",
    "name": "BSc Computer Science & Business (Hons) at NU London",
    "universityName": "Northeastern University London",
    "programPackageKey": "bachel-v2-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSCCSB_NU_UK_Brochure-2b18c2e40a8e4638830199525863634b.pdf",
    "category": "ENGINEERING",
    "country": "United Kingdom"
  },
  {
    "id": "69a9450cf6400c91c77c17fe",
    "name": "BS Information Systems & Technology at NYU USA",
    "universityName": "New York University",
    "programPackageKey": "bachel-v2-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-New-York-University-313aaa1365ab414ba07a60f2752e850c.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/NYU-BSÂ Information Systems & Technology (3)-eedc2f43b990484bb53d32c0240dfc31.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68b1900cc38f68076cc50c28",
    "name": "MS CS at Yeshiva University",
    "universityName": "Yeshiva University",
    "programPackageKey": "master-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Yeshiva-University-82f3f430d4d649399f8bff496de7eedb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/306/brochure/YU_MSCSTLP51W.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68e5f4416a6a6e9d672adbad",
    "name": "BS IT at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v2-sinfor-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "691d70578248129399077fe4",
    "name": "BBA Business Information Technology",
    "universityName": "Haaga-Helia University of Applied Sciences",
    "programPackageKey": "bachel-v1-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Haaga-Helia-University-of-Applied-Sciences-dc0aad522ee84be495c36a7c4124707b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/HH_BBA_BIT-a6b4ae3383f4457da067b3aab08ffa4d.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8710",
    "name": "MS Computer Science at Clark University",
    "universityName": "Clark University",
    "programPackageKey": "master-v7-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/170/brochure/mscs_clark_usaJ0FS13.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8702",
    "name": "MS CS at TROY University",
    "universityName": "Troy University",
    "programPackageKey": "masters-data-troyuniversity-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Troy-University-US-ae39c342ec1343cca741f08965f7fceb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/72/brochure/tu_mscsT3Y87Z.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8706",
    "name": "MS CS at CityU Seattle",
    "universityName": "City University of Seattle",
    "programPackageKey": "masters-data-cityu-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-City-University-of-Seattle-US-0574cb047f7f4b44bdba53285fc5cefc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/94/brochure/cs_cityu3O2H8G.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a5f4e02771964625967f1c4",
    "name": "MSc Advanced Computer Science at Sussex",
    "universityName": "University of Sussex",
    "programPackageKey": "master-v11-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Base-IITB-SussexUniversity-f86f252ed5a24d989185943a95524003.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/Sussex-MSc Advanced Computer Science-9b7fd275337d47c3a28031f1918bc65d.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86c1",
    "name": "MS Computer Science 90 ECTS at UAM Germany",
    "universityName": "University of Applied Management",
    "programPackageKey": "master-v2-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-University-of-Applied-Management.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/295/brochure/mscs90ects_uam_germany_2_Q3TKQE.pdf",
    "category": "ENGINEERING",
    "country": "Germany"
  },
  {
    "id": "68654c5facd8a9c70e9f8736",
    "name": "BS Cybersecurity at Clark University, USA",
    "universityName": "Clark University",
    "programPackageKey": "bachel-softw-ggu-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Clark-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "6a212c055466337fc5c34d6a",
    "name": "BSc Computer Science at SIU",
    "universityName": "Schiller International University",
    "programPackageKey": "bachel-v4-scompu-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/GGU_SIU-5ae3f6c447ad462895fa29c8327ff2e0.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/SIU-BSc Computer Science-f61e464a0e1d4709be909b073e960cce.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "6888996aa83cce9f0d98547f",
    "name": "Bachelor of Information Technology at Macquarie University, Australia",
    "universityName": "Macquarie University",
    "programPackageKey": "bachel-v1-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/268/brochure/MacU_Bachelor_of_Information_TechnologyAK27J7.pdf",
    "category": "Bachelors",
    "country": "Australia"
  },
  {
    "id": "69fb38cd846671b504703d4c",
    "name": "BS in Information Technology at Northeastern University",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v1-sinfor-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Clark-NEU-578206499ce74c0c9b3dd8514d8ce94b.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/BSIT_NU_USA_Brochure-ce88f11f498c4bbb841c57edd00a9471.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "6a327fec50313d769357093a",
    "name": "BS in Cybersecurity at Touro",
    "universityName": "Touro University ",
    "programPackageKey": "bachel-scyber-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/GGU-touroberlin-3b15bc19bfe94f53b0652581d52bf5be.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/TU-Berlin-BS%20in%20Cybersecurity-0e7b699234fd4e00a1c3d6d0665a0f97.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8713",
    "name": "MS in Internet of Things at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-v4-softw-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/181/brochure/msit_drexel1NXBYZ.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8719",
    "name": "MS IT at Clark University",
    "universityName": "Clark University",
    "programPackageKey": "masters-v2-globaldata-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msit_clark_university.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8703",
    "name": "MS IT at UWF, Florida",
    "universityName": "University of West Florida",
    "programPackageKey": "masters-v2-data-uwf1-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-University-of-West-Florida-US-ab7ef22c2eb24bc89009a29476cc65fb.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/78/brochure/uwf_msitFYE53A.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8705",
    "name": "MS IT Management at Central Washington University",
    "universityName": "Central Washington University",
    "programPackageKey": "masters-data-centralwashington-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Central-Washington-University-b0d4b1676ada44bea9ddc2a43581dbf5.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/99/brochure/itam_cwuZ5CVNI.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8709",
    "name": "MS in Management Information Systems at UNLV",
    "universityName": "University of Nevada, Las Vegas",
    "programPackageKey": "masters-v1-data-universityofnevada-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-University-of-Nevada-Las-Vegas-988f399b29654bd2904593d8a68c8bba.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/117/brochure/mis_nevadaY7SSKC.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68889b85a83cce9f0d9be788",
    "name": "Bachelor of Business Analytics at Macquarie University, Australia",
    "universityName": "Macquarie University",
    "programPackageKey": "bachel-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Macquarie-University-febff2acbeaf48d2bf0f6a133f886dcc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/267/brochure/BachelorOfBusinessAnalytics_Macquarie_University7DAYPG.pdf",
    "category": "Data Science",
    "country": "Australia"
  },
  {
    "id": "68b17453db576fc154066abe",
    "name": "MPS in Analytics at Northeastern University Canada",
    "universityName": "Northeastern University, Canada",
    "programPackageKey": "master-v5-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/161/brochure/mps_in_analytics_neuFJMLBS.pdf",
    "category": "Data Science",
    "country": "Canada"
  },
  {
    "id": "68654c5facd8a9c70e9f873c",
    "name": "BS Analytics at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v6-sdata-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_GGU-Northeastern-University-b0fe4ec8e20b4b019ac0999e55234d80.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bs_ggu_nau_csu_usa.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f7",
    "name": "MSc Digital Business Analytics at EMLV France",
    "universityName": "EMLV Business School",
    "programPackageKey": "master-v40-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-EMLV-Business-School-b680e694f8cb4dab9e0d9b0c1eb77d58.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/203/brochure/mscdba_emlv_france3GIXGH.pdf",
    "category": "Data Science",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86e0",
    "name": "MS Business Analytics, Northeastern University",
    "universityName": "DAmore McKim School of Business Northeastern University",
    "programPackageKey": "master-v98-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/283/brochure/NEU_D_Amore_MS_Business_Analytics_PGMPVQNW52.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870f",
    "name": "MPS in Analytics at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v3-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/157/brochure/mps_in_analytics_neuRGN9C8.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86fe",
    "name": "MS Business Analytics at Northeastern University",
    "universityName": "DAmore McKim School of Business Northeastern University",
    "programPackageKey": "master-v93-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DAmore-McKim-School-of-Business-NU-1f3b432bdd9b4e019532a7939d8ae9bc.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/280/brochure/NEU_D_Amore_MS_Business_AnalyticsIDSJLX.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8701",
    "name": "MS Applied Data Science at Clarkson University",
    "universityName": "Clarkson University",
    "programPackageKey": "masters-data-clarkson-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Clarkson-University-9d86e49c816a45f281a69a423733e6f7.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/msds-clarkson.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86cb",
    "name": "MSc in Marketing Analytics and Data Intelligence at PSB France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v76-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/270/brochure/PSB_MSc_in_Marketing_Analytics_and_Data_Intelligence8MFWQX.pdf",
    "category": "AI & ML",
    "country": "France"
  },
  {
    "id": "69e72c2a12a515a3a7b8ab72",
    "name": "MSc AI in Business Analytics at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-sbusin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc AI in Business Analytics_compressed-46f61b30936b4ad7a588d4fa7fd71f21.pdf",
    "category": "AI & ML",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8741",
    "name": "MSc International Logistics & Supply Chain Management, ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v101-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-International-School-of-Management-938c78df8bc94ec8a25128e788528aad.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/285/brochure/ISM_MSc_IG_SCMSZJKV5.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "693c190610cf3da3cb988867",
    "name": "MSc International Logistics & Supply Chain Management",
    "universityName": "International School of Management",
    "programPackageKey": "master-v2-ssuppl-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/ISM-MSc IG & SCM (1)-c6c274a3d7d847ca8e14c656a9713cbd.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68cd543ac7be87eada82171f",
    "name": "MS Supply Chain Management at DePaul University",
    "universityName": "DePaul University",
    "programPackageKey": "master-ssuppl-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-DePaul-University-d32037d1a57847128e7087272c5f2044.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/DU-MSSCM-814bdbb4131a4ff98d0e62b0a85a57a1.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f0",
    "name": "MSc Circular Economy & Sustainable Innovation at ESDES France",
    "universityName": "ESDES Business School",
    "programPackageKey": "master-v10-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/168/brochure/mscesi_esdes_france8CTWJX.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86f5",
    "name": "MSc in Sustainable Global Supply Chain Management at Excelia",
    "universityName": "Excelia Business School",
    "programPackageKey": "master-v38-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/200/brochure/msc_sgscm_excelia_franceM74RO7.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86ce",
    "name": "MSc Supply Chain Management at PSB France",
    "universityName": "Paris School Of Business",
    "programPackageKey": "master-v14-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Paris-School-Of-Business.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/294/brochure/PSB_MSc_in_Supply_Chain_Management4P5OGZ.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86de",
    "name": "MSc Global Supply Chain Management at KEDGE France",
    "universityName": "KEDGE Business School",
    "programPackageKey": "master-v91-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/276/brochure/msc_gscm_pgmp_kedge_franceB7LSGG.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86fa",
    "name": "MSc Global Supply Chain Management at KEDGE, France",
    "universityName": "KEDGE Business School",
    "programPackageKey": "master-v55-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/239/brochure/msc_gscm_kedge_france82VCCM.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f8723",
    "name": "MSc International Logistics & Supply Chain Management at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v19-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_GGU-International-School-of-Management-c4af69877067450cb65641c8a2a008a0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/183/brochure/ggu_ism_mslscm81OV91.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "69eb0b63a1aabd2524f38ef6",
    "name": "MSc Supply Chain Strategy at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-v4-ssuppl-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/EDC-MSc Supply Chain Strategy_compressed-6eca47715cbb468588d5f3b51d650909.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8744",
    "name": "MPS Digital Media at Northeastern USA",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v28-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_MICA-Northeastern-University-189918c416d544e7abdeea22f979ecb4.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/307/brochure/mpsdm_neu_usa3PZOP4.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "698d67dadc0516b727358202",
    "name": "M.A. Strategic Marketing Management at ISM Germany",
    "universityName": "International School of Management",
    "programPackageKey": "master-v2-smarke-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/IIM-ISM-0354c1cd6f3f4876af1e00d908cf5b19.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MASMM_IIMU_ISM_Germany_Brochure-8b9d52abd0d64563a5ff6d75913a54d1.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "68d267712139326b21b90fb3",
    "name": "MA Digital Communication & Media Arts at DePaul University",
    "universityName": "DePaul University",
    "programPackageKey": "master-smarke-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_MICA-DePaul-University-d1991a68178b45c2abeb5369179eca18.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MICA-Depaul-MADCMA_-e6d3dd56bbdc461bb6784b2399117ee1.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f3",
    "name": "MSc Digital Marketing at Excelia",
    "universityName": "Excelia Business School",
    "programPackageKey": "master-v36-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Excelia-Business-School-dfb927b6fde449e6aa1fd89860234310.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/198/brochure/mscdm_excelia_franceZ7MKW2.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d2",
    "name": "MS in Digital Marketing and Media at Yeshiva University, USA",
    "universityName": "Yeshiva University",
    "programPackageKey": "master-v6-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_MICA-Yeshiva-University-1c497af040874480a59e3498e8903819.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/165/brochure/ms_in_dm_yeshivaE4T1AR.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86f9",
    "name": "MSc Marketing at KEDGE, France",
    "universityName": "KEDGE Business School",
    "programPackageKey": "master-v54-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-KEDGE-Business-School-105cda54b65640e5b902f3c0d87cad2b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/238/brochure/mscm_kedge_france33L19D.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68d3d0212139326b21a127f0",
    "name": "BS Digital Communication & Media at Northeastern USA",
    "universityName": "Northeastern University",
    "programPackageKey": "bachel-v2-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-Northeaster-University.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/bachelors_ggu_nau_csu_usa.pdf",
    "category": "Bachelors",
    "country": "United States"
  },
  {
    "id": "69e1ca3a846671b5047b3767",
    "name": "MSc Digital Marketing & Data Driven Strategy at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-v3-smarke-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCDMDDS_EDC_FRANCE_BROCHURE_New-9f2753473fc9491ca5cd017de2217d6f.pdf",
    "category": "Data Science",
    "country": "United States"
  },
  {
    "id": "68b14c27decfc573f0ac28cf",
    "name": "MS in Project Management at Northeastern University Canada",
    "universityName": "Northeastern University, Canada",
    "programPackageKey": "master-v4-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/159/brochure/mspm_neu_canadaI41BPL.pdf",
    "category": "Management",
    "country": "Canada"
  },
  {
    "id": "68b17b91db576fc154164424",
    "name": "Master's in Future Foresight and Planning at RIT Dubai",
    "universityName": "Rochester Institute of Technology of Dubai",
    "programPackageKey": "master-v3-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/316/brochure/RIT_Dubai_MPS_Future_Foresight_and_PlanningONYRFS.pdf",
    "category": "Management",
    "country": "UAE"
  },
  {
    "id": "68b17e58decfc573f0eae568",
    "name": "Master's in Smart Cities at RIT Dubai",
    "universityName": "Rochester Institute of Technology of Dubai",
    "programPackageKey": "master-v2-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Rochester-Institute-of-Technology-of-Dubai-35e654365d9c49018d016d692308ca96.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/315/brochure/RIT_Dubai_MPS_Smart_Cities57PUYB.pdf",
    "category": "Management",
    "country": "UAE"
  },
  {
    "id": "68b186d6c38f68076caf403d",
    "name": "MSc Project Management at Northeastern London",
    "universityName": "Northeastern University, London",
    "programPackageKey": "master-v32-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/314/brochure/MSc_PM_NU_UKWXEWZY.pdf",
    "category": "Management",
    "country": "United Kingdom"
  },
  {
    "id": "68b191adc38f68076cc8649d",
    "name": "MA Sustainable Urban Development",
    "universityName": "DePaul University",
    "programPackageKey": "master-v34-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-DePaul-University-8af5f32f1ba344adb54df62735be86bd.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/320/brochure/DU_MA_SUD_USA2QK8AN.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68b1a3304b8c118d72a795c3",
    "name": "MS in Project Management (Canada)",
    "universityName": "Northeastern University, Canada",
    "programPackageKey": "master-v18-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/176/brochure/NEU_IMT_MS_PM_CANADAW5PS29.pdf",
    "category": "Management",
    "country": "Canada"
  },
  {
    "id": "68e4f3f76a6a6e9d67cdd3b5",
    "name": "MS in Engineering Management at Northeastern University - College of Engineering",
    "universityName": "Northeastern University - College of Engineering",
    "programPackageKey": "master-v10-sengin-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Northeastern-University-College-of-Engineering-b4db15a34730427e8fb331f21f7d2b82.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/msem_nu_coe_usa-5ba18133d06b4e019c295d467e1dcf4a.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d7",
    "name": "MS in Engineering Management at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-manag-imt-du-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Drexel-University-80d98d07477f48bbb03e6ff59aa712a2.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/128/brochure/msem_drexel_imtg8PFJPK.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86d9",
    "name": "MS in Project Management (USA)",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v17-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Northeastern-University-98e43274fd3c44489a47b07927687037.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/177/brochure/NEU_IMT_MS_PM_USA7I5M4K.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f8718",
    "name": "MS PM at Clark University",
    "universityName": "Clark University",
    "programPackageKey": "masters-v1-globaldata-iiitb-upgrad-pp",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Clark-db4da097fe1f4d36aae97fd9a72d68c0.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/brouchers/mspm_clark_university.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870e",
    "name": "MS in Project Management at Northeastern University USA",
    "universityName": "Northeastern University",
    "programPackageKey": "master-v2-data-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IITB-Northeastern-University-5c891bc252fc46518347f8488c7fb532.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/156/brochure/mspm_neuV66XCR.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f870a",
    "name": "MS Engineering Management at Drexel University",
    "universityName": "Drexel University",
    "programPackageKey": "master-data-iiitb-du-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IIITB-Drexel-University-b6d0ce29b0d841a1bc44a46e3d5c4a5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/125/brochure/DU_MS_EMECLIJH.pdf",
    "category": "ENGINEERING",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86fd",
    "name": "MS Technology Leadership & PM, Touro University",
    "universityName": "Touro University",
    "programPackageKey": "master-v87-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-Touro-University-df406223ff084aa9bd70c044e1ed5d5b.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/289/brochure/Touro_MS_TL_PMUZDL66.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a46167572ddd6939076da98",
    "name": "M.Sc. Technology & Management",
    "universityName": "Code University of Applied Sciences",
    "programPackageKey": "master-v5-sproje-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_IMTG_MSc Technology_Management-9408f59851b9484c9b825a288698f654.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "68654c5facd8a9c70e9f86ef",
    "name": "MSc Sustainable Tourism & Event Management at ESDES France",
    "universityName": "ESDES Business School",
    "programPackageKey": "master-v8-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/Uni_IMTG-ESDES-Business-School-ed8580a1ffa5439dbd8795eb575d882a.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/167/brochure/msstem_esdes_franceSRBNP9.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "68654c5facd8a9c70e9f86c7",
    "name": "MA International Hospitality Management at SRH Germany",
    "universityName": "SRH University of Applied Sciences",
    "programPackageKey": "master-v24-smanag-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/1-SRH-University-of-Applied-Sciences.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/305/brochure/SRH_MAIHM_GermanyB238NY.pdf",
    "category": "Management",
    "country": "Germany"
  },
  {
    "id": "68b15504c38f68076c67b049",
    "name": "MSc in International Hospitality at Excelia, France",
    "universityName": "Excelia Tourism School",
    "programPackageKey": "master-v44-manag-upgra-psv2",
    "universityLogo": "/study-abroad/logos/1-Excelia-Business-School.svg",
    "syllabusFileUrl": "https://upgrad-abroad-files.s3.ap-south-1.amazonaws.com/pathway/204/brochure/msc_ih_excelia_franceLXHS6J.pdf",
    "category": "Management",
    "country": "France"
  },
  {
    "id": "69e9eabe59e68049ddabd8fe",
    "name": "MSc Hospitality & Tourism Management at EDC Paris Business School",
    "universityName": "EDC Paris Business School",
    "programPackageKey": "master-v1-shospi-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/EDC-sqaure-blue-8592326521564c6b961e11764de05571.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/MSCHTM_EDC_FRANCE_BROCHURE_New-57715e02f0844c25be3368b764f1b944.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a475191cac4a6ad2a880404",
    "name": "B.A. Digital Design & Innovation",
    "universityName": "Code University of Applied Sciences ",
    "programPackageKey": "bachel-sdesig-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_GGU_BADDI_Germany_Brochure%20(2)-4ef752e1fb1247869314f0e4d8e1c75e.pdf",
    "category": "Management",
    "country": "United States"
  },
  {
    "id": "6a4768e472ddd693900d2109",
    "name": "M.A. Innovation Design",
    "universityName": "Code University of Applied Sciences",
    "programPackageKey": "master-sdesig-upgra-spa-bl",
    "universityLogo": "/study-abroad/logos/CODE-Sqaure-9ffbd2600e994834a16a2b22c718e7f5.svg",
    "syllabusFileUrl": "https://d2o2utebsixu4k.cloudfront.net/CODE_IMTG_MA Innovation Design-6506753e7a084580a1fb181d53a4b26a.pdf",
    "category": "Management",
    "country": "United States"
  }
];
