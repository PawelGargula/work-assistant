import { auth } from '@/auth';
import { redirect } from 'next/navigation'
 
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");
  
  return (
    <>
      <h1 className='text-lg'>Dashboard</h1>
    </>
  );
}