// gallery-client.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";
import { ArtPiece } from "@/lib/api/gallery";

interface GalleryClientProps {
  initialArtPieces: ArtPiece[];
}

export function GalleryClient({ initialArtPieces }: GalleryClientProps) {
  const [filter, setFilter] = useState<"all" | "traditional" | "digital">("all");

  // Filter art pieces based on selected type
  const filteredArtPieces = initialArtPieces.filter(
    (piece) => filter === "all" || piece.type === filter
  );

  // Handle last viewed photo for modal-like functionality
  const [lastViewedPhoto, setLastViewedPhoto] = useState<string | null>(null);
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  // Ensure last viewed photo scrolls into view when closing modal
  useEffect(() => {
    if (lastViewedPhoto) {
      lastViewedPhotoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setLastViewedPhoto(null);
    }
  }, [lastViewedPhoto]);

  function loader({ src } : { src: string }) {
    return src;
  }
    

  return (
    <div className="flex justify-center items-center flex-col ">
      {/* Filter Buttons */}
      <Image 
        src="/gallery.png" 
        alt="About" 
        width={300} 
        height={300} 
      />
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          variant={filter === "all" ? "primary" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "traditional" ? "primary" : "outline"}
          onClick={() => setFilter("traditional")}
        >
          Traditional
        </Button>
        <Button
          variant={filter === "digital" ? "primary" : "outline"}
          onClick={() => setFilter("digital")}
        >
          Digital
        </Button>
      </div>

      {/* Art Pieces Grid */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {filteredArtPieces.map((piece) =>
          piece.assets.map((asset) =>
            <Link
              key={asset.id}
              href={`/gallery/${piece.type}/${asset.id}`}
              shallow
              className="relative mb-5 block w-full cursor-zoom-in group after:content-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              ref={asset.id === lastViewedPhoto ? lastViewedPhotoRef : null}
              onClick={() => setLastViewedPhoto(piece.id)}
            >
              <Image
                alt={`${piece.title} - ${piece.type} art`}
                className="transform rounded-lg brightness-90 transition group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={asset.blurDataUrl}
                src={asset.url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                loader={loader}
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
}
