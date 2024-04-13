import clsx from 'clsx';
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus(); 
  return (
    <button
      {...rest}
      className={clsx(
        'active:bg-violet-700 bg-violet-500 disabled:cursor-not-allowed disabled:opacity-90 flex font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 h-10 hover:bg-violet-600 items-center px-4 rounded-lg text-sm text-white transition-colors',
        className,
      )}
      disabled={pending}
    >
      {children}
    </button>
  );
}
