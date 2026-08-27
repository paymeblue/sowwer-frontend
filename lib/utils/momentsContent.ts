// The 2025-2026 outreach record.
//
// Every figure, date, theme and partner name below is taken from the four
// SOOWER newsletters in public/assets/newsletters (Vol 1 Issues 1-3 and
// Vol 2 Issue 1). Photography is the foundation's own, processed out of the
// raw drive dumps and hosted on S3 alongside the rest of the landing media.
//
// Foundation Launch, EMOG Zaria and the Trauma Care Training were originally
// marked as having no surviving photography. That was wrong — the newsletter
// PDFs have the photos embedded at full resolution, just never exported as
// standalone files. Extracted directly from the PDF image streams (pymupdf)
// and reprocessed here.

const GALLERY_BASE =
  "https://soower-landing-media.s3.amazonaws.com/events-2025-2026/gallery";

const gallery = (slug: string, alts: string[]) =>
  alts.map((alt, i) => ({
    src: `${GALLERY_BASE}/${slug}/g-${String(i + 1).padStart(2, "0")}.jpg`,
    alt,
  }));

const heroFor = (slug: string) => `${GALLERY_BASE}/${slug}/hero.jpg`;

export type MomentFact = { value: string; label: string };

export type Moment = {
  slug: string;
  date: string;
  dateISO: string;
  year: string;
  location: string;
  title: string;
  kicker: string;
  theme: string | null;
  blurb: string;
  hero: string | null;
  heroAlt: string;
  intro: string;
  body: string[];
  facts: MomentFact[];
  partners: string[];
  gallery: { src: string; alt: string }[];
  quote: { text: string; source: string } | null;
};

export const moments: Moment[] = [
  {
    slug: "foundation-launch",
    date: "May 7, 2025",
    dateISO: "2025-05-07",
    year: "2025",
    location: "NAF Conference Centre, Kado, Abuja",
    title: "Foundation Launch",
    kicker: "Launch",
    theme: "30, 60 & 100-Fold — Mark 4:8",
    blurb:
      "SOOWER launched to 250+ guests — faith leaders, partners and beneficiaries — under the theme '30, 60 & 100-Fold'.",
    hero: heroFor("foundation-launch"),
    heroAlt:
      "Dr. Cosmas Maduka, CON, Chairman of Coscharis Group, addressing the SOOWER Foundation launch",
    intro:
      "The day SOOWER Widows and Missions Foundation formally began its work — since designated 'SOOWER Day' by the organisation.",
    body: [
      "On May 7, 2025, SOOWER Foundation officially launched in the presence of over 250 distinguished guests. The day comprised a Businessmen's Breakfast Meeting followed by the formal launch ceremony, chaired by Dr. Cosmas Maduka, CON, Chairman and Founder of Coscharis Group.",
      "Pastor Sarah Omakwu of Family Worship Centre, President of Family Ministries International, served as Chief Host through representation, with the Head of the Civil Service of the Federation, Mrs. Didi Esther Walson-Jack, OON, mni, likewise represented as Special Guest of Honour.",
      "Prof. Mrs. Vehcit Dashe delivered the keynote on the power of the seed, the quality of the soil and the guarantee of growth — whether one is a widow, a minister, a donor or someone in need. Widows and missionaries gave testimony, and the day closed with music, drama, prayer and an outpouring of community support.",
      "The launch was not simply a beginning. It was a declaration of purpose: to bring support to widows, orphans and those serving in the mission fields. The date has been designated 'SOOWER Day' and marks the formal commencement of the foundation's work.",
    ],
    facts: [
      { value: "250+", label: "Guests in attendance" },
      { value: "4", label: "Programmes announced" },
      { value: "SOOWER Day", label: "Designated in the calendar" },
    ],
    partners: ["Coscharis Group", "Family Worship Centre"],
    gallery: gallery("foundation-launch", [
      "Dr. Cosmas Maduka, CON, Chairman of Coscharis Group, being interviewed on stage at the SOOWER launch",
      "Mrs. Didi Esther Walson-Jack, OON, addressing guests at the podium beneath the SOOWER banner",
      "Guests seated at the SOOWER Foundation launch, NAF Conference Centre, Abuja",
    ]),
    quote: {
      text: "Our official launch event was not just a beginning — it was a declaration of purpose: to bring support to widows, orphans and those serving in the mission fields.",
      source: "Mr. Jonathan Agwunobi, Chairman & Co-Founder",
    },
  },
  {
    slug: "fwc-medical-outreach",
    date: "July 12, 2025",
    dateISO: "2025-07-12",
    year: "2025",
    location: "Family Worship Centre, Abuja",
    title: "Mid-Year Missions Conference",
    kicker: "Healthcare",
    theme: null,
    blurb:
      "Free HPV and cholesterol screenings for 120+ missionaries and widows, in partnership with FWC's Missions Department.",
    hero: heroFor("fwc-medical-outreach"),
    heroAlt:
      "A clinician screening a widow beneath the SOOWER banner at the FWC Mid-Year Missions Conference",
    intro:
      "Preventive healthcare brought directly to the people who spend their lives caring for everyone else.",
    body: [
      "At the FWC Mid-Year Missions Conference on July 12, 2025, over 120 missionaries and widows received free HPV and cholesterol screenings sponsored by SOOWER Foundation.",
      "Missionaries and widows are rarely the first in line for their own healthcare. Screening stations were set up on site — height and weight, blood pressure, blood samples for cholesterol, HPV testing — so that care met people where they already were rather than asking them to find a clinic and a fare.",
      "The initiative promoted preventive healthcare and embodied SOOWER's holistic mission: wellness of spirit, soul and body. Many participants described the medical outreach as 'life-saving and timely'.",
    ],
    facts: [
      { value: "120+", label: "Missionaries & widows screened" },
      { value: "2", label: "Screening programmes: HPV & cholesterol" },
      { value: "Free", label: "Cost to every participant" },
    ],
    partners: ["Family Worship Centre Missions Department", "SYNLAB"],
    gallery: gallery("fwc-medical-outreach", [
      "A widow being screened by a clinician at the outreach",
      "A missionary having his height measured at the check-in station",
      "Blood samples taken for cholesterol screening",
      "A participant being measured before her screening",
      "Screening under way beneath the SOOWER banner",
      "A clinician drawing a sample for testing",
      "A missionary waiting to be seen at the outreach",
      "Vitals recorded at the SOOWER-sponsored medical station",
    ]),
    quote: {
      text: "Life-saving and timely.",
      source: "How participants described the medical outreach",
    },
  },
  {
    slug: "emog-zaria",
    date: "August 2, 2025",
    dateISO: "2025-08-02",
    year: "2025",
    location: "Excellence Ministry of Grace, Zaria",
    title: "EMOG 18th Anniversary",
    kicker: "Welfare",
    theme: "Jesus the Game Changer",
    blurb:
      "200 widows received wrappers and 150 orphaned children received footwear — 350 beneficiaries reached in a single day.",
    hero: heroFor("emog-zaria"),
    heroAlt:
      "A widow in a green dress receiving a wrapper at the EMOG 18th anniversary in Zaria",
    intro:
      "A partnership day in Zaria that put practical compassion ahead of ceremony.",
    body: [
      "On August 2, 2025, SOOWER partnered with Excellence Ministry of Grace (EMOG), Zaria, during its 18th anniversary themed 'Jesus the Game Changer'.",
      "Through the collaboration, 200 widows received new wrappers and 150 orphans received footwear, along with warm meals and faith-based encouragement.",
      "Participants shared testimonies of renewed confidence and faith. Several expressed a desire to return to school or learn new skills — the kind of outcome that a wrapper or a pair of shoes only hints at, and that the monthly stipend programme exists to carry forward.",
      "The partnership highlights SOOWER's commitment to demonstrating God's love through practical acts of compassion.",
    ],
    facts: [
      { value: "200", label: "Widows received wrappers" },
      { value: "150", label: "Orphaned children received footwear" },
      { value: "18th", label: "EMOG anniversary marked" },
    ],
    partners: ["Excellence Ministry of Grace (EMOG), Zaria"],
    gallery: [],
    quote: {
      text: "Some expressed a desire to return to school or learn new skills.",
      source: "SOOWER Newsletter, Vol 1 Issue 2",
    },
  },
  {
    slug: "slum-to-school",
    date: "September 9, 2025",
    dateISO: "2025-09-09",
    year: "2025",
    location: "LEA Primary School, Mabushi, Abuja",
    title: "Slum-to-School, 5th Year",
    kicker: "Education",
    theme: "Community Empowerment and Educational Access",
    blurb:
      "Backpacks, uniforms and enrolment fees for children returning to school, marking five years of the project.",
    hero: heroFor("slum-to-school"),
    heroAlt:
      "Pupils in uniform gathered for the Slum-to-School fifth-year celebration in Mabushi, Abuja",
    intro:
      "Five years, 500 children, and a partnership that turned a pilot into an institution.",
    body: [
      "In September 2025, the Regy & Henry Amazing Grace Foundation (RHAGF) celebrated five years of the Slum-to-School Project at LEA Primary School, Mabushi, Abuja.",
      "Since 2021 the project has provided 500 children from vulnerable backgrounds with full educational sponsorship — covering tuition, uniforms and school materials. SOOWER joined in the third year and continues to sponsor enrolment fees, uniforms and school bags for pupils.",
      "The closing ceremony, themed 'Community Empowerment and Educational Access', gathered partners from UNODC, UNFPA, NMEC, FCTA and others to mark five years of life-changing impact. Children collected shoes, uniforms and SOOWER-branded backpacks ahead of the new term.",
      "Across the FCT in the same reporting period, SOOWER's education support reached 205 orphans and children in need with enrolment fees, uniforms and school bags.",
    ],
    facts: [
      { value: "500", label: "Children sponsored since 2021" },
      { value: "5", label: "Years of the partnership" },
      { value: "205", label: "Children supported across the FCT" },
    ],
    partners: [
      "Regy & Henry Amazing Grace Foundation",
      "UNODC",
      "UNFPA",
      "NMEC",
      "FCTA",
    ],
    gallery: gallery("slum-to-school", [
      "A pupil receiving new school shoes",
      "Shoes handed over to a Slum-to-School pupil",
      "Pupils gathered for the fifth-year celebration",
      "Children from LEA Primary School, Mabushi at the ceremony",
      "Pupils with the shoes and materials they received",
      "Boys with their new school shoes",
      "A pupil with his new SOOWER backpack",
      "Secondary pupils sponsored through the project",
      "Sponsored students at the celebration",
      "Handover of school shoes during the ceremony",
      "The SOOWER team with backpacks staged for distribution",
      "Backpacks ready for distribution beside the SOOWER banner",
    ]),
    quote: {
      text: "A child, once at risk of losing access to education, now thrives.",
      source: "SOOWER Newsletter, Vol 2 Issue 1",
    },
  },
  {
    slug: "jos-widows-conference",
    date: "September 10–13, 2025",
    dateISO: "2025-09-10",
    year: "2025",
    location: "Jos, Plateau State",
    title: "Widows & Youth Conference",
    kicker: "Welfare",
    theme: "DOMINION",
    blurb:
      "2,500+ widows and orphaned missionary children attended — double the initial target. SOOWER fed 200 widows on the ground.",
    hero: heroFor("jos-widows-conference"),
    heroAlt:
      "Widows in Jos with the SOOWER food parcels they received at the Widows & Youth Conference",
    intro:
      "The 6th General Late Pastors' Wives Conference — and the largest single gathering SOOWER has supported.",
    body: [
      "From September 10–13, 2025, SOOWER supported the 6th General Late Pastors' Wives (Widows) Conference in Jos, themed 'DOMINION'.",
      "Over 2,500 widows and orphaned missionary children attended — double the initial target. SOOWER provided essential food items and carried out follow-up support data collection, the groundwork that turns a four-day conference into a year-round relationship.",
      "Remarkably, about 100 participants gave their lives to Christ, marking a spiritual and emotional renewal alongside the material support.",
      "Food supplies were distributed to 200 widows on the ground, with transport assistance extended to 150 widows and missionaries travelling to and from the conference.",
    ],
    facts: [
      { value: "2,500+", label: "Widows & children in attendance" },
      { value: "200", label: "Widows given food support" },
      { value: "150", label: "Given transport assistance" },
    ],
    partners: ["Family Worship Centre Missions Department"],
    gallery: gallery("jos-widows-conference", [
      "A widow with the food parcel she received in Jos",
      "Volunteers handing out SOOWER food parcels",
      "A SOOWER volunteer distributing parcels to widows",
      "Parcels handed out one by one along the distribution line",
      "Widows with the food support provided by SOOWER",
      "Widows raising their parcels at the close of the distribution",
      "Missionaries with the food support they received",
      "Beneficiaries with their parcels outside the conference venue",
    ]),
    quote: {
      text: "Together, SOOWER and FWC Missions continue to plant seeds of hope, health and transformation — one family at a time.",
      source: "SOOWER Newsletter, Vol 1 Issue 2",
    },
  },
  {
    slug: "trauma-care-training",
    date: "September 23–26, 2025",
    dateISO: "2025-09-23",
    year: "2025",
    location: "Lugbe, Abuja",
    title: "Advanced Trauma Competent Care",
    kicker: "Training",
    theme: "Advanced Trauma Competent Care",
    blurb:
      "45 missionaries trained to provide trauma-informed pastoral care to victims of conflict and loss.",
    hero: heroFor("trauma-care-training"),
    heroAlt:
      "Missionaries in a working session at the Advanced Trauma Competent Care training in Lugbe, Abuja",
    intro:
      "Four days of equipping missionaries to carry other people's grief without being crushed by it.",
    body: [
      "From September 23–26, 2025, SOOWER collaborated with The Army of God Gospel Outreach, Lugbe, Abuja, for a four-day training on 'Advanced Trauma Competent Care'.",
      "In partnership with Trauma Free World of Back2Back Ministries, 45 missionaries were trained to provide trauma-informed pastoral care to victims of conflict and loss. SOOWER supported the training with materials and facilitator accommodation.",
      "Over 90% of participants reported improved confidence in trauma ministry and pledged to replicate the training in their own mission fields — a multiplier that reaches far past the 45 people in the room.",
      "The initiative reinforced SOOWER's role in equipping missionaries for effective, compassionate service, alongside accommodation provided for 40 missionaries during a separate five-day Missions Congress and training.",
    ],
    facts: [
      { value: "45", label: "Missionaries trained" },
      { value: "90%+", label: "Reported improved confidence" },
      { value: "4", label: "Days of training" },
    ],
    partners: [
      "The Army of God Gospel Outreach",
      "Trauma Free World",
      "Back2Back Ministries",
    ],
    gallery: gallery("trauma-care-training", [
      "Missionaries working through the trauma-informed care curriculum in small groups",
      "Facilitators addressing participants during the training",
    ]),
    quote: {
      text: "Over 90% of participants reported improved confidence in trauma ministry and pledged to replicate the training in their mission fields.",
      source: "SOOWER Newsletter, Vol 1 Issue 2",
    },
  },
  {
    slug: "christmas-without-tears",
    date: "December 14, 2025",
    dateISO: "2025-12-14",
    year: "2025",
    location: "Durumi IDP Camp, Abuja",
    title: "Christmas Without Tears",
    kicker: "Relief",
    theme: "Christmas Without Tears",
    blurb:
      "153 displaced families received food, hygiene supplies and clothing during the festive season.",
    hero: heroFor("christmas-without-tears"),
    heroAlt:
      "Displaced families gathered at Durumi IDP Camp for the Christmas Without Tears outreach",
    intro:
      "The last outreach of 2025, taken into a camp where Christmas usually passes unmarked.",
    body: [
      "On Sunday, December 14, 2025, SOOWER Foundation partnered with Hope Found Global Initiative, IdeaBox Worldwide Ltd., Kaftan TV and Inside Africa Network for a Christmas outreach tagged 'Christmas Without Tears'.",
      "The outreach brought hope and festive cheer to 153 displaced families at the Durumi IDP Camp, with the distribution of essential food items including rice, garri and sugar, hygiene supplies such as soap and detergent, alongside clothing items.",
      "Durumi is not a place with a festive season. The point of the day was to make sure that for 153 households it briefly was — that vulnerable families experienced the warmth and joy of the season rather than reading about it.",
      "The outreach closed a year in which SOOWER reached widows, missionaries, orphans and displaced households across 29 states.",
    ],
    facts: [
      { value: "153", label: "Displaced households reached" },
      { value: "5", label: "Partner organisations" },
      { value: "3", label: "Categories: food, hygiene, clothing" },
    ],
    partners: [
      "Hope Found Global Initiative",
      "IdeaBox Worldwide Ltd.",
      "Kaftan TV",
      "Inside Africa Network",
    ],
    gallery: gallery("christmas-without-tears", [
      "The Christmas Without Tears banner at Durumi IDP Camp",
      "Food parcels handed out to displaced families",
      "Families gathered at the outreach point",
      "The outreach team at Durumi IDP Camp",
      "Displaced families waiting at the distribution",
      "A resident of the camp during the outreach",
      "Women queuing for food and hygiene supplies",
      "Families seated ahead of the distribution",
      "Inside one of the camp shelters during the outreach",
      "Rice, garri and sugar handed to a household",
      "The outreach reaching families inside the camp",
    ]),
    quote: {
      text: "Hope is most powerful when it is shared.",
      source: "Mr. Jonathan Agwunobi, Chairman & Co-Founder",
    },
  },
  {
    slug: "mission-congress",
    date: "March 2026",
    dateISO: "2026-03-01",
    year: "2026",
    location: "Army of God Gospel Outreach, Abuja",
    title: "Mission Congress",
    kicker: "Missions",
    theme: "One Cry — One Commission",
    blurb:
      "188 participants gathered to awaken a unified burden for the unreached — and left with a new Hausa congress and a call to Ethiopia.",
    hero: heroFor("mission-congress"),
    heroAlt:
      "Participants gathered for a group photograph at the Army of God Gospel Outreach Mission Congress",
    intro:
      "The quarter's spotlight: a congress built to move people past their comfort zones.",
    body: [
      "The Army of God Gospel Outreach concluded its annual Mission Congress under the theme 'One Cry – One Commission' — a gathering built to deepen inner transformation and mobilise people ready to carry the Gospel beyond borders and excuses.",
      "The event gathered 188 participants, comprising 176 adults and 12 children, united by a hunger for more of God. The stated goal was to awaken a unified burden for the unreached and to align hearts with God's own heart for the lost and broken.",
      "Rev. Sam Tukura and Pst. Daniel Daku Wumani, President of Army of God Gospel Outreach, reminded missionaries that compassion is the engine of commission, challenging the paradox of full churches and few labourers. Arch. Michael Afolabi reaffirmed Kingdom Stewardship as a spiritual appointment. Rev. Adegbite Olanihun highlighted that five out of every six unreached people live within the 10/40 window. Mr. John Agbo demonstrated how AI and modern technology can amplify the Word of God, and Rev. Mike Okoye and Evang. Friday Ogala addressed the believer's debt to the unsaved.",
      "The congress is already yielding fruit: a Hausa Mission Congress was birthed, scheduled for Kano in May/June 2026, with resource manuals being translated into Hausa. The Army of God Gospel Outreach also received a Macedonian call to reach the Afam people in Ethiopia.",
    ],
    facts: [
      { value: "188", label: "Participants — 176 adults, 12 children" },
      { value: "6", label: "Speakers across the programme" },
      { value: "5 in 6", label: "Unreached people live in the 10/40 window" },
    ],
    partners: ["The Army of God Gospel Outreach"],
    gallery: gallery("mission-congress", [
      "Missionaries and delegates gathered for a group photograph at the Mission Congress",
      "Delegates working through session materials in small groups",
      "A participant addressing the congress",
      "Facilitators leading a plenary session",
      "Participants gathered at the close of a session",
      "The congress hall during a teaching session",
      "Note-taking during a training session",
      "A delegate contributing during an open session",
      "The facilitation team at the front of the hall",
      "A facilitator leading the room in prayer",
      "Small-group work on the congress workbook",
      "A speaker presenting during the Mission Congress",
    ]),
    quote: {
      text: "Compassion is the engine of commission.",
      source: "Rev. Sam Tukura & Pst. Daniel Daku Wumani",
    },
  },
  {
    slug: "literacy-vocational",
    date: "April 2026",
    dateISO: "2026-04-24",
    year: "2026",
    location: "Galadimawa, FCT Abuja",
    title: "Literacy & Vocational Support",
    kicker: "Livelihoods",
    theme: "Educational & Psycho-social Support",
    blurb:
      "A skills and psychosocial support fair opening trades and literacy pathways for vulnerable families.",
    hero: heroFor("literacy-vocational"),
    heroAlt:
      "Participants gathered at the literacy and vocational support intervention in Galadimawa, Abuja",
    intro:
      "The most recent intervention — and the clearest picture yet of what SOOWER means by 'livelihoods'.",
    body: [
      "In April 2026, SOOWER joined the Regy & Henry Amazing Grace Foundation for a literacy, vocational and psycho-social support intervention in Galadimawa, FCT Abuja.",
      "The day was built around trades that people can actually start with: catering and baking, tailoring and fashion, leatherwork and bag-making, hairdressing and wig-making, cosmetics and soap production. Each trade stand displayed work made by participants rather than samples bought in.",
      "Alongside the skills stands ran mental health awareness and psychosocial sensitisation sessions — recognition that a stipend and a sewing machine do not, on their own, repair what displacement and bereavement do to a household.",
      "The intervention sits under Pillar 4 of SOOWER's 2026 strategy: scaling flagship initiatives while strengthening how outcomes are measured and communicated. The goal, as the foundation put it, is not only to do more but to do better.",
    ],
    facts: [
      { value: "6", label: "Trades represented at the fair" },
      { value: "2026", label: "First intervention of the new strategy" },
      { value: "Pillar 4", label: "Programs & Demonstrated Impact" },
    ],
    partners: ["Regy & Henry Amazing Grace Foundation"],
    gallery: gallery("literacy-vocational", [
      "The SOOWER team at the intervention's welcome banner",
      "Catering and baking trade display at the vocational fair",
      "Leatherwork produced by trainees on display",
      "Bag-making on display at the skills fair",
      "Tailoring and fashion pieces made by participants",
      "Participants gathering for the day's sessions",
      "The SOOWER and Regy & Henry teams on the day",
      "Participants gathered under the trees at Galadimawa",
      "Finished garments displayed at the fashion stand",
      "Hairdressing and wig-making trade stand",
      "Cosmetics and soap-making display",
    ]),
    quote: {
      text: "Our goal is not only to do more, but to do better — ensuring every program delivers measurable and meaningful change.",
      source: "SOOWER 2026 Strategy, Pillar 4",
    },
  },
];

export const momentBySlug = (slug: string) =>
  moments.find((m) => m.slug === slug);

export const momentSlugs = moments.map((m) => m.slug);
