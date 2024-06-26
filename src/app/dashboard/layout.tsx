import SideNav from '@/src/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden p-3">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow py-6 md:px-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}