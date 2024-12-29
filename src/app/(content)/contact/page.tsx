import { getContactContent } from "@/lib/api/contact";
import Image from "next/image";
import Markdown from "react-markdown";

export default async function About() {
  const data = await getContactContent();
  if(!data) {
    return <div>Data unavailable</div>;
  }
  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <Image 
        src="/contact.png" 
        alt="Contact" 
        width={300} 
        height={300} 
      />
      <div className="max-w-[800px] flex flex-col gap-4 p-6 text-center justify-center items-center">
        <Markdown>
            {data.content}
          </Markdown>
      </div>
    </div>
  );
}
