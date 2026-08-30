"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { josVideos } from "@lib/soowerContent";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ClipProps = {
  src: string;
  poster: string;
  caption: string;
  category: string;
};

const LoopingClip = ({ src, poster, caption, category }: ClipProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="video-card group relative flex h-[26rem] w-72 shrink-0 snap-start flex-col items-start justify-start overflow-hidden rounded-3xl bg-secondary-black md:h-[34rem] md:w-96"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-2/3 bg-gradient-to-b from-black/70 via-black/10 to-transparent" />
      <div className="relative z-40 p-6 md:p-8">
        <p className="font-montreal text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          {category}
        </p>
        <p className="mt-2 max-w-[14rem] font-aeonik text-xl font-medium text-white [text-wrap:balance] md:text-2xl">
          {caption}
        </p>
      </div>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="photo-real absolute inset-0 z-10 h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black transition-opacity group-hover:opacity-100 sm:opacity-0"
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
};

const categories = [
  "Welfare distribution",
  "On the ground",
  "Field footage",
  "Jos, Plateau State",
];

const VideoGallery = () => {
  const scope = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".video-card", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    },
    { scope }
  );

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section
      ref={scope}
      aria-label="In the field"
      className="bg-[#FCF9F2] py-12 sm:py-16 md:py-20"
    >
      <SectionContainer>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[36rem] space-y-3">
            <span className="eyebrow">Real footage</span>
            <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.8125rem]">
              In the field
            </h3>
            <p className="font-montreal text-base text-body-2 md:text-lg">
              Real footage from the Widows &amp; Youth Conference in Jos —
              volunteers, welfare parcels, and the people we serve.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-light-grey text-black transition-colors hover:border-black"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-light-grey text-black transition-colors hover:border-black"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </SectionContainer>
      {/* Same geometry as SectionContainer so the rail's first card lines up
          with the heading above it on every viewport. */}
      <div
        ref={railRef}
        className="scrollbar-none mx-auto mt-10 flex w-full max-w-[2000px] snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto scroll-smooth px-6 pb-4 lg:scroll-pl-20 lg:px-20"
      >
        {josVideos.map((video, i) => (
          <LoopingClip
            key={video.key}
            src={video.src}
            poster={video.poster}
            caption={video.caption}
            category={categories[i % categories.length]}
          />
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>
    </section>
  );
};

export default VideoGallery;
