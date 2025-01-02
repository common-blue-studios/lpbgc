import { PRESENTATION } from "@/config/presentation";
import Image from "next/image";

export default function Footer({showUnderline = true}: {showUnderline?: boolean}) {

  const { instagram, bluesky, behance } = PRESENTATION.footer;
  
  return (
    <footer className={`
      fixed bottom-0 w-full p-4 bg-white  text-white  border-gray-700
      ${showUnderline ? 'border-t' : ''}
    `}>
      <div className="flex gap-6 flex-wrap items-center justify-center md:ml-[120px]">
        <a
          className="
          flex items-center gap-2 hover:underline hover:underline-offset-4
          "
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/instagram.svg"
            alt="Instagram icon"
            width={18}
            height={18}
          />
        </a>
        <a
          className="
          flex items-center gap-2 hover:underline hover:underline-offset-4
          "
          href={bluesky}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/bluesky.svg"
            alt="Bluesky icon"
            width={18}
            height={18}
          />
        </a>
        <a
          className="
          flex items-center gap-2 hover:underline hover:underline-offset-4
          "
          href={behance}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/behance.svg"
            alt="Behance icon"
            width={18}
            height={18}
          />
        </a>
      </div>
    </footer>
  );
}
