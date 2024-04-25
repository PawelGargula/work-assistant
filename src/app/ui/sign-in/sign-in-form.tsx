'use client'
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/src/app/lib/actions';
 
export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
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
        <SignInButton />
      </form>
    </>
  );
}
 
function SignInButton() {
  const { pending } = useFormStatus();
 
  return (
    <div className=''>
      <button 
        className="active:bg-violet-700 bg-violet-500 disabled:cursor-not-allowed disabled:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 hover:bg-violet-600 inline-flex items-center justify-center mt-2 py-1.5 rounded-md text-white w-full" 
        disabled={pending} 
        type='submit' 
      >
        {pending && 
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        }
        {pending ? "Processing..." : "Sign in"}
        {!pending && 
          <ArrowRightIcon className="ml-1 h-5 w-5" />
        }
      </button>
    </div>
  );
}