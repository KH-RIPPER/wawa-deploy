import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CoinMarketCup from "@/assets/Navbar/CoinMarketCup.png";
import CoinGecko from "@/assets/Navbar/CoinGecko.png";
import Twitter from "@/assets/Navbar/Twitter.png";
import Telegram from "@/assets/Navbar/Telegram.png";

export default function Navbar({ currentTab, setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const buttonStyle = (tabName) => `
    ${isMobile ? "w-[auto]" : "w-auto"} 
    py-2 px-4 
    rounded-full 
    transition-all duration-300 
    mb-2 md:mb-0
    ${
      currentTab === tabName
        ? isMobile
          ? "border-b-2 border-pink-300"
          : "bg-pink-300 border-2 border-black"
        : "hover:bg-pink-100"
    }
  `;

  return (
    <nav className="text-xl font-bold z-50 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg px-4 py-2 rounded-full relative">
      <div className="md:hidden flex justify-end">
        <motion.button
          onClick={toggleNavbar}
          className="py-2 px-4 w-[600px]  rounded-full bg-pink-300 border-2 border-black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? "Close Menu" : "Open Menu"}
        </motion.button>
      </div>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="flex flex-col absolute top-full left-[15px] transform  min-w-[600px] bg-white md:static md:flex md:flex-row md:justify-between md:items-center gap-4 p-4 md:p-0 md:bg-transparent mt-2 md:mt-0 rounded-lg md:rounded-none shadow-lg md:shadow-none"
          >
            {/* Navigation Buttons */}
            <div className="flex flex-col md:flex-row gap-2">
              <motion.button
                variants={itemVariants}
                onClick={() => setCurrentTab("clicker")}
                className={buttonStyle("clicker")}
              >
                Home
              </motion.button>
              <motion.button
                variants={itemVariants}
                onClick={() => setCurrentTab("about")}
                className={buttonStyle("about")}
              >
                About
              </motion.button>
            </div>

            {/* Social Icons */}
            <div className="flex flex-row justify-center gap-2 my-2 md:my-0">
              <motion.a
                variants={itemVariants}
                href="https://coinmarketcap.com/dexscan/solana/74cdMSwA1GXoCdNGnZKnt884Uxr4DgUyRp5eC7hL5aaP/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={CoinMarketCup}
                  alt="CoinMarketCap"
                  className="w-10"
                />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="https://www.coingecko.com/en/coins/wawa-cat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={CoinGecko} alt="CoinGecko" className="w-10" />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="https://x.com/wawa_cto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Twitter} alt="Twitter" className="w-10" />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="https://t.me/realwawacto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Telegram} alt="Telegram" className="w-10" />
              </motion.a>
            </div>

            {/* Buy Now Button */}
            <div>
              <motion.a
                variants={itemVariants}
                href="https://jup.ag/swap/SOL-8Sk2EJ9oo25b7Mmf4qd5gJw6z3738AXvAbkuSSpQpump"
                target="_blank"
                rel="noopener noreferrer"
                className="w-auto py-2 px-4 bg-pink-300 rounded-full border-2 border-black hover:bg-pink-100 transition-all duration-300 text-center block"
              >
                Buy Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
