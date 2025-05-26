'use client';

import { useLinkStatus } from 'next/link';
import PendingAnimation from '@/src/app/ui/pending-animation';

export default function LinkLoadingIndicator({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  const { pending } = useLinkStatus();
  
  return pending ? (
    <PendingAnimation />
  ) : children;
}