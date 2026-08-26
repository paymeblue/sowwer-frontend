const IMAGE_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/images";
const VIDEO_BASE =
  "https://soower-landing-media.s3.amazonaws.com/jos-2025/videos";

// Real photography/video from the FWC Widows & Youth Conference, Jos —
// Sept 11-13 2025 (source: SOOWER Foundation Google Drive media folder).
export const josMedia = {
  heroCrowdWide: `${IMAGE_BASE}/hero-crowd-wide.jpg`,
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
  {
    key: "deployed",
    value: 28.08,
    prefix: "₦",
    suffix: "M",
    label: "Deployed to widow stipends in 2025",
    decimals: 2,
  },
] as const;

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
    key: "midyear",
    date: "July 2025",
    location: "Abuja",
    title: "Mid-Year Missions Conference",
    blurb:
      "Free HPV and cholesterol screenings for 120+ missionaries and widows, in partnership with FWC's Missions Department.",
    image: null,
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
    key: "jos",
    date: "Sept 11–13, 2025",
    location: "Jos, Plateau State",
    title: "Widows & Youth Conference",
    blurb:
      "2,500+ widows and orphaned missionary children attended; SOOWER provided food support for 200 widows on the ground.",
    image: josMedia.crowdSeatedWomen1,
  },
  {
    key: "christmas",
    date: "Dec 14, 2025",
    location: "Durumi IDP Camp, Abuja",
    title: "Christmas Without Tears",
    blurb:
      "153 displaced families received food, hygiene supplies and clothing during the festive season.",
    image: null,
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
