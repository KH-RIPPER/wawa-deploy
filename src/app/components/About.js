import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="px-4 py-8 h-full flex flex-col justify-center items-center bg-violet-400">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-6"
      >
        About Wawa Cat
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg mb-4 max-w-2xl text-center"
      >
        Wawa Cat is a revolutionary meme token on the Solana blockchain,
        combining the power of decentralized finance with the irresistible charm
        of cats.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg max-w-2xl text-center"
      >
        Our mission is to bring joy, laughter, and financial opportunities to
        the crypto community through our unique blend of humor and innovative
        tokenomics.
      </motion.p>
    </div>
  );
}
