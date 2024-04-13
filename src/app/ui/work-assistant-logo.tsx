import pageLogo from "@/src/app/icon-white.svg";
import Image from "next/image";

export default function WorkAssistantLogo() {
  return (
    <div className="bg-violet-500 flex flex-row items-center leading-none p-3 rounded-md space-x-2 w-full">
      <Image src={pageLogo} alt="" width={24} height={24} className="inline-block text-white"/>
      <h1 className="text-2xl text-white">Work assistant</h1>
    </div>
  );
}