import {
  CompletedProject,
  PayoutHistory,
} from "@components/tables/ministry/MinistryPayoutsTables";
import {
  GeneralDonation,
  ProjectDonation,
} from "@components/tables/donors/DonorDonationsTables";

// DONOR MOCKS
export const generalDonations: GeneralDonation[] = [
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "recurring",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "one-time",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "recurring",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "recurring",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "one-time",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "one-time",
    frequency: null,
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "one-time",
    frequency: null,
    ministryName: "Family Worship Centre",
  },
  {
    id: "123",
    amount: 135000,
    datetime: "21st March 2023; 4:45pm",
    donationType: "recurring",
    frequency: "monthly",
    ministryName: "Family Worship Centre",
  },
];

export const projectDonations: ProjectDonation[] = [
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
  {
    amount: 135000,
    category: "widows",
    datetime: "21st March 2023; 4:45pm",
    id: "123",
    title: "The Widows Project",
  },
];

// MINISTRY MOCKS
export const completedProjects: CompletedProject[] = [
  {
    id: "123",
    title: "The Widows Project",
    goal: 500000,
    category: "widow",
    numOfDonors: 53,
    amountRaised: 153000,
  },
  {
    id: "123",
    title: "The Widows Project",
    goal: 500000,
    category: "widow",
    numOfDonors: 53,
    amountRaised: 153000,
  },
  {
    id: "123",
    title: "The Widows Project",
    goal: 500000,
    category: "widow",
    numOfDonors: 53,
    amountRaised: 153000,
  },
  {
    id: "123",
    title: "The Widows Project",
    goal: 500000,
    category: "widow",
    numOfDonors: 53,
    amountRaised: 153000,
  },
];

export const payoutHistory: PayoutHistory[] = [
  {
    id: "123",
    amountPaid: 135000,
    title: "The Widows Project",
    referenceNo: "#ABC1234567",
    payoutDate: "21st March 2023; 4:45pm",
  },
  {
    id: "123",
    amountPaid: 135000,
    title: "The Widows Project",
    referenceNo: "#ABC1234567",
    payoutDate: "21st March 2023; 4:45pm",
  },
  {
    id: "123",
    amountPaid: 135000,
    title: "The Widows Project",
    referenceNo: "#ABC1234567",
    payoutDate: "21st March 2023; 4:45pm",
  },
];
