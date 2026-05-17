import Image, { type StaticImageData } from "next/image";
import { type ReactNode } from "react";

export type GradelineImagePreset =
  | "hero"
  | "banner"
  | "category"
  | "product"
  | "square";

const aspectPresetClass: Record<GradelineImagePreset, string> = {
  hero: "min-h-[460px] sm:min-h-[520px] md:min-h-[680px] lg:min-h-[720px]",
  banner: "min-h-[260px] md:min-h-[340px]",
  category: "aspect-[16/11]",
  product: "aspect-[16/11]",
  square: "aspect-square",
};

type GradelineHeroImageProps = {
  src: string | StaticImageData;
  mobileSrc?: string | StaticImageData;
  alt?: string;
  preset?: GradelineImagePreset;
  sizes?: string;
  priority?: boolean;
  preload?: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  mobileObjectPosition?: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
};

export default function GradelineHeroImage({
  src,
  mobileSrc,
  alt = "",
  preset = "banner",
  sizes = "100vw",
  priority = false,
  preload = false,
  objectFit = "cover",
  objectPosition = "center",
  mobileObjectPosition,
  className = "",
  imageClassName = "",
  children,
}: GradelineHeroImageProps) {
  const objectFitClassName =
    objectFit === "contain" ? "object-contain" : "object-cover";
  const sharedClassName = `${objectFitClassName} ${imageClassName}`.trim();

  return (
    <div
      className={`relative overflow-hidden bg-black ${aspectPresetClass[preset]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        preload={preload}
        sizes={sizes}
        className={mobileSrc ? `hidden md:block ${sharedClassName}` : sharedClassName}
        style={{ objectFit, objectPosition }}
      />

      {mobileSrc && (
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          priority={priority}
          preload={preload}
          sizes={sizes}
          className={`md:hidden ${sharedClassName}`}
          style={{
            objectFit,
            objectPosition: mobileObjectPosition ?? objectPosition,
          }}
        />
      )}

      {children}
    </div>
  );
}
