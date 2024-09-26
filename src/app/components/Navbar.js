import Link from "next/link";
import Image from "next/image";

import DexTools from "@/assets/Navbar/DexTools.png";
import CoinMarketCup from "@/assets/Navbar/CoinMarketCup.png";
import CoinGecko from "@/assets/Navbar/CoinGecko.png";
import Twitter from "@/assets/Navbar/Twitter.png";
import Telegram from "@/assets/Navbar/Telegram.png";

export default function Navbar() {
  return (
    <div className="text-xl font-bold z-50 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg px-4 py-2 rounded-full">
      <div className="flex justify-center items-center gap-6">
        <Link
          href="https://www.dextools.io/app/en/token/wawa?t=1727368679981"
          passHref
          target="_blank"
        >
          <Image src={DexTools} alt="DexTools" className="w-10" />
        </Link>
        <Link
          href="https://coinmarketcap.com/dexscan/solana/74cdMSwA1GXoCdNGnZKnt884Uxr4DgUyRp5eC7hL5aaP/"
          passHref
          target="_blank"
        >
          <Image src={CoinMarketCup} alt="CoinMarketCap" className="w-10" />
        </Link>
        <Link
          href="https://www.coingecko.com/en/coins/wawa-cat"
          passHref
          target="_blank"
        >
          <Image src={CoinGecko} alt="CoinGecko" className="w-10" />
        </Link>
        <Link href="https://x.com/wawa_cto" passHref target="_blank">
          <Image src={Twitter} alt="Twitter" className="w-10" />
        </Link>
        <Link href="https://t.me/realwawacto" passHref target="_blank">
          <Image src={Telegram} alt="Telegram" className="w-10" />
        </Link>
        <Link
          href="https://jup.ag/swap/SOL-8Sk2EJ9oo25b7Mmf4qd5gJw6z3738AXvAbkuSSpQpump"
          passHref
          target="_blank"
          className="py-2 px-4 bg-pink-300 rounded-full border-2 border-black hover:bg-pink-100 transition-all"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
