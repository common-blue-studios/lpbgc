import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:flex md:flex-1">
    <Nav />
    <div className="md:flex-1">
      <div className="
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]
        bg-[url('/hero-pattern.png')] bg-cover md:bg-contain bg-no-repeat bg-center
        ">
        <main 
          className="
            flex flex-col gap-8 row-start-2 items-center"
          >
          <Image
            className="dark:invert"
            src="/hero-name.png"
            alt="Next.js logo"
            width={340}
            height={370}
            priority
          />
          <p className="text-white  text-center font-[family-name:var(--font-geist-mono)]">
              visual artist, designer
          </p>
        </main>
      
        <Footer />
      </div>
    </div>
   </div>
  );
}
