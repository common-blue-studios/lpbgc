import { notFound } from "next/navigation";
import { getArtPieces } from "@/lib/api/gallery";
import Carousel from "@/components/carousel";

interface PhotoPageProps {
  params: {
    slug: string;
    photoId: string;
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { slug, photoId } = await params;

  const artPieces = await getArtPieces();

  const artPiece = artPieces.find((piece) => piece.type === slug);
  if (!artPiece) {
    notFound();
  }

  // Find the specific photo within the art piece's assets
  const photo = artPiece.assets.find((asset) => asset.id === photoId);

  if (!photo) {
    notFound();
  }

  return (
    <div className="relative mx-auto max-w-[1960px] h-full p-4">
      <Carousel
        index={photo.id as any}
        currentPhoto={photo as any}
        slug={slug}
      />
    </div>
  );
}
