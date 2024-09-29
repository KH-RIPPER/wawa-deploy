"use client";
import Leaderboard from "./Leaderboard";
import { useState, useMemo, useEffect } from "react";
import { useClick } from "@/contexts/click";
import debounce from "lodash.debounce";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import WawaCat from "@/assets/wawa-cat.png";
import WawaCry from "@/assets/wawa-cry.png";
import GhostBl from "@/assets/ghostbl.png";
import GhostBr from "@/assets/ghostbr.png";
import GhostTr from "@/assets/ghosttr.png";
import GhostTc from "@/assets/ghosttc.png";
import GhostTl from "@/assets/ghosttl.png";

import useSound from "use-sound";

const FloatingGhost = ({ src, alt, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -30, 30, 0],
      x: [0, 20, -20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.div className={className} animate={controls}>
      <Image src={src} alt={alt} />
    </motion.div>
  );
};

export default function Clicker() {
  const { clicks, addClick } = useClick();
  const [localClicks, setLocalClicks] = useState(clicks);
  const [showWawaCry, setShowWawaCry] = useState(false);

  const [play] = useSound("/SoundEffect.mp3");

  const debouncedAddClick = useMemo(
    () =>
      debounce(() => {
        addClick();
        setLocalClicks((prev) => prev + 1);

        setShowWawaCry(true);
        play();
        setTimeout(() => {
          setShowWawaCry(false);
        }, 300);
      }, 100),
    [addClick, play]
  );

  useEffect(() => {
    setLocalClicks(clicks);
  }, [clicks]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full relative">
      <div className="w-full h-screen bg-[url('../assets/background.png')] bg-cover bg-center relative z-0">
        <div className="flex-grow flex flex-col items-center justify-center relative z-40">
          <button
            onClick={debouncedAddClick}
            className="absolute inset-0 opacity-0 z-30 cursor-pointer w-full h-[100vh]"
            aria-label="Click Button"
          ></button>

          <h2 className="text-lg sm:text-xl font-bold mt-24 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg px-4 py-2 rounded-full">
            Total Clicks: {localClicks}
          </h2>
        </div>

        <Image
          src={WawaCat}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[400px] md:w-[800px] lg:w-[1000px] xl:w-[1100px]"
          alt="Wawa Cat"
        />

        {showWawaCry && (
          <Image
            src={WawaCry}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20 w-[400px] md:w-[800px] lg:w-[1000px] xl:w-[1100px]"
            alt="Wawa Cry"
          />
        )}

        <FloatingGhost
          src={GhostBl}
          alt="Ghost Bottom Left"
          className="absolute bottom-10 left-5 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
        />
        <FloatingGhost
          src={GhostBr}
          alt="Ghost Bottom Right"
          className="absolute bottom-10 right-16 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
        />
        <FloatingGhost
          src={GhostTl}
          alt="Ghost Top Left"
          className="absolute top-10 left-5 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
        />
        <FloatingGhost
          src={GhostTr}
          alt="Ghost Top Right"
          className="absolute top-10 right-16 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
        />
        <FloatingGhost
          src={GhostTc}
          alt="Ghost Top Center"
          className="absolute top-10 left-1/2 transform -translate-x-1/2 z-0 w-16 sm:w-20 md:w-24 lg:w-28"
        />

        <Leaderboard />
      </div>
    </div>
  );
}
