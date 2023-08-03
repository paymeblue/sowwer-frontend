export type CardType =
  | {
      image: string;
      category: string;
      tagColor: string;
      title: string;
      subTitle: string;
      desc: string;
      currentDonation: string;
      target: string;
      id: string;
    }
  | undefined;

export const cardData: Array<CardType> = [
  {
    image: "/assets/images/happy_woman.jpg",
    category: "Widows",
    tagColor: "purple",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "1",
  },
  {
    image: "/assets/images/children_running.jpg",
    category: "Orphans",
    tagColor: "orange",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "2",
  },
  {
    image: "/assets/images/woman_busy.jpg",
    category: "Missions",
    tagColor: "blue",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "3",
  },
  {
    image: "/assets/images/happy_woman.jpg",
    category: "Widows",
    tagColor: "purple",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "4",
  },
  {
    image: "/assets/images/children_running.jpg",
    category: "Orphans",
    tagColor: "orange",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "5",
  },
  {
    image: "/assets/images/woman_busy.jpg",
    category: "Missions",
    tagColor: "blue",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    currentDonation: "135,000",
    target: "500,000",
    id: "6",
  },
];
