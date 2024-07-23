'use client';
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function EmailPreview({ email } : { email: string | null | undefined; }) {
    const [isMasked, setIsMasked] = useState(true);
    
    const toggleMask = () => {
        setIsMasked(isMasked => !isMasked);
    };

    const maskEmail = (email: string | null | undefined) => {
        if (!email) return ""; 

        const [name, domain] = email.split('@');
        const maskedName = name.length > 3 ? name.substring(0, 3).padEnd(name.length, '*') : name;
        const maskedDomain = domain.replace(/.(?=.*\.)/g, '*');
        return `${maskedName}@${maskedDomain}`;
    };

    const maskedEmail = maskEmail(email);
    
    const label = isMasked ? "Show Email" : "Hide Email";

    return (
        <div className="flex gap-2 items-center overflow-auto">
            <button aria-label={label} className="border bg-white focus-visible:outline-violet-500 hover:text-violet-700 p-2 rounded-md" onClick={toggleMask} title={label} type="button">
                { isMasked ? <EyeIcon className="w-5"/> : <EyeSlashIcon className="w-5"/> }
            </button>
            <span className="font-medium">Email:</span>
            <span>{isMasked ? maskedEmail : email}</span>
        </div>
    )
}