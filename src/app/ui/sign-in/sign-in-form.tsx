'use client'
import { authenticate } from '@/src/app/lib/actions';
import SignInButton from '@/src/app/ui/sign-in/sign-in-button';
import TermsOfService from '@/src/app/ui/sign-in/terms-of-service';
import { useState, useActionState } from 'react';

export default function SignInForm() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  const [isTermsOfServiceAccepted, setIsTermsOfServiceAccepted] = useState(false);

  return (
    <>
      <form action={dispatch} className="rounded-md bg-white p-2 text-sm">
        <input 
          aria-label='e-mail'
          className='block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus-visible:outline-violet-500'
          id='e-mail' 
          name='e-mail' 
          placeholder='jan.kowalski@domain.com' 
          required 
          type="email" 
        />
        <TermsOfService 
          isTermsOfServiceAccepted={isTermsOfServiceAccepted} 
          setIsTermsOfServiceAccepted={setIsTermsOfServiceAccepted} 
        />
        <SignInButton isTermsOfServiceAccepted={isTermsOfServiceAccepted} />
      </form>
    </>
  );
}