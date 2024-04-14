import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
}
 
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");
  
  return (
    <>
      <h1 className='text-lg'>Welcome {session?.user?.email}</h1>
    </>
  );
}