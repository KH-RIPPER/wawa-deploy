import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <motion.div
        className="w-16 h-16 border-4 border-pink-300 rounded-full"
        animate={{
          rotate: 360,
          borderTopColor: ["#f9a8d4", "#fda4af", "#f9a8d4"],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
