const IMAGE_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/images";
const VIDEO_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/videos";
const EVENTS_BASE =
  "https://soower-landing-media.s3.amazonaws.com/events-2025-2026";
const ABOUT_BASE = "https://soower-landing-media.s3.amazonaws.com/about";

// Extracted directly from the newsletter PDFs (embedded image streams, not
// page screenshots) — see lib/utils/momentsContent.ts for how the same
// extraction fed the Foundation Launch / EMOG Zaria / Trauma Care moments.
export const aboutPhotos = {
  teamHq: `${ABOUT_BASE}/team-hq.jpg`,
  // Dr. Cosmas Maduka, CON — Chairman & Founder of Coscharis Group, chaired
  // the SOOWER Foundation launch on May 7, 2025 (source: volume-1-issue-1.pdf).
  cosmasMaduka: `${ABOUT_BASE}/cosmas-maduka.jpg`,
} as const;

// Real photography/video from the FWC Widows & Youth Conference, Jos —
// Sept 11-13 2025 (source: SOOWER Foundation Google Drive media folder).
export const josMedia = {
  crowdSeatedWomen1: `${IMAGE_BASE}/crowd-seated-women-1.jpg`,
  crowdSeatedWomen2: `${IMAGE_BASE}/crowd-seated-women-2.jpg`,
  crowdGroupPortrait: `${IMAGE_BASE}/crowd-group-portrait.jpg`,
  crowdSeatedLarge: `${IMAGE_BASE}/crowd-seated-large.jpg`,
  volunteerHandingParcel1: `${IMAGE_BASE}/volunteer-handing-parcel-1.jpg`,
  volunteerHandingParcel2: `${IMAGE_BASE}/volunteer-handing-parcel-2.jpg`,
  volunteerHandingParcel3: `${IMAGE_BASE}/volunteer-handing-parcel-3.jpg`,
  volunteerHandingParcel4: `${IMAGE_BASE}/volunteer-handing-parcel-4.jpg`,
  widowReceivingParcel1: `${IMAGE_BASE}/widow-receiving-parcel-1.jpg`,
  widowReceivingParcel2: `${IMAGE_BASE}/widow-receiving-parcel-2.jpg`,
  widowReceivingParcel3: `${IMAGE_BASE}/widow-receiving-parcel-3.jpg`,
  widowPortraitBlue: `${IMAGE_BASE}/widow-portrait-blue.jpg`,
} as const;

// A short, silent loop cut from real event footage, cropped into the SOOWER
// mark on the home hero — see components/website/home/Hero.tsx. Re-encoded
// from a 2.9MB source clip to ~1.2MB at 480px wide; it loads once and loops,
// so it never re-fetches the way an autoplaying full-bleed background would.
export const heroLoops = [
  {
    src: `${EVENTS_BASE}/hero-mask-loop.mp4`,
    poster: `${EVENTS_BASE}/hero-mask-poster.jpg`,
    alt: "Volunteers distributing SOOWER welfare parcels in Jos",
  },
  {
    src: `${EVENTS_BASE}/hero-mask-loop-2.mp4`,
    poster: `${EVENTS_BASE}/hero-mask-poster-2.jpg`,
    alt: "Beneficiaries at the Literacy & Vocational Support intervention",
  },
] as const;

export const eventPhotos = {
  armyTraumaTraining: `${EVENTS_BASE}/event-army-trauma-training.jpg`,
  fwcMedicalOutreach: `${EVENTS_BASE}/event-fwc-medical-outreach.jpg`,
  slumToSchoolCelebration: `${EVENTS_BASE}/event-slum-to-school-celebration.jpg`,
  christmasWithoutTears: `${EVENTS_BASE}/event-christmas-without-tears.jpg`,
  literacyVocationalSupport: `${EVENTS_BASE}/event-literacy-vocational-support.jpg`,
  josWidowsConference: `${EVENTS_BASE}/event-jos-widows-conference.jpg`,
  missionCareScreening: `${EVENTS_BASE}/program-missioncare-screening.jpg`,
} as const;

// Real photography from the Slum-to-School 5th Year Celebration (Regy &
// Henry Amazing Grace Foundation, Sept 2025) for the DAD Project page gallery.
export const dadProjectPhotos = [
  {
    key: "crowd",
    src: `${EVENTS_BASE}/dad-slum-crowd-wide.jpg`,
    title: "Slum-to-School, 5th Year Celebration",
    caption:
      "Children and families gather for the fifth-year milestone in Bwari, Abuja.",
  },
  {
    key: "shoes",
    src: `${EVENTS_BASE}/dad-child-receiving-shoes.jpg`,
    title: "New shoes, new confidence",
    caption: "A child receives new footwear ahead of the new school term.",
  },
  {
    key: "seated-1",
    src: `${EVENTS_BASE}/dad-children-seated-1.jpg`,
    title: "Ready to learn",
    caption: "Children in uniform, seated and ready for the ceremony.",
  },
  {
    key: "seated-2",
    src: `${EVENTS_BASE}/dad-children-seated-2.jpg`,
    title: "A full house",
    caption:
      "Turnout at the 5th-year celebration, marking five years of the partnership.",
  },
  {
    key: "handover-1",
    src: `${EVENTS_BASE}/dad-official-handover-1.jpg`,
    title: "Partners on stage",
    caption:
      "SOOWER and Regy & Henry Amazing Grace Foundation leadership at the handover.",
  },
  {
    key: "handover-2",
    src: `${EVENTS_BASE}/dad-official-handover-2.jpg`,
    title: "Sealing the partnership",
    caption:
      "Five years of the Slum-to-School Project, marked with partners including UNODC and UNFPA.",
  },
  {
    key: "uniforms-1",
    src: `${EVENTS_BASE}/dad-uniforms-1.jpg`,
    title: "School uniforms distributed",
    caption: "Uniforms handed to children returning to school this term.",
  },
  {
    key: "uniforms-2",
    src: `${EVENTS_BASE}/dad-uniforms-2.jpg`,
    title: "Kitted out for class",
    caption: "Every child leaves with what they need for the first day back.",
  },
  {
    key: "branded-bag-1",
    src: `${EVENTS_BASE}/dad-branded-bag-1.jpg`,
    title: "SOOWER on the ground",
    caption: "A SOOWER team member with branded welfare bags at the event.",
  },
  {
    key: "backpacks",
    src: `${EVENTS_BASE}/dad-backpacks-stack.jpg`,
    title: "Backpacks, ready to go",
    caption: "SOOWER-branded backpacks staged for distribution to students.",
  },
] as const;

export const josVideos = [
  {
    key: "parcel-handoff",
    src: `${VIDEO_BASE}/parcel-handoff.mp4`,
    poster: `${VIDEO_BASE}/parcel-handoff-poster.jpg`,
    caption: "Handing out welfare parcels",
  },
  {
    key: "volunteers-in-line",
    src: `${VIDEO_BASE}/volunteers-in-line.mp4`,
    poster: `${VIDEO_BASE}/volunteers-in-line-poster.jpg`,
    caption: "Volunteers organising the line",
  },
  {
    key: "crowd-gathering",
    src: `${VIDEO_BASE}/crowd-gathering.mp4`,
    poster: `${VIDEO_BASE}/crowd-gathering-poster.jpg`,
    caption: "Widows and missionaries gathering",
  },
  {
    key: "distribution-line",
    src: `${VIDEO_BASE}/distribution-line.mp4`,
    poster: `${VIDEO_BASE}/distribution-line-poster.jpg`,
    caption: "The distribution line in Jos",
  },
] as const;

// Figures pulled directly from "SOOWER Foundation Annual Report (Vol. 1),
// August 2024 - December 2025".
export const impactStats = [
  {
    key: "lives",
    value: 2943,
    prefix: "",
    suffix: "",
    label: "Lives directly touched",
  },
  {
    key: "widows",
    value: 172,
    prefix: "",
    suffix: "",
    label: "Widows & missionaries on monthly support",
  },
  {
    key: "states",
    value: 29,
    prefix: "",
    suffix: "",
    label: "States reached across Nigeria",
  },
] as const;

// The 2025-2026 event timeline now lives in @lib/momentsContent, which also
// carries the per-event narrative and galleries used by /moments/[slug].

const GALLERY_BASE = `${EVENTS_BASE}/gallery`;

// Real documentary photography for the marketing pages, replacing the
// AI-generated stock (public/images/img-*.png, frame-*.png, donation-*.png)
// that used to fill these slots. Every frame here is SOOWER's own, shot at a
// named outreach — see @lib/momentsContent for the event each belongs to.
export const sitePhotos = {
  // Widows — Jos Widows & Youth Conference, Sept 2025
  widowPortraitParcel: `${GALLERY_BASE}/jos-widows-conference/g-01.jpg`,
  widowsWithSupport: `${GALLERY_BASE}/jos-widows-conference/g-05.jpg`,
  widowsRaisingParcels: `${GALLERY_BASE}/jos-widows-conference/g-06.jpg`,
  widowsWide: `${GALLERY_BASE}/jos-widows-conference/hero.jpg`,

  // Children & education — Slum-to-School 5th Year, Sept 2025
  childWithBackpack: `${GALLERY_BASE}/slum-to-school/g-07.jpg`,
  childrenReceivingShoes: `${GALLERY_BASE}/slum-to-school/g-06.jpg`,
  pupilsGathered: `${GALLERY_BASE}/slum-to-school/g-03.jpg`,
  pupilsInUniform: `${GALLERY_BASE}/slum-to-school/g-09.jpg`,
  schoolWide: `${GALLERY_BASE}/slum-to-school/hero.jpg`,

  // Missionaries — FWC Mid-Year medical outreach, July 2025
  screeningUnderBanner: `${GALLERY_BASE}/fwc-medical-outreach/g-05.jpg`,
  screeningWidow: `${GALLERY_BASE}/fwc-medical-outreach/g-01.jpg`,
  bloodScreening: `${GALLERY_BASE}/fwc-medical-outreach/g-03.jpg`,
  missionaryScreening: `${GALLERY_BASE}/fwc-medical-outreach/g-02.jpg`,
  missionaryHeightCheck: `${GALLERY_BASE}/fwc-medical-outreach/g-04.jpg`,

  // Missions training — Mission Congress, March 2026
  congressGroup: `${GALLERY_BASE}/mission-congress/g-01.jpg`,
  congressSession: `${GALLERY_BASE}/mission-congress/g-06.jpg`,
  congressMaterials: `${GALLERY_BASE}/mission-congress/g-04.jpg`,
  congressDiscussion: `${GALLERY_BASE}/mission-congress/g-08.jpg`,
  congressWide: `${GALLERY_BASE}/mission-congress/hero.jpg`,

  // Relief — Christmas Without Tears, Durumi IDP Camp, Dec 2025
  campPortrait: `${GALLERY_BASE}/christmas-without-tears/g-06.jpg`,
  partnersTeam: `${GALLERY_BASE}/christmas-without-tears/g-04.jpg`,
  parcelHandover: `${GALLERY_BASE}/christmas-without-tears/g-10.jpg`,
  campWide: `${GALLERY_BASE}/christmas-without-tears/hero.jpg`,

  // Livelihoods — Literacy & Vocational intervention, April 2026
  vocationalStand: `${GALLERY_BASE}/literacy-vocational/g-05.jpg`,
  vocationalCrowd: `${GALLERY_BASE}/literacy-vocational/g-08.jpg`,
  vocationalWide: `${GALLERY_BASE}/literacy-vocational/hero.jpg`,
} as const;

// Decks for the program heroes — see components/website/programs/PhotoDeck.tsx.
// Each leads with the strongest frame; the rest shuffle behind it. Order
// matters: card one is what a visitor sees before any animation runs, so it
// carries SOOWER's own branding wherever the source photography allows.
export const programDecks = {
  "widow-care": [
    {
      src: `${GALLERY_BASE}/jos-widows-conference/g-01.jpg`,
      alt: "A widow in Jos holding the food parcel she received from SOOWER",
    },
    {
      src: `${GALLERY_BASE}/jos-widows-conference/g-05.jpg`,
      alt: "Widows seated with SOOWER-branded food parcels after a distribution in Jos",
    },
    {
      src: `${IMAGE_BASE}/widow-portrait-blue.jpg`,
      alt: "A widow supported through SOOWER's monthly welfare programme",
    },
    {
      src: `${IMAGE_BASE}/widow-receiving-parcel-1.jpg`,
      alt: "A widow receiving a SOOWER welfare parcel",
    },
    {
      src: `${IMAGE_BASE}/volunteer-handing-parcel-2.jpg`,
      alt: "A SOOWER volunteer handing a welfare parcel to a widow",
    },
    {
      src: `${GALLERY_BASE}/jos-widows-conference/g-06.jpg`,
      alt: "Widows raising their parcels at the close of a SOOWER distribution",
    },
  ],
  "dad-project": [
    {
      src: `${GALLERY_BASE}/slum-to-school/g-12.jpg`,
      alt: "SOOWER-branded backpacks staged for distribution beside the SOOWER banner",
    },
    {
      src: `${GALLERY_BASE}/slum-to-school/g-07.jpg`,
      alt: "A pupil with the SOOWER backpack he received at the Slum-to-School celebration",
    },
    {
      src: `${GALLERY_BASE}/slum-to-school/g-11.jpg`,
      alt: "The SOOWER team with backpacks ready for distribution to pupils",
    },
    {
      src: `${EVENTS_BASE}/dad-backpacks-stack.jpg`,
      alt: "A stack of SOOWER-branded backpacks ready for students",
    },
    {
      src: `${GALLERY_BASE}/slum-to-school/g-09.jpg`,
      alt: "Sponsored students at the Slum-to-School fifth-year celebration",
    },
    {
      src: `${GALLERY_BASE}/slum-to-school/g-06.jpg`,
      alt: "Pupils with the school shoes and materials they received",
    },
  ],
  "mission-care": [
    {
      src: `${GALLERY_BASE}/fwc-medical-outreach/g-06.jpg`,
      alt: "A missionary's blood pressure taken at the SOOWER-sponsored medical outreach",
    },
    {
      src: `${GALLERY_BASE}/fwc-medical-outreach/g-02.jpg`,
      alt: "A missionary having his height measured at the SOOWER-sponsored medical outreach",
    },
    {
      src: `${GALLERY_BASE}/fwc-medical-outreach/g-03.jpg`,
      alt: "Blood samples taken for cholesterol screening at the SOOWER medical outreach",
    },
    {
      src: `${GALLERY_BASE}/mission-congress/g-01.jpg`,
      alt: "Missionaries gathered for a group photograph at the Mission Congress",
    },
    {
      src: `${GALLERY_BASE}/fwc-medical-outreach/g-08.jpg`,
      alt: "Vitals recorded at the SOOWER-sponsored medical station",
    },
    {
      src: `${GALLERY_BASE}/fwc-medical-outreach/g-05.jpg`,
      alt: "A missionary being screened beneath the SOOWER banner at the Mid-Year Missions Conference",
    },
  ],
  partnerships: [
    {
      src: `${GALLERY_BASE}/christmas-without-tears/g-01.jpg`,
      alt: "The Christmas Without Tears banner alongside SOOWER branding at Durumi IDP Camp",
    },
    {
      src: `${GALLERY_BASE}/christmas-without-tears/g-04.jpg`,
      alt: "The SOOWER team with partner organisations at the Christmas Without Tears outreach",
    },
    {
      src: `${GALLERY_BASE}/slum-to-school/g-11.jpg`,
      alt: "SOOWER and Regy & Henry Amazing Grace Foundation staff with backpacks for pupils",
    },
    {
      src: `${GALLERY_BASE}/literacy-vocational/g-07.jpg`,
      alt: "The SOOWER and Regy & Henry teams at the literacy and vocational intervention",
    },
    {
      src: `${GALLERY_BASE}/christmas-without-tears/g-10.jpg`,
      alt: "Rice, garri and sugar handed to a displaced household during a partner outreach",
    },
  ],
} as const;

// Fifteen frames pulled from the four programme decks above, for the
// scroll-driven photo wall on the home hero — see
// components/website/home/Hero.tsx.
//
// Deliberately NOT sourced from programDecks/ctaMosaic/whoWeArePhotos, and
// deliberately not using any moment's hero.jpg — those are all already on
// screen elsewhere on this same page (ProgramsGrid, JoinUs, HelpingHand,
// Moments), so reusing them here is exactly the "images repeat" problem.
// Every frame below is a gallery photo no other homepage section claims,
// spread across eight different outreach events so the wall actually reads
// as "we've covered a lot of ground" rather than four events on repeat.
export const heroParallaxPhotos = [
  {
    title: "Addressing guests at the launch",
    link: "/moments/foundation-launch",
    thumbnail: `${GALLERY_BASE}/foundation-launch/g-02.jpg`,
  },
  {
    title: "Guests at the SOOWER launch",
    link: "/moments/foundation-launch",
    thumbnail: `${GALLERY_BASE}/foundation-launch/g-03.jpg`,
  },
  {
    title: "Screened at the medical outreach",
    link: "/programs/mission-care",
    thumbnail: `${GALLERY_BASE}/fwc-medical-outreach/g-04.jpg`,
  },
  {
    title: "A sample drawn for testing",
    link: "/programs/mission-care",
    thumbnail: `${GALLERY_BASE}/fwc-medical-outreach/g-06.jpg`,
  },
  {
    title: "Pupils at the ceremony",
    link: "/programs/dad-project",
    thumbnail: `${GALLERY_BASE}/slum-to-school/g-04.jpg`,
  },
  {
    title: "Secondary pupils sponsored",
    link: "/programs/dad-project",
    thumbnail: `${GALLERY_BASE}/slum-to-school/g-08.jpg`,
  },
  {
    title: "Distributing parcels to widows",
    link: "/programs/widow-care",
    thumbnail: `${GALLERY_BASE}/jos-widows-conference/g-03.jpg`,
  },
  {
    title: "Beneficiaries with their parcels",
    link: "/programs/widow-care",
    thumbnail: `${GALLERY_BASE}/jos-widows-conference/g-08.jpg`,
  },
  {
    title: "Trauma-informed care training",
    link: "/moments/trauma-care-training",
    thumbnail: `${GALLERY_BASE}/trauma-care-training/g-01.jpg`,
  },
  {
    title: "Families at the outreach point",
    link: "/programs/partnerships",
    thumbnail: `${GALLERY_BASE}/christmas-without-tears/g-03.jpg`,
  },
  {
    title: "Reaching families in the camp",
    link: "/programs/partnerships",
    thumbnail: `${GALLERY_BASE}/christmas-without-tears/g-11.jpg`,
  },
  {
    title: "Inside the Mission Congress",
    link: "/moments/mission-congress",
    thumbnail: `${GALLERY_BASE}/mission-congress/g-06.jpg`,
  },
  {
    title: "Leading the room in prayer",
    link: "/moments/mission-congress",
    thumbnail: `${GALLERY_BASE}/mission-congress/g-10.jpg`,
  },
  {
    title: "Bag-making on display",
    link: "/moments/literacy-vocational",
    thumbnail: `${GALLERY_BASE}/literacy-vocational/g-04.jpg`,
  },
  {
    title: "Gathering for the day's sessions",
    link: "/moments/literacy-vocational",
    thumbnail: `${GALLERY_BASE}/literacy-vocational/g-06.jpg`,
  },
] as const;

// Supporting tiles for the get-involved mosaic — see shared/JoinUs.tsx. The
// lead frame is passed in per page; these four sit around it and cover each of
// the four programmes.
// Faces-forward set for the get-involved mosaic — see shared/JoinUs.tsx. Each
// entry fills a plain photo cell in the bento grid.
export const ctaMosaic = [
  {
    src: `${GALLERY_BASE}/emog-zaria/hero.jpg`,
    alt: "A widow in Zaria receiving a wrapper at the EMOG 18th anniversary",
  },
  {
    src: `${GALLERY_BASE}/jos-widows-conference/g-01.jpg`,
    alt: "A widow in Jos holding the food parcel she received from SOOWER",
  },
  {
    src: `${GALLERY_BASE}/slum-to-school/g-07.jpg`,
    alt: "A pupil with the SOOWER backpack he received at the Slum-to-School celebration",
  },
  {
    src: `${GALLERY_BASE}/fwc-medical-outreach/g-01.jpg`,
    alt: "A widow being screened at the SOOWER-sponsored medical outreach",
  },
  {
    src: `${GALLERY_BASE}/mission-congress/g-01.jpg`,
    alt: "Missionaries gathered for a group photograph at the Mission Congress",
  },
  {
    src: `${GALLERY_BASE}/christmas-without-tears/g-06.jpg`,
    alt: "A resident of Durumi IDP Camp during the Christmas Without Tears outreach",
  },
] as const;

// Standalone photographs — rendered inside the SOOWER mark's silhouette by
// components/shared/BrandPhoto.tsx. The lead frame is the one a visitor sees
// before any rotation, so it carries a group rather than a single handover.
export const whoWeArePhotos = [
  {
    src: `${GALLERY_BASE}/jos-widows-conference/g-05.jpg`,
    alt: "Widows seated with SOOWER-branded food parcels after a distribution in Jos",
  },
  {
    src: `${GALLERY_BASE}/slum-to-school/g-09.jpg`,
    alt: "Sponsored students at the Slum-to-School fifth-year celebration",
  },
  {
    src: `${GALLERY_BASE}/fwc-medical-outreach/g-05.jpg`,
    alt: "A missionary being screened beneath the SOOWER banner at the Mid-Year Missions Conference",
  },
  {
    src: `${IMAGE_BASE}/volunteer-handing-parcel-3.jpg`,
    alt: "A SOOWER volunteer handing a welfare parcel to a widow in Jos",
  },
  {
    src: `${GALLERY_BASE}/christmas-without-tears/g-04.jpg`,
    alt: "The SOOWER team with partner organisations at the Christmas Without Tears outreach",
  },
] as const;

export const missionVisionPhotos = [
  {
    src: `${GALLERY_BASE}/jos-widows-conference/g-06.jpg`,
    alt: "Widows raising their parcels at the close of a SOOWER distribution in Jos",
  },
  {
    src: `${GALLERY_BASE}/literacy-vocational/g-08.jpg`,
    alt: "Participants gathered at the literacy and vocational support intervention in Galadimawa",
  },
  {
    src: `${GALLERY_BASE}/slum-to-school/g-03.jpg`,
    alt: "Pupils gathered for the Slum-to-School fifth-year celebration",
  },
] as const;

// Two frames not otherwise used anywhere else on the site — see
// layout/Footer.tsx, where they crossfade behind the giant SOOWER wordmark
// as a quiet closing beat, not another spot competing for the same photos
// as the rest of the page.
export const footerWatermarkPhotos = [
  {
    src: `${GALLERY_BASE}/mission-congress/g-04.jpg`,
    alt: "Facilitators leading a plenary session at the Mission Congress",
  },
  {
    src: `${GALLERY_BASE}/jos-widows-conference/g-04.jpg`,
    alt: "Parcels handed out one by one along the distribution line in Jos",
  },
] as const;

// Every widow photograph on hand, for the WidowCare impact strip.
//
// The first version of this list had four near-identical frames from the
// same seated-crowd burst in Jos (same women, same storm sky, same bags) —
// scrolling the strip felt like it was looping. Deduped to one frame per
// distinct scene; the EMOG Zaria entry now uses the actual Zaria photo
// instead of a Jos frame captioned as if it were Zaria.
export const widowGallery = [
  {
    key: "support",
    src: `${GALLERY_BASE}/jos-widows-conference/g-05.jpg`,
    alt: "Widows seated with SOOWER-branded food parcels after a distribution in Jos",
    text: "Monthly stipends for 150+ widows across 29 states",
  },
  {
    key: "portrait",
    src: `${GALLERY_BASE}/jos-widows-conference/g-01.jpg`,
    alt: "A widow in Jos holding the food parcel she received from SOOWER",
    text: "Food support delivered directly, hand to hand",
  },
  {
    key: "launch",
    src: `${GALLERY_BASE}/foundation-launch/g-03.jpg`,
    alt: "Widows seated at the SOOWER Foundation launch, NAF Conference Centre, Abuja",
    text: "Widows and missionaries were guests of honour at the May 2025 launch",
  },
  {
    key: "screening",
    src: `${GALLERY_BASE}/fwc-medical-outreach/g-01.jpg`,
    alt: "A widow being screened at the SOOWER-sponsored medical outreach",
    text: "Free health screenings at the Family Worship Centre Mission Week",
  },
  {
    key: "emog",
    src: `${GALLERY_BASE}/emog-zaria/hero.jpg`,
    alt: "A widow in Zaria receiving a wrapper at the EMOG 18th anniversary",
    text: "Wrappers and footwear for 350 beneficiaries in Zaria",
  },
  {
    key: "handover",
    src: `${IMAGE_BASE}/volunteer-handing-parcel-3.jpg`,
    alt: "A SOOWER volunteer handing a welfare parcel to a widow in Jos",
    text: "Volunteers on the ground at every distribution",
  },
  {
    key: "vocational",
    src: `${GALLERY_BASE}/literacy-vocational/g-05.jpg`,
    alt: "A trade stand at the SOOWER literacy and vocational support fair",
    text: "Vocational training that turns a stipend into a livelihood",
  },
  {
    key: "distribution",
    src: `${GALLERY_BASE}/jos-widows-conference/g-02.jpg`,
    alt: "A widow at the front of the distribution line in Jos",
    text: "2,500+ widows reached at the Jos Widows & Youth Conference",
  },
  {
    key: "receiving",
    src: `${IMAGE_BASE}/widow-receiving-parcel-2.jpg`,
    alt: "A widow receiving her SOOWER welfare parcel",
    text: "Dignity restored, one household at a time",
  },
] as const;

// Beneficiary quotes. These are the only first-person testimonials that appear
// anywhere in the four newsletters or the existing site copy — the newsletters
// otherwise summarise responses rather than quoting them. Nothing here is
// paraphrased or invented; add to it only from a sourced document.
export const testimonials = [
  {
    key: "bello",
    quote:
      "I am very grateful to SOOWER Foundation. The money came in when I needed to pay my children’s school fees. Thank you very much. May God bless you.",
    name: "Mrs. Bello",
    location: "Kaduna, Nigeria",
    source: "Beneficiary, WidowCare monthly stipend",
  },
  {
    key: "dauda",
    quote:
      "My family is grateful to SOOWER Foundation. I needed to start a small business to support my kids and the money came in at the right time. I used it to start my kunu business.",
    name: "Mrs. Esther Kyari Dauda",
    location: "Akwa Ibom, Nigeria",
    source: "Beneficiary, WidowCare monthly stipend",
  },
  {
    key: "oyemi",
    quote:
      "I am most grateful to SOOWER Foundation for the monthly cash support. The money has been really helpful as I add it to my bridal accessories business.",
    name: "Mrs. Oyemi",
    location: "Benue, Nigeria",
    source: "Beneficiary, WidowCare monthly stipend",
  },
  {
    key: "egbe",
    quote:
      "I am one of the beneficiaries of SOOWER's support and I am thankful for the foundation for supporting my family.",
    name: "Mrs. Mary Fatima Egbe",
    location: "Nigeria",
    source: "Beneficiary, WidowCare",
  },
  {
    key: "medical",
    quote: "Life-saving and timely.",
    name: "Participants, Mid-Year Missions Conference",
    location: "Family Worship Centre, Abuja — July 2025",
    source: "SOOWER Newsletter, Vol 1 Issue 2",
  },
] as const;
