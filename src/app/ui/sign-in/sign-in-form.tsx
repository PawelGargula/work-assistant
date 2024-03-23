'use client'
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/src/app/lib/actions';
 
export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
  return (
    <>
      <form action={dispatch} className="rounded-md bg-slate-50 p-2 text-sm">
        <input 
          className='block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400'
          id='e-mail' 
          name='e-mail' 
          placeholder='jan.kowalski@domain.com' 
          required 
          type="e-mail" 
          aria-label='e-mail'
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
        className="mt-2 w-full px-5 py-1.5 text-white bg-violet-500 rounded-md hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" 
        disabled={pending} 
        type='submit' 
      >
        Sign in
      </button>
    </div>
  );
}