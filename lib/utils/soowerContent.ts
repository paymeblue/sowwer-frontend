const IMAGE_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/images";
const VIDEO_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/videos";
const EVENTS_BASE =
  "https://soower-landing-media.s3.amazonaws.com/events-2025-2026";

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

// Wide, high-resolution landscape shots (3200px+ native) exported specifically
// for full-bleed hero use — see components/website/home/Hero.tsx, which
// rotates through these on a timer.
export const heroImages = [
  {
    src: `${EVENTS_BASE}/hero-jos-widows-crowd.jpg`,
    alt: "Widows at the SOOWER Widows & Youth Conference in Jos holding branded welfare parcels",
  },
  {
    src: `${EVENTS_BASE}/hero-jos-men-crowd.jpg`,
    alt: "Widows and missionaries in Jos with SOOWER welfare parcels",
  },
  {
    src: `${EVENTS_BASE}/hero-fwc-medical-branded.jpg`,
    alt: "A SOOWER volunteer at the FWC Mid-Year Missions Conference medical outreach",
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
    label: "Lives directly touched in 2025",
  },
  {
    key: "widows",
    value: 156,
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

// The full 2025-2026 event timeline. Entries with no surviving photography
// render as a date card instead of being dropped — see Moments.tsx.
export const moments = [
  {
    key: "launch",
    date: "May 7, 2025",
    location: "NAF Conference Centre, Abuja",
    title: "Foundation Launch",
    blurb:
      "SOOWER officially launched to 250+ guests — faith leaders, partners and beneficiaries — under the theme ‘30, 60 & 100-Fold’.",
    image: null,
  },
  {
    key: "army-training",
    date: "March 2025",
    location: "Abuja",
    title: "Trauma-Informed Care Training",
    blurb:
      "Five days of missions training with Army of God Gospel Outreach, equipping missionaries serving in difficult terrains.",
    image: eventPhotos.armyTraumaTraining,
  },
  {
    key: "midyear",
    date: "July 2025",
    location: "Abuja",
    title: "Mid-Year Missions Conference",
    blurb:
      "Free HPV and cholesterol screenings for 120+ missionaries and widows, in partnership with FWC's Missions Department.",
    image: eventPhotos.fwcMedicalOutreach,
  },
  {
    key: "zaria",
    date: "Aug 2, 2025",
    location: "Zaria",
    title: "EMOG 18th Anniversary",
    blurb:
      "200 widows received wrappers and 150 orphaned children received footwear — 250+ beneficiaries reached in total.",
    image: null,
  },
  {
    key: "slum-to-school",
    date: "Sept 2025",
    location: "Bwari, Abuja",
    title: "Slum-to-School, 5th Year",
    blurb:
      "Backpacks, uniforms and enrolment fees for children returning to school, marking five years of the project with Regy & Henry Amazing Grace Foundation.",
    image: eventPhotos.slumToSchoolCelebration,
  },
  {
    key: "jos",
    date: "Sept 11–13, 2025",
    location: "Jos, Plateau State",
    title: "Widows & Youth Conference",
    blurb:
      "2,500+ widows and orphaned missionary children attended; SOOWER provided food support for 200 widows on the ground.",
    image: eventPhotos.josWidowsConference,
  },
  {
    key: "christmas",
    date: "Dec 14, 2025",
    location: "Durumi IDP Camp, Abuja",
    title: "Christmas Without Tears",
    blurb:
      "153 displaced families received food, hygiene supplies and clothing during the festive season.",
    image: eventPhotos.christmasWithoutTears,
  },
  {
    key: "literacy",
    date: "April 2026",
    location: "Abuja",
    title: "Literacy & Vocational Support",
    blurb:
      "A skills and psychosocial support fair with Regy & Henry Amazing Grace Foundation, opening trades and literacy pathways for vulnerable families.",
    image: eventPhotos.literacyVocationalSupport,
  },
] as const;

export const testimonials = [
  {
    key: "bello",
    quote:
      "I am very grateful to SOOWER Foundation. The money came in when I needed to pay my children’s school fees. Thank you very much. May God bless you.",
    name: "Mrs. Bello",
    location: "Kaduna, Nigeria",
  },
  {
    key: "dauda",
    quote:
      "My family is grateful to SOOWER Foundation. I needed to start a small business to support my kids and the money came in at the right time. I used it to start my kunu business.",
    name: "Mrs. Dauda",
    location: "Akwa Ibom, Nigeria",
  },
  {
    key: "oyemi",
    quote:
      "I am most grateful to SOOWER Foundation for the monthly cash support. The money has been really helpful as I add it to my bridal accessories business.",
    name: "Mrs. Oyemi",
    location: "Benue, Nigeria",
  },
] as const;
