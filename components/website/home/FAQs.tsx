"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { useRef } from "react";

const data = [
  {
    header: "What type of projects can I donate to on Soower?",
    body: "You can donate to a variety of faith-based and humanitarian initiatives, including projects that support widows, orphans (through the DAD Project), missionaries, and ministry partnerships.",
    id: "1",
  },
  {
    header:
      "How can I ensure the security of the donations received through Soower?",
    body: "All donations on Soower are processed through secure, encrypted payment gateways. Donors also receive confirmation receipts and can monitor donation history through their dashboard.",
    id: "2",
  },
  {
    header:
      "Can I get a refund for my donation if I make an error while donating?",
    body: "Donations are generally non-refundable. However, if a donation was made in error (e.g. duplicate payments or incorrect amount), you can contact our support team within 24 hours, and we’ll review the request on a case-by-case basis.",
    id: "3",
  },
  {
    header: "Can I get updates on the projects I've donated to?",
    body: "Yes! Donors receive updates and testimonies related to the programs or individuals they’ve supported. If you fully fund a child through the DAD Project, you’ll also get progress reports directly from the admin team via your dashboard.",
    id: "4",
  },
  {
    header: "Can widows apply for support directly?",
    body: "Yes, widows seeking assistance can apply directly through our Registry page. After completing the application form, our team reviews each submission and follows up with eligible candidates for further steps.",
    id: "5",
  },
  {
    header: "How does Soower identify missionaries in need of support?",
    body: "Missionaries can apply through our Registry, and we work closely with churches and Christian organizations to verify their mission work. Each application is reviewed to ensure alignment with our values and the genuine need for support before funding is considered.",
    id: "6",
  },
];

const FAQs = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".faq-heading > *", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 78%" },
      });
      gsap.from(".faq-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 82%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="Frequently asked questions"
      className="bg-white py-16 md:py-24"
    >
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="faq-heading lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-3 font-aeonik text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-black sm:text-4xl md:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-[26rem] font-montreal text-base leading-relaxed text-body-2 md:text-lg">
              Everything donors, widows and missionaries ask us most. Can&apos;t
              find what you need?{" "}
              <a href="/contact-us" className="text-primary underline">
                Get in touch
              </a>
              .
            </p>
          </div>

          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="faq-list"
          >
            {data.map((item) => (
              <AccordionPrimitive.Item
                key={item.id}
                value={item.id}
                className="faq-item group border-b border-black/10 first:border-t"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left font-aeonik text-lg font-medium text-black transition-colors hover:text-primary md:text-xl">
                    <span>{item.header}</span>
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Plus className="h-4 w-4 group-data-[state=open]:hidden" />
                      <Minus className="hidden h-4 w-4 group-data-[state=open]:block" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="max-w-[38rem] pb-6 font-montreal text-sm leading-relaxed text-body-2 md:text-base">
                    {item.body}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </SectionContainer>
    </section>
  );
};

export default FAQs;
