import NavLinks from '@/src/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import WorkAssistantLogo from '@/src/app/ui/work-assistant-logo';
import PomodoroTimer from '@/src/app/ui/dashboard/pomodoro-timer';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col md:px-2">
      <div
        className="bg-violet-500 mb-2 rounded-md text-white"
      >
        <WorkAssistantLogo />
      </div>
      <div className="flex grow flex-row flex-wrap justify-between gap-2 md:flex-col">
        <PomodoroTimer />
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium focus-visible:outline-violet-500 hover:text-violet-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}