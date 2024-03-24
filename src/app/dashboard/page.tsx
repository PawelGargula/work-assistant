import { auth } from '@/auth';
import { redirect } from 'next/navigation'
 
export default async function Page() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  !isLoggedIn && redirect("/");
  
  return (
    <>
      <p>Welcome {session?.user?.email}!</p>
    </>
  );
}