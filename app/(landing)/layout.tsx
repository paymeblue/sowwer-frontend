import JsonLd from "@components/shared/JsonLd";
import {
  KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from "@lib/siteMeta";
import Footer from "layout/Footer";
import Navbar from "layout/Navbar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_SHORT_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_SHORT_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "nonprofit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_SHORT_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    locale: "en_NG",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_SHORT_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

type Props = {
  children: Readonly<ReactNode>;
};

const WebsiteLayout = ({ children }: Props) => {
  return (
    <div className="relative">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
