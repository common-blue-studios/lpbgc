import { getAboutContent } from "@/lib/api/about";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function About() {
  const data = await getAboutContent();
  if(!data) {
    return <div>Data unavailable</div>;
  }
  return (
    <div className="place-items-center place-content-center">
      <Image 
        src="/about.png" 
        alt="About" 
        width={300} 
        height={300} 
      />
        <Image 
          src={data.banner}
          alt={data.title}
          width={600} 
          height={300} 
        />
        <div className="max-w-2xl mx-auto ">
        <Markdown className="prose gap-2">
            {data.content}
          </Markdown>
      </div>
    </div>
  );
}
