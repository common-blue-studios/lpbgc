import Footer from "@/components/footer";
import Nav from "@/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:flex md:flex-1">
      <Nav />
      <div className="md:flex-1">
        <div
          className="
            grid 
            grid-rows-[20px_1fr_20px] 
            min-h-screen p-8 
            pb-20 gap-16 
            sm:p-20 
            font-[family-name:var(--font-geist-sans)]
            "
        >
          <div
            className="
                flex flex-col gap-8"
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
