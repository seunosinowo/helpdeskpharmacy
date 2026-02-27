"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  "/pic1.webp",
  "/pic2.webp",
  "/pic3.webp",
  "/pic4.webp",
  "/pic5.webp",
];

export function HeroCarousel() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
      }}
      className="w-full h-full"
    >
      <CarouselContent className="h-full ml-0">
        {heroImages.map((img, index) => (
          <CarouselItem key={index} className="pl-0 h-full w-full relative">
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`Pharmaceutical Excellence ${index + 1}`}
                fill
                className="object-cover object-top"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
