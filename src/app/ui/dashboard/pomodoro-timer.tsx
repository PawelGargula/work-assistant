"use client";
import Image from "next/image";
import { TimerResetIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const timeEndKey = "timeEnd";
const timerMinutesKey = "timerMinutes";

export default function PomodoroTimer() {
    const [timeToEndString, setTimeToEndString] = useState("Pomodoro Timer");
    const [isCounting, setIsCounting] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const timerMinutesRef = useRef<HTMLInputElement>(null);

    const resetTimer = () => {
        const isTimerMinutesSet = Boolean(Number(localStorage.getItem(timerMinutesKey)));
        if (!isTimerMinutesSet) {
            localStorage.setItem(timerMinutesKey, "25");
        }
        
        const timerMinutes = Number(localStorage.getItem(timerMinutesKey));
        const timeEnd = new Date().getTime() + timerMinutes * 60 * 1000;
        localStorage.setItem(timeEndKey, timeEnd.toString());
        setIsCounting(true);
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeToEnd = getTimeToEnd();

            if (isCounting) {
                const timeToEndString = getTimeToEndString(timeToEnd);
                setTimeToEndString(timeToEndString);
                document.title = `${timeToEndString} | Work assistant`;    
            }

            if (timeToEnd < 0 && isCounting) {
                setIsCounting(false);
                //sound from https://freesound.org/s/22627/
                const alarm = new Audio("/alarm.flac");
                alarm.play();
                let counter = 1;
                alarm.onended = () => {
                    if (counter < 3) {
                        counter++;
                        alarm.play();
                    }
                };
            } else if (timeToEnd >= 0 && !isCounting) {
                setIsCounting(true);
            }

            if (timeToEnd < 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isCounting]);

    return (
        <div className="border-2 border-gray-50 flex font-medium gap-2 h-[48px] items-center justify-between md:p-2 md:px-3 p-3 rounded-md  w-full">
            <Image alt="pomodoro timer" className="w-6" src="/tomato.png" width={24} height={24} />
            <dialog ref={dialogRef} className="max-w-sm p-4 rounded-md">
                <div className="border-b flex gap-8 justify-between items-center pb-2">
                    <h2 className="text-xl">Set Timer minutes</h2>
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
                    <form action={() => {
                        dialogRef.current?.close();
                        const timerMinutes = timerMinutesRef.current!.value;
                        localStorage.setItem(timerMinutesKey, timerMinutes);
                    }}>
                        <label htmlFor="timer-minutes" className="font-medium">
                            Timer minutes
                        </label>
                        <input
                            className="bg-white block border border-slate-300 focus-visible:outline-violet-500 px-3 py-2 rounded-md w-full"
                            id="timer-minutes"
                            min={1}
                            max={99}
                            name="timer-minutes"
                            ref={timerMinutesRef}
                            type="number"
                        />
                        <button
                            className="active:bg-violet-700 bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 hover:bg-violet-600 mt-2 py-1.5 rounded-md text-white w-full" 
                            type="submit"
                        >Set</button>
                    </form>
                </div>
            </dialog>
            <button
                className='focus-visible:outline-violet-500 hover:text-violet-600 px-1'
                title="Set Timer minutes"
                type="button"
                onClick={() => {
                    dialogRef.current?.showModal();
                    
                    const isTimerMinutesSet = Boolean(Number(localStorage.getItem(timerMinutesKey)));
                    if (!isTimerMinutesSet) {
                        localStorage.setItem(timerMinutesKey, "25");
                    }

                    const timerMinutes = localStorage.getItem(timerMinutesKey) ?? "";
                    timerMinutesRef.current!.value = timerMinutes;
                }}
            >
                {timeToEndString}
            </button>
            <button 
                aria-label="Reset timer" 
                className="focus-visible:outline-violet-500 hover:text-violet-500" 
                onClick={resetTimer}
                title="Reset timer" 
                type='button'
            >
                <TimerResetIcon className="w-6" />
            </button>
        </div>
    )
}

function getTimeToEndString(timeToEnd: number) {
    const minutes = Math.floor(timeToEnd / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.floor((timeToEnd % (1000 * 60)) / 1000).toString().padStart(2, "0");
    const timeToEndString = timeToEnd < 0 ? "Break time" : `${minutes}:${seconds}`;
    return timeToEndString;
}

function getTimeToEnd() {
    const now = new Date().getTime();
    const timeEnd = Number(localStorage.getItem(timeEndKey));
    const timeToEnd = timeEnd - now;
    return timeToEnd;
}