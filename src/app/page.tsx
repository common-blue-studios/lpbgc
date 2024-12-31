import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { PRESENTATION } from "@/config/presentation";
import Image from "next/image";

export default function Home() {
  const { heroBackgroundImg, heroLogoImg, subtitle } = PRESENTATION.home;

  return (
    <div className="md:flex md:flex-1">
      <Nav />
      <div className="md:flex-1">
        <div
          style={{
            backgroundImage: `url(${heroBackgroundImg})`,
          }}
          className={`
        grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]
         bg-cover md:bg-contain bg-no-repeat bg-center
        `}
        >
          <main
            className="
            flex flex-col gap-8 row-start-2 items-center"
          >
            <Image
              className="dark:invert"
              src={heroLogoImg}
              alt="Next.js logo"
              width={340}
              height={370}
              priority
            />
            <p className="text-white  text-center font-[family-name:var(--font-geist-mono)]">
              {subtitle}
            </p>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
