import { getArtPieces } from '@/lib/api/gallery'
import { GalleryClient } from './gallery-client'

export default async function GalleryPage() {
  const artPieces = await getArtPieces()

  return (
    <div className="container mx-auto px-4 py-8">
      <GalleryClient initialArtPieces={artPieces} />
    </div>
  )
}

