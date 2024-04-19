"use client"
import { 
  PencilIcon, 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const initialState = {
  message: '',
}

export function UpdateTimeTrack({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/time-tracks/${id}/edit`}
      className="border p-2 hover:text-violet-600 focus-visible:outline-violet-500 rounded-md"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}