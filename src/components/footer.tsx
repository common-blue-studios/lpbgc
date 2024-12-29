import Image from "next/image";

export default function Footer() {
  return (
    <footer className="
      fixed bottom-0 w-full p-4 bg-white  text-white border-t border-gray-700
    ">
      <div className="flex gap-6 flex-wrap items-center justify-center md:ml-[120px]">
        <a
          className="
          flex items-center gap-2 hover:underline hover:underline-offset-4
          "
          href="https://www.instagram.com/luana.g.m/"
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
          href="https://bsky.app/profile/luanagm.bsky.social"
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
          href="https://www.behance.net/luana_goes"
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
