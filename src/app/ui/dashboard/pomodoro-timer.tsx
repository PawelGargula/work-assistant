"use client";
import Image from "next/image";
import { TimerResetIcon } from "lucide-react";
import { useEffect, useState } from "react";

const timeEndKey = "timeEnd";

export default function PomodoroTimer() {
    const [timeToEndString, setTimeToEndString] = useState("Pomodoro Timer");
    const [isCounting, setIsCounting] = useState(false);

    const resetTimer = () => {
        const timeEnd = new Date().getTime() + 25 * 60 * 1000;
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
            <span>{timeToEndString}</span>
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