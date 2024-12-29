"use client";
import type { ImageProps } from '../utils/types'
import SharedModal from './shared-modal'

export default function Carousel({
  index,
  currentPhoto,
}: {
  index: number
  currentPhoto: ImageProps,
}) {
  function closeModal() {
    // setLastViewedPhoto(currentPhoto)
    window.history.back()
  }

  function changePhotoId(newVal: number) {
    return newVal
  }
 
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />
    </div>
  )
}
