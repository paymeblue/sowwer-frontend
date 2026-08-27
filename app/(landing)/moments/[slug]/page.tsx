import JsonLd from "@components/shared/JsonLd";
import MomentStory from "@components/website/moments/MomentStory";
import { momentBySlug, moments } from "@lib/momentsContent";
import { SITE_URL, breadcrumbJsonLd } from "@lib/siteMeta";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export const generateStaticParams = () =>
  moments.map((moment) => ({ slug: moment.slug }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const moment = momentBySlug(params.slug);
  if (!moment) return { title: "Moment not found" };

  const title = `${moment.title} — ${moment.date}`;
  const path = `/moments/${moment.slug}`;

  return {
    title,
    description: moment.blurb,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${path}`,
      title,
      description: moment.blurb,
      publishedTime: moment.dateISO,
      images: moment.hero
        ? [{ url: moment.hero, alt: moment.heroAlt }]
        : undefined,
    },
    twitter: {
      card: moment.hero ? "summary_large_image" : "summary",
      title,
      description: moment.blurb,
      images: moment.hero ? [moment.hero] : undefined,
    },
  };
};

const MomentPage = ({ params }: Props) => {
  const index = moments.findIndex((m) => m.slug === params.slug);
  if (index === -1) notFound();

  const moment = moments[index];
  const prev = moments[index - 1];
  const next = moments[index + 1];
  const path = `/moments/${moment.slug}`;

  // Event schema lets search engines and assistants cite the outreach with its
  // real date, place and organiser rather than inferring them from prose.
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}${path}#event`,
    name: moment.title,
    startDate: moment.dateISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: moment.intro,
    about: moment.theme || undefined,
    url: `${SITE_URL}${path}`,
    image: moment.hero ? [moment.hero] : undefined,
    location: {
      "@type": "Place",
      name: moment.location,
      address: { "@type": "PostalAddress", addressCountry: "NG" },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
    performer: moment.partners.map((name) => ({
      "@type": "Organization",
      name,
    })),
    isAccessibleForFree: true,
  };

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Moments", path: "/#moments" },
          { name: moment.title, path },
        ])}
      />
      <MomentStory
        moment={moment}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
      />
    </>
  );
};

export default MomentPage;
