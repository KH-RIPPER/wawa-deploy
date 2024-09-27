"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Clicker from "./components/Clicker";
import About from "./components/About";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("clicker");

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const getDirection = (newTab) => {
    const order = ["clicker", "about"];
    return order.indexOf(newTab) - order.indexOf(currentTab);
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <div className="absolute scale-[0.6] md:scale-[1] top-2 left-1/2 transform -translate-x-1/2 z-50  p-4">
        <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />
      </div>
      <AnimatePresence initial={false} custom={getDirection(currentTab)}>
        <motion.div
          key={currentTab}
          custom={getDirection(currentTab)}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
          className="absolute w-full h-full"
        >
          {currentTab === "clicker" ? <Clicker /> : <About />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
