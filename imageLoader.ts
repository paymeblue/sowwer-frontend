"use client";

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  return `https://sower-bucket.s3.amazonaws.com/${src}?w=${width}&q=${
    quality || 75
  }`;
}
