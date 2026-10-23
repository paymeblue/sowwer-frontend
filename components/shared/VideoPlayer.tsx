"use client";

import { cn } from "@lib/cn";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  caption: string;
  /** Short label shown on the poster, e.g. the running time. */
  meta?: string;
  className?: string;
};

/**
 * A contained film player: poster plus a single centred play button.
 *
 * Nothing but the poster is requested until the visitor presses play — event
 * films run to tens of megabytes, so the <video> element itself is only
 * mounted on demand, then hands over to the native controls.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The poster-and-play-button figure, or the playing video.
 */
const VideoPlayer = ({ src, poster, caption, meta, className }: Props) => {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <figure className={cn("mx-auto w-full max-w-[56rem]", className)}>
      <div className="group relative aspect-video overflow-hidden rounded-[1.75rem] bg-secondary-black shadow-[0_30px_80px_-30px_rgba(3,6,33,0.55)] ring-1 ring-black/5">
        {started ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full bg-black object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label={`Play film: ${caption}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 960px) 100vw, 896px"
              className="photo-real object-cover transition-transform ease-out [transition-duration:1200ms] group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/[0.15] to-black/10"
            />

            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span
                aria-hidden
                className="absolute h-24 w-24 animate-ping rounded-full bg-primary/30 [animation-duration:2.4s] motion-reduce:animate-none md:h-28 md:w-28"
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-black shadow-[0_12px_40px_-8px_rgba(255,198,41,0.65)] transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                <Play size={30} className="ml-1 fill-current" />
              </span>
            </span>

            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left md:p-7">
              <span className="font-aeonik text-lg font-medium leading-tight text-white md:text-2xl">
                {caption}
              </span>
              {meta ? (
                <span className="shrink-0 rounded-full bg-white/[0.15] px-3 py-1 font-montreal text-xs text-white backdrop-blur-md">
                  {meta}
                </span>
              ) : null}
            </span>
          </button>
        )}
      </div>
    </figure>
  );
};

export default VideoPlayer;
