import React from 'react';
import Image from 'next/image';
import "@/resources/styling/components/statics/images.scss";

type ImageTypes = "default" | "logo" | "banner" | "gallery";

type ImageProps = {
  iS: string;
  type: ImageTypes;
  altText: string;
}

const variants = {
  "default": { className: "defaultImage", width: 100, height: 100 },
  "logo": { className: "logoImage", width: 150, height: 50 },
  "banner": { className: "bannerImage", width: 800, height: 400 },
  "gallery": { className: "galleryImage", width: 200, height: 200 }
}

export default function Images({ iS, type, altText }: ImageProps) {
  const { className, width, height } = variants[type ?? 'default'];

  return (
    <Image
      className={className}
      src={iS}
      width={width}
      height={height}
      alt={altText}
    />
  );
}