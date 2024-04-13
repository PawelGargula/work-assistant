import clsx from "clsx";
import { ReactElement } from "react";

export default function Toggle({ 
    label, pressed, onPressedChanged, children 
}: {
    label: string, pressed: boolean, onPressedChanged: () => void, children: ReactElement
}) {
    return (
        <button 
            aria-label={label}
            className={clsx(
                'hover:bg-violet-100 focus-visible:outline-violet-500 p-1 rounded-md',
                { 'bg-violet-200': pressed }
            )}
            onClick={onPressedChanged}
            type="button"
        >
            {children}
        </button>       
    );
}