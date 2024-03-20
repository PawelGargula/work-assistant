import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold p-2">Welcome in Work assitant</h1>
      <p><Link className="font-medium p-1 text-blue-600 underline hover:no-underline" href='/api/auth/signin'>Sign in by email activation link</Link> to get our features.</p>
    </>
  );
}
