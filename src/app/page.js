"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Clicker from "./components/Clicker";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Contact from "./components/Contact";
import ApplyModal from "./components/Modal/ApplyingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-pink-100 overflow-hidden relative min-h-screen">
      <div className="absolute scale-[0.57] md:scale-[1] top-2 left-1/2 transform -translate-x-1/2 z-40 p-4">
        <Navbar />
      </div>
      <Clicker />
      <Marquee />
      <About />
      <Marquee />
      <Contact />
      <div className="fixed bottom-8 right-10 z-50">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
        >
          Apply Now
        </button>
      </div>
      <ApplyModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
