import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { type GradelineImagePreset } from "./GradelineHeroImage";

const aspectPresetClass: Record<GradelineImagePreset, string> = {
  hero: "min-h-[460px] sm:min-h-[520px] md:min-h-[680px] lg:min-h-[720px]",
  banner: "min-h-[260px] md:min-h-[340px]",
  category: "aspect-[16/11]",
  product: "aspect-[16/11]",
  square: "aspect-square",
};

type GradelineImageCardProps = {
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  href?: string;
  aspect?: GradelineImagePreset;
  sizes?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  children: ReactNode;
};

export default function GradelineImageCard({
  imageSrc,
  imageAlt = "",
  href,
  aspect = "product",
  sizes = "100vw",
  objectFit = "cover",
  objectPosition = "center",
  className = "",
  contentClassName = "p-6",
  imageClassName = "",
  overlayClassName = "bg-[linear-gradient(to_top,rgba(5,7,10,0.3),transparent)]",
  children,
}: GradelineImageCardProps) {
  const objectFitClassName =
    objectFit === "contain" ? "object-contain" : "object-cover";
  const cardClassName = `group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(24,31,38,0.72),rgba(7,9,12,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:border-blue-300/40 hover:bg-white/[0.07] ${className}`;

  const cardContent = (
    <>
      <div
        className={`relative w-full overflow-hidden border-b border-white/10 bg-black ${aspectPresetClass[aspect]}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes={sizes}
          className={`${objectFitClassName} transition duration-500 group-hover:scale-105 ${imageClassName}`}
          style={{ objectFit, objectPosition }}
        />
        {overlayClassName && (
          <div className={`absolute inset-0 ${overlayClassName}`} />
        )}
      </div>
      <div className={`flex flex-1 flex-col ${contentClassName}`}>
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return <article className={cardClassName}>{cardContent}</article>;
}
