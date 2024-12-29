import Image from "next/image";

export default function Footer() {
  return (
    <footer className="md:mt-[100px] text-white md:text-foreground row-start-3 flex gap-6 flex-wrap items-center justify-center ">
      <a
        className="
        flex items-center gap-2 hover:underline hover:underline-offset-4
         md:bg-white md:bg-opacity-45 md:rounded md:p-1
        "
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
         md:bg-white md:bg-opacity-45 md:rounded md:p-1
        "
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
         md:bg-white md:bg-opacity-45 md:rounded md:p-1
        "
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
    </footer>
  );
}
