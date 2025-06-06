"use client"
import { 
  PencilIcon, 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import LinkLoadingIndicator from '@/src/app/ui/link-loading-indicator';

const initialState = {
  message: '',
}

export function UpdateTimeTrack({ id }: { id: string }) {
  const label = "Update Time track";
  return (
    <Link
      aria-label={label}
      className="border p-2 hover:text-violet-600 focus-visible:outline-violet-500 rounded-md"
      href={`/dashboard/time-tracks/${id}/edit`}
      title={label}
    >
      <LinkLoadingIndicator>
        <PencilIcon className="w-5" />
      </LinkLoadingIndicator>
    </Link>
  );
}