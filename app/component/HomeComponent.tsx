"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Itim } from 'next/font/google';
import { useRouter } from 'next/navigation';

const itim = Itim({
    weight: '400',
    subsets: ['latin'],
});

// Define the type for the timeLeft state
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function HomeComponent() {
    // const targetDate = new Date('2024-11-02T00:00:00').getTime();
    const targetDate = new Date('2024-10-28T21:19:00').getTime();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [musicActive, setMusicActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const route = useRouter();

    useEffect(() => {
        // Update the countdown every second
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                setIsFinished(true); // Set isFinished to true when the timer reaches zero
                clearInterval(timer); // Stop the timer
            }
        }, 1000);

        // Cleanup the timer on component unmount
        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft(): TimeLeft {
        const now = new Date().getTime(); // Get current timestamp
        const difference = targetDate - now; // Difference in milliseconds

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Time is up
        }
    }

    const setMusic = () => {
        if (!audioRef.current) return;

        if (musicActive) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio: ", error);
            });
        }
        setMusicActive(!musicActive);
    }

    const changePage = () => {
        route.push("/hbd");
    }

    return (
        <div className='p-[2rem] '>
            <audio ref={audioRef} src="/tulus.mp3" preload="auto" />
            <div className='flex justify-end'>
                <div className='space-y-1'>
                    <div className='w-full flex justify-center'>
                        <button onClick={setMusic}>
                            {
                                musicActive ? (
                                    <Image src="/musik-aktif.png" alt="Music Active" width={500} height={500} className='w-[1rem]' />
                                ) : (
                                    <Image src="/musik-nonaktif.png" alt="Music Inactive" width={500} height={500} className='w-[1.2rem]' />
                                )
                            }
                        </button>
                    </div>
                    <p className='text-[.7rem]'>Dengar Lagu</p>
                </div>
            </div>
            <div className="h-[80vh] flex justify-around">
                <div className="h-full flex items-center">
                    <div>
                        <div className='justify-around flex'>
                            <Image src="/kucing.png" alt="Cat" width={500} height={500} className='w-[5rem] animate-bounce' />
                        </div>
                        <div className='flex justify-center text-[3rem] px-[1rem]'>
                            <div className={itim.className}>
                                {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
                            </div>
                        </div>
                        <div>
                            {isFinished ? (
                                <p className='text-[1rem] justify-around flex'>Selamat Ulang Tahun</p>
                            ) : (
                                <p className='text-[1rem] justify-around flex'>Tunggu Ges...</p>
                            )}
                        </div>
                        <div className='flex justify-around'>
                            <button onClick={changePage} className={`w-[10rem] ${isFinished ? "bg-black" : "bg-gray-200"} flex justify-around py-[.5rem] rounded-md mt-[1rem]`} disabled={!isFinished}>
                                <Image src="/surprise.png" alt="Surprise" width={500} height={500} className='w-[2rem] invert' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
