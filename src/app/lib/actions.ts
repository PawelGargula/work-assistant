'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("e-mail");
    await signIn("nodemailer", { email: email, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
        return 'Something went wrong.';
    }
    throw error;
  }
}