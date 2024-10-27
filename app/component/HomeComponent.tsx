"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Itim } from 'next/font/google'

const itim = Itim({
    weight: '400',
    subsets: ['latin'], // Specify the subsets you need (e.g., 'latin')
});

// Define the type for the timeLeft state
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


export default function HomeComponent() {
    const targetDate = new Date('2024-11-02T00:00:00').getTime();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [musicActive, setMusicActive] = useState(true)

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        // Update the countdown every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup the timer on component unmount
        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft(): TimeLeft {
        const now = new Date().getTime(); // Get current timestamp
        const difference = targetDate - now; // Difference in milliseconds

        let timeLeft: TimeLeft;

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            // Time is up
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return timeLeft;
    }

    const setMusic = () => {
        setMusicActive(!musicActive)
    }

    console.log("statusnya", musicActive)
    return (
        <div className='p-[2rem]'>
            <audio ref={audioRef} src="/songs/song.mp3" preload="auto" />
            <div className='flex justify-end'>
                <button className='' onClick={setMusic}>
                    {
                        musicActive ? (
                            <Image src="/musik-aktif.png" alt="" width={500} height={500} className='w-[1rem]' />
                        ) : (
                            <Image src="/musik-nonaktif.png" alt="" width={500} height={500} className='w-[1.2rem]' />
                        )
                    }
                </button>
            </div>
            <div className="h-[80vh] flex justify-around">
                <div className="bg-red-200 h-full flex items-center">
                    <div >
                        <div className='justify-around flex'>
                            <Image src="/kucing.png" alt="" width={500} height={500} className='w-[5rem] animate-bounce' />
                        </div>
                        <div className='flex justify-center text-[3rem] px-[1rem]'>
                            <div className={itim.className}>
                                {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
                            </div>
                        </div>
                        <div>
                            <p className='text-[1rem] justify-around flex'>Tunggu Ges...</p>
                        </div>
                        <div className='flex justify-around'>
                            <button className='w-[10rem] bg-gray-200 flex justify-around py-[.5rem] rounded-md mt-[1rem] bg-black'>
                                <Image src="/surprise.png" alt="" width={500} height={500} className='w-[2rem] invert' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
