/**
 * Per-program facts for the pathway listing cards: durations (in months),
 * tuition fees (display strings, as published), and post-study work visa
 * months. Keyed by the catalog's programPackageKey.
 *
 * Extracted ONCE from the source platform's public pathway service on
 * 2026-08-24 (the same one-time extraction that produced studyAbroadData.js)
 * and stored here — nothing fetches at runtime. 184 of the catalog's 197
 * keys matched; cards for the rest simply omit these lines. The keys contain
 * the source's own -upgra- fragments; like the catalog's programPackageKey,
 * they are never rendered or linked.
 */
export const pathwayProgramDetails = {
  "bachel-data-upgra-psv2": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,00,000",
    "campusFee": "AUD 43,200 per annum",
    "visaMonths": 36
  },
  "bachel-scyber-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 33,600",
    "visaMonths": 18
  },
  "bachel-sdata-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,000",
    "campusFee": "GBP 33,000",
    "visaMonths": 24
  },
  "bachel-sdesig-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 37,500",
    "visaMonths": 18
  },
  "bachel-sengin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 9,000 Per annum",
    "visaMonths": 18
  },
  "bachel-softw-ggu-upgra-psv2": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 24,500 per annum",
    "visaMonths": 36
  },
  "bachel-v1-data-upgra-psv2": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,00,000",
    "campusFee": "AUD 42,600 per annum",
    "visaMonths": 36
  },
  "bachel-v1-manag-ggu-upgra-psv2": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "EUR 11,100 per annum",
    "visaMonths": 60
  },
  "bachel-v1-sbache-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "CAD 21,600 per annum",
    "visaMonths": 36
  },
  "bachel-v1-sbusin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 508,000",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v1-scompu-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,000",
    "campusFee": "EUR 27,500",
    "visaMonths": 24
  },
  "bachel-v1-sdata-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "GBP 40,000",
    "visaMonths": 24
  },
  "bachel-v1-sinfor-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 508,000",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v10-shealt-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 32,984 per annum",
    "visaMonths": 36
  },
  "bachel-v12-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 34,500",
    "visaMonths": 18
  },
  "bachel-v16-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "GBP 40,000",
    "visaMonths": 24
  },
  "bachel-v18-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 7,05,000",
    "campusFee": "USD 37,202",
    "visaMonths": 12
  },
  "bachel-v2-saian-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 508,000",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v2-sbache-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 32,984 per annum",
    "visaMonths": 12
  },
  "bachel-v2-scompu-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "GBP 40,000",
    "visaMonths": 24
  },
  "bachel-v2-sdata-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 7,05,000",
    "campusFee": "USD 37,202",
    "visaMonths": 36
  },
  "bachel-v2-sengin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 24,500 Per annum",
    "visaMonths": 36
  },
  "bachel-v2-shealt-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,000",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v2-sinfor-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 16,230 per annum",
    "visaMonths": 36
  },
  "bachel-v2-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 16,230 per annum",
    "visaMonths": 36
  },
  "bachel-v2-ssoftw-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 9,000 Per annum",
    "visaMonths": 18
  },
  "bachel-v20-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 27,500",
    "visaMonths": 24
  },
  "bachel-v21-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 27,500",
    "visaMonths": 24
  },
  "bachel-v24-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 508,000",
    "campusFee": "USD 48,690",
    "visaMonths": 12
  },
  "bachel-v27-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 23,130",
    "visaMonths": 18
  },
  "bachel-v29-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 9,552 per annum",
    "visaMonths": 18
  },
  "bachel-v3-sengin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 24,500 per annum",
    "visaMonths": 36
  },
  "bachel-v3-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 9,000 per annum",
    "visaMonths": 18
  },
  "bachel-v30-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 16,230 per annum",
    "visaMonths": 12
  },
  "bachel-v37-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 23,000",
    "visaMonths": 18
  },
  "bachel-v4-manag-upgra-psv2": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,00,000",
    "campusFee": "AUD 43,200 per annum",
    "visaMonths": 24
  },
  "bachel-v4-scompu-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 23,130",
    "visaMonths": 18
  },
  "bachel-v4-sdata-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 9,552 Per annum",
    "visaMonths": 18
  },
  "bachel-v4-sengin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 29,000 Per annum",
    "visaMonths": 36
  },
  "bachel-v5-scompu-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 32,984 per annum",
    "visaMonths": 36
  },
  "bachel-v5-shealt-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v5-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,000",
    "campusFee": "GBP 33,000",
    "visaMonths": 24
  },
  "bachel-v5-ssoftw-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 30,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 34,500",
    "visaMonths": 18
  },
  "bachel-v6-scompu-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "CAD 21,600 per annum",
    "visaMonths": 36
  },
  "bachel-v6-shealt-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500",
    "campusFee": "USD 48,690",
    "visaMonths": 36
  },
  "bachel-v7-shealt-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 36,
    "onlineFee": "INR 5,08,500 per annum",
    "campusFee": "USD 29,000 per annum",
    "visaMonths": 36
  },
  "bachel-v8-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "AUD 64,904",
    "visaMonths": 36
  },
  "bachel-v9-smanag-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 24,
    "onlineFee": "INR 5,08,500",
    "campusFee": "AUD 64,864",
    "visaMonths": 36
  },
  "master-data-iiitb-du-psv2": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 29,000",
    "visaMonths": 36
  },
  "master-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 39,950",
    "visaMonths": 36
  },
  "master-manag-imt-du-psv2": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 31,350",
    "visaMonths": 36
  },
  "master-sai&-upgra-v1-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 9,
    "onlineFee": "INR 5,65,500",
    "campusFee": "USD 15,750",
    "visaMonths": 36
  },
  "master-sbusin-upgra-spa-bl": {
    "onlineMonths": 5,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-scompu-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 450,000",
    "campusFee": "USD 30,000",
    "visaMonths": 36
  },
  "master-sdesig-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 22,312",
    "visaMonths": 18
  },
  "master-smarke-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 450,000",
    "campusFee": "USD 36,245",
    "visaMonths": 36
  },
  "master-ssuppl-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 35,112",
    "visaMonths": 36
  },
  "master-v1-data-iiitb-du-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 33,750",
    "visaMonths": 36
  },
  "master-v1-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 34,386",
    "visaMonths": 36
  },
  "master-v1-shospi-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-v1-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,65,500",
    "campusFee": "USD 29,350",
    "visaMonths": 36
  },
  "master-v10-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 13,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,510",
    "visaMonths": 60
  },
  "master-v10-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 40,740",
    "visaMonths": 36
  },
  "master-v10-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 13,200",
    "visaMonths": 18
  },
  "master-v100-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v101-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v108-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 30,300",
    "visaMonths": 18
  },
  "master-v11-saian-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "GBP 19,995",
    "visaMonths": 18
  },
  "master-v11-scompu-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "GBP 17,995",
    "visaMonths": 18
  },
  "master-v12-saian-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 18,
    "onlineFee": "4,50,000",
    "campusFee": "EUR 20,575",
    "visaMonths": 18
  },
  "master-v12-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 24,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 44,429",
    "visaMonths": 12
  },
  "master-v13-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 33,750",
    "visaMonths": 36
  },
  "master-v13-sengin-upgra-spa-bl": {
    "onlineMonths": 12,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 32,878",
    "visaMonths": 36
  },
  "master-v14-smanag-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,717",
    "visaMonths": 24
  },
  "master-v16-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "CAD 25,875",
    "visaMonths": 36
  },
  "master-v16-sdata-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 16,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 16
  },
  "master-v16-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "GBP 19,995",
    "visaMonths": 18
  },
  "master-v17-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 29,667",
    "visaMonths": 36
  },
  "master-v17-sdata-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 9,
    "onlineFee": "INR 5,08,500",
    "campusFee": "EUR 8,400",
    "visaMonths": 18
  },
  "master-v17-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "4,50,000",
    "campusFee": "GBP 17,995",
    "visaMonths": 18
  },
  "master-v18-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "CAD 32,439",
    "visaMonths": 36
  },
  "master-v18-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 6,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 5,767",
    "visaMonths": 18
  },
  "master-v19-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 15,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v19-smba-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 43,180",
    "visaMonths": 36
  },
  "master-v2-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 31,104",
    "visaMonths": 36
  },
  "master-v2-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 26,961",
    "visaMonths": 12
  },
  "master-v2-scompu-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 11,535",
    "visaMonths": 18
  },
  "master-v2-sdata-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 9,
    "onlineFee": "INR 5,65,500",
    "campusFee": "USD 15,750",
    "visaMonths": 36
  },
  "master-v2-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,00,000",
    "campusFee": "AED 73,080",
    "visaMonths": null
  },
  "master-v2-shealt-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 16,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v2-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v2-smarke-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 16,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v2-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 15,800",
    "visaMonths": 18
  },
  "master-v2-ssuppl-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 16,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v20-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 11,535",
    "visaMonths": 18
  },
  "master-v20-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 16,620",
    "visaMonths": 18
  },
  "master-v21-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 5,00,000",
    "campusFee": "EUR 17,250",
    "visaMonths": 18
  },
  "master-v23-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v24-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 5,00,000",
    "campusFee": "EUR 17,250",
    "visaMonths": 18
  },
  "master-v24-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 6,
    "onlineFee": "5,25,000",
    "campusFee": "EUR 13,600",
    "visaMonths": 18
  },
  "master-v26-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 9,920",
    "visaMonths": 9
  },
  "master-v26-smba-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "33 K",
    "visaMonths": 36
  },
  "master-v27-sdata-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "GBP 18,376",
    "visaMonths": 24
  },
  "master-v28-smanag-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 35,772",
    "visaMonths": 36
  },
  "master-v3-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 35,409",
    "visaMonths": 36
  },
  "master-v3-sdata-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,00,000",
    "campusFee": "AED 70,200",
    "visaMonths": 60
  },
  "master-v3-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,00,000",
    "campusFee": "AED 70,200",
    "visaMonths": null
  },
  "master-v3-sfinan-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "5,25,000",
    "campusFee": "EUR 19,000",
    "visaMonths": 18
  },
  "master-v3-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v3-smarke-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-v3-softw-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 33,750",
    "visaMonths": 36
  },
  "master-v31-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 18,100",
    "visaMonths": 36
  },
  "master-v32-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "GBP 17,900",
    "visaMonths": 24
  },
  "master-v33-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 21,
    "onlineFee": "INR 4,07,000",
    "campusFee": "GBP 13,900",
    "visaMonths": 24
  },
  "master-v33-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "GBP 17,900",
    "visaMonths": 24
  },
  "master-v34-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 21,
    "onlineFee": "INR 4,07,000",
    "campusFee": "GBP 13,233",
    "visaMonths": 24
  },
  "master-v34-smanag-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 19,520",
    "visaMonths": 36
  },
  "master-v36-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 14,580",
    "visaMonths": 60
  },
  "master-v38-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 14,580",
    "visaMonths": 60
  },
  "master-v39-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 11,500",
    "visaMonths": 24
  },
  "master-v4-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "CAD 35,388",
    "visaMonths": 36
  },
  "master-v4-sfinan-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "GBP 18,376",
    "visaMonths": 24
  },
  "master-v4-softw-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 33,750",
    "visaMonths": 36
  },
  "master-v4-ssuppl-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-v40-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 10,800",
    "visaMonths": 60
  },
  "master-v41-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 10,800",
    "visaMonths": 60
  },
  "master-v42-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 14,580",
    "visaMonths": 60
  },
  "master-v44-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 14,310",
    "visaMonths": 60
  },
  "master-v5-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "CAD 35,904",
    "visaMonths": 36
  },
  "master-v5-sfinan-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-v5-sproje-upgra-spa-bl": {
    "onlineMonths": 0,
    "campusMonths": 18,
    "onlineFee": "4,50,000",
    "campusFee": "EUR 22,312",
    "visaMonths": 18
  },
  "master-v5-ssuppl-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,717",
    "visaMonths": 24
  },
  "master-v54-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 14,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,400",
    "visaMonths": 24
  },
  "master-v54-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 16,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "master-v55-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 14,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 20,400",
    "visaMonths": 24
  },
  "master-v57-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 30,300",
    "visaMonths": 18
  },
  "master-v58-manag-upgra-psv2": {
    "onlineMonths": 4,
    "campusMonths": 9,
    "onlineFee": "INR 400,000",
    "campusFee": "USD 16,800",
    "visaMonths": 36
  },
  "master-v6-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "CAD 34,386",
    "visaMonths": 36
  },
  "master-v6-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 30,000",
    "visaMonths": 36
  },
  "master-v60-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 14,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,400",
    "visaMonths": 24
  },
  "master-v61-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 14,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,400",
    "visaMonths": 24
  },
  "master-v68-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 7,
    "onlineFee": "INR 4,50,000",
    "campusFee": "GBP 12,000",
    "visaMonths": 24
  },
  "master-v7-data-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 22,126",
    "visaMonths": 36
  },
  "master-v7-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 40,740",
    "visaMonths": 36
  },
  "master-v70-manag-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,717",
    "visaMonths": 24
  },
  "master-v74-smanag-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,000",
    "visaMonths": 24
  },
  "master-v76-manag-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,717",
    "visaMonths": 24
  },
  "master-v77-manag-upgra-psv2": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,700",
    "visaMonths": 24
  },
  "master-v8-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 13,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,860",
    "visaMonths": 60
  },
  "master-v8-saian-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "GBP 22,295",
    "visaMonths": 18
  },
  "master-v8-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 40,740",
    "visaMonths": 36
  },
  "master-v8-sfinan-upgra-spa-bl": {
    "onlineMonths": 6,
    "campusMonths": 18,
    "onlineFee": "INR 5,25,000",
    "campusFee": "EUR 30,300",
    "visaMonths": 18
  },
  "master-v87-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 25,440",
    "visaMonths": 36
  },
  "master-v88-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 18,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 83,536",
    "visaMonths": 12
  },
  "master-v9-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 13,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 12,510",
    "visaMonths": 60
  },
  "master-v9-sengin-upgra-spa-bl": {
    "onlineMonths": 8,
    "campusMonths": 15,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 40,740",
    "visaMonths": 36
  },
  "master-v9-smanag-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 26,016",
    "visaMonths": 12
  },
  "master-v9-smba-upgra-spa-bl": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 13,500",
    "visaMonths": 24
  },
  "master-v93-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 9,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 38,136",
    "visaMonths": 36
  },
  "master-v96-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 38,136",
    "visaMonths": 36
  },
  "master-v97-manag-upgra-psv2": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 38,136",
    "visaMonths": 36
  },
  "master-v98-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 9,
    "onlineFee": "INR 5,25,000",
    "campusFee": "USD 38,136",
    "visaMonths": 36
  },
  "master-v99-manag-upgra-psv2": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "masters-data-centralwashington-pp": {
    "onlineMonths": 8,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 27,000",
    "visaMonths": 36
  },
  "masters-data-cityu-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 25,950",
    "visaMonths": 36
  },
  "masters-data-clarkson-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 26,865",
    "visaMonths": 36
  },
  "masters-data-troyuniversity-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 14,250",
    "visaMonths": 36
  },
  "masters-data-umassdartmouth-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 30,253",
    "visaMonths": 36
  },
  "masters-globaldata-iiitb-upgrad-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 22,400 (Indicative)",
    "visaMonths": 36
  },
  "masters-manage-clarkuniversity-pp": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 23,280",
    "visaMonths": 36
  },
  "masters-manage-ism-pp": {
    "onlineMonths": 7,
    "campusMonths": 16,
    "onlineFee": "INR 4,50,000",
    "campusFee": "EUR 17,052",
    "visaMonths": 18
  },
  "masters-management-cityu-pp": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 19,500",
    "visaMonths": 12
  },
  "masters-management-clarkson-pp": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 27,855",
    "visaMonths": 36
  },
  "masters-management-ism-pp": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "Euro 16,620 (including thesis)",
    "visaMonths": 18
  },
  "masters-v1-data-uwf1-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 21,777",
    "visaMonths": 36
  },
  "masters-v1-globaldata-iiitb-upgrad-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 22,400 (Indicative)",
    "visaMonths": 36
  },
  "masters-v2-data-uwf1-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 21,777",
    "visaMonths": 36
  },
  "masters-v2-globaldata-iiitb-upgrad-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 22,400 (Indicative)",
    "visaMonths": 36
  },
  "masters-v3-globaldata-iiitb-upgrad-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 30,000",
    "visaMonths": 36
  },
  "masters-v4-globaldata-iiitb-upgrad-pp": {
    "onlineMonths": 8,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 30,000",
    "visaMonths": 36
  },
  "mba-management-upgrad-pp": {
    "onlineMonths": 11,
    "campusMonths": 15,
    "onlineFee": "INR 4,50,000",
    "campusFee": "CAD $29,799",
    "visaMonths": 36
  },
  "mba-management-uticauniversity-pp": {
    "onlineMonths": 7,
    "campusMonths": 12,
    "onlineFee": "INR 4,50,000",
    "campusFee": "USD 14,700",
    "visaMonths": 36
  },
  "msc-v1-data-universityofroehampton-pp": {
    "onlineMonths": 8,
    "campusMonths": 21,
    "onlineFee": "INR 4,07,000",
    "campusFee": "GBP 12,900",
    "visaMonths": 24
  },
  "msc-v1-management-stmarys-pp": {
    "onlineMonths": 11,
    "campusMonths": 12,
    "onlineFee": "INR 4,07,000",
    "campusFee": "GBP 15,300",
    "visaMonths": 24
  }
};
