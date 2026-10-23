"use client";

import { cn } from "@lib/cn";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "placeholder"> & {
  /** Classes for the wrapper that carries the loading shimmer. */
  wrapperClassName?: string;
};

/**
 * next/image with a loading state that suits heavy documentary photos.
 *
 * Off-screen frames stay lazy (the default) and are fetched at low priority
 * unless `priority` is set, so they never compete with the LCP image. While
 * a frame is in flight the wrapper shows a warm shimmer; once decoded the
 * photo resolves from a slight blur and scale into place instead of popping
 * in line by line.
 *
 * @param {Props} props Component props.
 * @return {JSX.Element} The image inside its loading wrapper.
 */
const SmartImage = ({
  wrapperClassName,
  className,
  priority,
  fetchPriority,
  onLoad,
  alt,
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn(
        "smart-image absolute inset-0 block overflow-hidden",
        !loaded && "smart-image-loading",
        wrapperClassName
      )}
    >
      <Image
        {...props}
        alt={alt}
        priority={priority}
        fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "transition-[opacity,filter,transform] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          loaded
            ? "scale-100 opacity-100 blur-0"
            : "scale-[1.03] opacity-0 blur-md",
          className
        )}
      />
    </span>
  );
};

export default SmartImage;
