import { Dispatch, SetStateAction, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import TermsOfServiceContent from "@/src/app/ui/terms-of-service/terms-of-service-content";

export default function TermsOfService({
    isTermsOfServiceAccepted,
    setIsTermsOfServiceAccepted
} : {
    isTermsOfServiceAccepted: boolean | undefined;
    setIsTermsOfServiceAccepted: Dispatch<SetStateAction<boolean>>
    ;
}) {
    const dialogRef = useRef<any>(null);

    return (
        <>
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
                    Agree our {" "}
                    <button className="focus-visible:outline-violet-500 hover:underline text-violet-700" 
                        onClick={(e) => {
                            e.preventDefault();
                            dialogRef.current?.showModal();
                        }} type="button"
                    >
                        Terms of Service and Privacy Policy
                    </button> 
                    {" "} to Sign in
                </label>
            </div>
            <dialog ref={dialogRef} className="max-w-screen-2xl rounded-md">
                <div className="bg-white flex justify-between items-center px-4 py-2 shadow sticky top-0">
                    <h2 className="font-medium text-lg">Terms of Service and Privacy Policy</h2>
                    <button 
                        autoFocus={true}
                        aria-label="Close" 
                        className="focus-visible:outline-violet-500 hover:text-violet-700"
                        onClick={() => dialogRef.current?.close()}
                        title="Close"
                        type="button"
                    >
                        <XMarkIcon className="w-5" />
                    </button>
                </div>
                <div className="divide-y px-6 pb-6">
                    <TermsOfServiceContent />
                    <button
                         className="active:bg-violet-700 bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 hover:bg-violet-600 inline-flex items-center justify-center mt-2 py-1.5 rounded-md text-white w-full" 
                         onClick={() => {
                            dialogRef.current?.close();
                            setIsTermsOfServiceAccepted(true);
                         }}
                         type="button"
                    >Agree</button>
                </div>
            </dialog>
        </>
    )
}