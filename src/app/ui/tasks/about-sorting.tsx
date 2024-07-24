'use client';
import { useRef } from "react";
import { XMarkIcon, ArrowLongDownIcon } from "@heroicons/react/24/outline";

export default function AboutSorting() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <dialog ref={dialogRef} className="max-w-sm p-4 rounded-md">
                <div className="border-b flex gap-8 justify-between items-center pb-2">
                    <h2 className="text-xl">About sorting order</h2>
                    <button 
                        aria-label="Close" 
                        className="focus-visible:outline-violet-500 hover:text-violet-700"
                        onClick={() => dialogRef.current?.close()}
                        title="Close"
                        type="button"
                    >
                        <XMarkIcon className="w-5" />
                    </button>
                </div>
                <div className="py-2">
                    <ol className="list-[upper-roman] ml-5">
                        <li>Status
                            <ol className="list-decimal ml-5 text-sm">
                                <li>Tracking</li>
                                <li>Not tracking</li>
                                <li>Completed</li>    
                            </ol>
                        </li>
                        <li>Last modified</li>
                        <li>Last created</li>
                    </ol>
                </div>
            </dialog>
            <button
                className='border border-gray-200 flex focus-visible:outline-violet-500 gap-1 hover:text-violet-600 items-center p-1 rounded-md text-sm'
                title="About sorting order"
                type="button"
                onClick={() => dialogRef.current?.showModal()}
            >
                <span>Sorting</span>
                <ArrowLongDownIcon className="w-4" />
            </button>
        </>
    )
}