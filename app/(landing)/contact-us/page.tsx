import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@components/website/contact-us"));

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SOOWER Widows and Missions Foundation for enquiries, partnership requests or support. Based in Mabushi, Abuja, Nigeria.",
};

const Contact = () => <ContactPage />;

export default Contact;
