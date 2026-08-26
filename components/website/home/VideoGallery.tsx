"use client";

import SectionContainer from "@components/sections/SectionContainer";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@lib/gsap";
import { josVideos } from "@lib/soowerContent";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ClipProps = { src: string; poster: string; caption: string };

const LoopingClip = ({ src, poster, caption }: ClipProps) => {
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
      className="video-card group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-secondary-black"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black transition-opacity group-hover:opacity-100 sm:opacity-0"
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4">
        <p className="font-montreal text-sm text-white">{caption}</p>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".video-card", {
        y: 30,
        opacity: 0,
        scale: 0.97,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="In the field"
      className="bg-[#FCF9F2] px-4 py-12 sm:px-6 sm:py-16 md:py-20"
    >
      <SectionContainer>
        <div className="mx-auto max-w-[41.625rem] space-y-3 text-center">
          <h3 className="font-aeonik text-2xl font-medium leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.8125rem]">
            In the field
          </h3>
          <p className="font-montreal text-base text-body-2 md:text-lg">
            Real footage from the Widows & Youth Conference in Jos — volunteers,
            welfare parcels, and the people we serve.
          </p>
        </div>
        <div className="mx-auto mt-10 grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {josVideos.map((video) => (
            <LoopingClip
              key={video.key}
              src={video.src}
              poster={video.poster}
              caption={video.caption}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default VideoGallery;
