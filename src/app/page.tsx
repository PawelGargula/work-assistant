import { auth } from '@/auth';
import { redirect } from 'next/navigation'
import SignInForm from "@/src/app/ui/sign-in/sign-in-form";
import WorkAssistantLogo from "./ui/work-assistant-logo";
import Image from 'next/image';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  isLoggedIn && redirect("/dashboard");
  
  return (
    <div className="space-y-2 p-3">
      <WorkAssistantLogo />
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center md:w-2/5">
          <div className='bg-gray-50 md:px-10 p-6 px-6 py-10 rounded-lg space-y-3'>
          <p className="bg-white p-2 rounded-md text-sm">Increase efficiency and pleasure of your work</p>
          <SignInForm />
          <p className="bg-white p-2 rounded-md text-sm">Add tasks with time estimation</p>
          <p className="bg-white p-2 rounded-md text-sm">Start/stop tracking time of current task</p>
          <p className="bg-white p-2 rounded-md text-sm">Generate reports of your work</p>    
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-7 md:py-12">
          <Image 
            src="/desktop.png"
            width={1920}
            height={1080}
            alt="Screenshots of the project"
          />
        </div>
      </div>
    </div>
  );
}
