import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import TermsOfServiceContent from "@/src/app/ui/terms-of-service/terms-of-service-content";

export const metadata: Metadata = {
    title: 'Terms of Service and Privacy Policy',
}

export default async function Page() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    !isLoggedIn && redirect("/");

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl md:mb-8">
                Terms of Service and Privacy Policy
            </h1>
            <div className="bg-gray-50 divide-y md:px-6 md:py-2 px-4 py-2 rounded-md">
                <TermsOfServiceContent />
            </div>
        </main>
    );
}