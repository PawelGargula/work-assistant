import SignInForm from "@/src/app/ui/sign-in/sign-in-form";
import WorkAssistantLogo from "./ui/work-assistant-logo";

export default function Home() {
  return (
    <div className="space-y-2">
      <WorkAssistantLogo />
      <p className="bg-slate-50 p-2 rounded-md text-sm">Increase efficiency and pleasure of your work</p>
      <SignInForm />
      <p className="bg-slate-50 p-2 rounded-md text-sm">Add hierarchical tasks with time estimation</p>
      <p className="bg-slate-50 p-2 rounded-md text-sm">Start/stop tracking time of current task</p>
      <p className="bg-slate-50 p-2 rounded-md text-sm">Generate reports of your work</p>
      {/* Screens from application */}
    </div>
  );
}
