import { getArtPieces } from '@/lib/api/gallery'
import { GalleryClient } from './gallery-client'

export default async function GalleryPage() {
  const artPieces = await getArtPieces()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Art Gallery</h1>
      <GalleryClient initialArtPieces={artPieces} />
    </div>
  )
}

