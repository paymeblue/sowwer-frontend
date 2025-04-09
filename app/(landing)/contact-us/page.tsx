import { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@components/website/contact-us"));

export const metadata: Metadata = {
  title: "Contact Us",
};

const Contact = () => <ContactPage />;

export default Contact;
