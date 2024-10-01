import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        ref={ref}
        className="relative z-10 px-4 py-12 min-h-screen flex flex-col justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="px-4 py-12 h-fit flex flex-col justify-center items-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm rounded-lg"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold mb-8 text-white md:text-4xl lg:text-6xl"
            style={{
              textShadow: `
              -1px -1px 0 #000,  
               1px -1px 0 #000,
              -1px  1px 0 #000,
               1px  1px 0 #000,
               4px 4px 0 rgba(0,0,0,0.2)
            `,
              WebkitTextStroke: "2px black",
              textStroke: "2px black",
            }}
          >
            WAWHAAAT ABOUT ?
          </motion.h1>
          {[
            "Why did the sneaky Wawa cat jump into $wawa ?",
            'Saw the market bounce and said, "WAAAAWAAAAAAAA"',
            "Hissed at FUD, held tight to its $wawa bags.",
            "Diversified into $wawa, $wawa, and $wawa.",
            "Now it lounges forward, smug and unbothered !",
          ].map((text, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-2xl mb-6 max-w-3xl text-center text-white"
              style={{
                textShadow: `
                -1px -1px 0 #000,  
                 1px -1px 0 #000,
                -1px  1px 0 #000,
                 1px  1px 0 #000,
                 4px 4px 0 rgba(0,0,0,0.2)
              `,
                WebkitTextStroke: "1px black",
                textStroke: "1px black",
              }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
