import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import EmailPreview from '@/src/app/ui/account/email-preview';
import DeleteAccout from '@/src/app/ui/account/delete-account';

export const metadata: Metadata = {
    title: 'Account',
}

export default async function Page() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    !isLoggedIn && redirect("/");

    return (
    <main>
        <h1 className="mb-4 text-xl md:text-2xl md:mb-8">
            Account
        </h1>
        <EmailPreview email={session?.user?.email}/>
        <DeleteAccout email={session?.user?.email}/>
    </main>
    );
}