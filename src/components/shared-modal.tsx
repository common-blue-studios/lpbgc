import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { variants } from "../utils/animation-variants";
import type { ImageProps, SharedModalProps } from "../utils/types";
import { ArrowLeft, Download } from "lucide-react";

export default function SharedModal({
  index,
  images,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  function handleDownload(photo: ImageProps)
  {
    window.open(`${photo.url}`, '_blank');
  }

  const currentImage = images ? images[index] : currentPhoto;

  if(!currentImage){
    return <div>Imagem não encontrada</div>
  }

  const loader = ({ src }: { src: string }) => {
    return src;
  }

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={`${currentImage.url}`}
                  width={navigation ? 1280 : 1920}
                  height={(navigation ? 1280 : 1920) * (2 / 3)} // Aspect ratio 3:2
                  priority
                  alt="Main photo"
                  onLoad={() => setLoaded(true)}
                  loader={loader}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

          {/* Buttons + bottom nav bar */}
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
          
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => handleDownload(currentImage)}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
