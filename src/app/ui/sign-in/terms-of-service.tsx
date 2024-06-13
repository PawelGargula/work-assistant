import { Dispatch, SetStateAction } from "react";

export default function TermsOfService({
    isTermsOfServiceAccepted,
    setIsTermsOfServiceAccepted
} : {
    isTermsOfServiceAccepted: boolean | undefined;
    setIsTermsOfServiceAccepted: Dispatch<SetStateAction<boolean>>
    ;
}) {
    return (
        <div className='flex items-center mt-3 mb-1'>
            <input 
                className="accent-violet-500 border border-slate-300 cursor-pointer focus-visible:outline-violet-500 h-4 w-4" 
                id="accept-terms-of-service" 
                name="accept-terms-of-service" 
                onChange={(e) => setIsTermsOfServiceAccepted(prevValue => !prevValue)}
                type="checkbox" 
                checked={isTermsOfServiceAccepted}
            />
            <label className="cursor-pointer ml-2" htmlFor='accept-terms-of-service'>
                Accept our {" "}
                <button className="focus-visible:outline-violet-500 hover:underline text-violet-700" 
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Clicked");
                    }} type="button"
                >
                    Terms of Service and Privacy Policy
                </button> 
                {" "} to Sign in
            </label>
        </div>
    )
}