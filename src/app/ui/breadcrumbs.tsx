import { clsx } from 'clsx';
import Link from 'next/link';
import LinkLoadingIndicator from '@/src/app/ui/link-loading-indicator';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className='flex text-xl md:text-2xl'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              'flex items-center',
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            {breadcrumb.active ? 
            <span>{breadcrumb.label}</span> : 
            <Link className='flex items-center gap-2 focus-visible:outline-violet-500 hover:text-violet-600 hover:underline' href={breadcrumb.href}>
              <span>{breadcrumb.label}</span>
              <LinkLoadingIndicator />
            </Link>}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
