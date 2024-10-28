"use client"
import JSConfetti from 'js-confetti';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

export default function page() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [musicActive, setMusicActive] = useState(false)
    const [isFoto, setIsFoto] = useState(false);
    useEffect(() => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            confettiColors: ["#a855f7", "#3b0764", "#ef4444", "#ec4899", "#2563eb"],
        });
    }, [])

    const setMusic = () => {
        if (!audioRef.current) return;

        if (musicActive) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setMusicActive(!musicActive)
    }

    const changePhoto = () => {
        setIsFoto(!isFoto)
    }
    return (
        <div className="p-[2rem] relative bg-[url('/kertas.png')] bg-cover ">
            <audio ref={audioRef} src="/rex.mp3" preload="auto" />
            <div className='flex justify-end z-10 relative'>
                <div className='space-y-1'>
                    <div className='w-full flex justify-center'>
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
                    <p className='text-[.7rem]'>
                        Dengar Lagu
                    </p>
                </div>
            </div>
            <div className="h-[80vh] flex justify-around">
                <div className="h-full flex items-center">
                    <div>
                        <h1 className='font-bold text-[1.5rem] text-center mt-[3rem]'>Turut Bersuka Cita</h1>
                        <div className='relative'>
                            <h2 className='font-bold text-[1rem] text-center z-10 relative'>Atas <span className='text-white'>Berulangtahunnya</span></h2>
                            <div className='w-[49%] h-[2rem] bg-[#FF6B01] absolute top-0 right-[20%] rotate-2 z-0'></div>
                        </div>
                        <button onClick={changePhoto} className='w-full flex justify-center mt-[1rem] z-10 mt-[3rem]'>
                            {
                                isFoto ? (
                                    <Image src="/setelah.png" alt="" width={5000} height={5000} className='w-[80%]' />
                                ) : (
                                    <Image src="/foto.png" alt="" width={5000} height={5000} className='w-[80%]' />
                                )
                            }
                        </button>

                        <div className='text-center pt-[1rem] space-y-[1rem] mt-[1rem]'>
                            <p className='font-bold'>Ainun Qarimah Cahyatul Ikhlas</p>
                            <p className='text-[.7rem]'>Selamat berulang tahun, semoga panjang umur dan sehat selalu, selamat lah pokoknya, semoga terus jadi orang yang menyenangkan. Ashek, alayna kata-kataku di</p>
                        </div>
                        <div className='pt-[2rem] w-[60%]'>
                            <div>
                                <p className='font-bold text-[.5rem]'>Bertanda Tangan Dibawah Ini</p>
                                <p className='font-bold text-[.3rem]'>Someone that have a feeling for you</p>
                                <div className='flex'>
                                    <Image src="/ttd.png" alt="" width={5000} height={5000} className='w-[50%]' />
                                </div>
                                <p className='font-bold text-[.5rem]'>Guntek, 2-November-2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
