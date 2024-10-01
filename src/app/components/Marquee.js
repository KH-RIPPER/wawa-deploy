import React from "react";
import "../globals.css";

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full border-box bg-[rgba(0,0,0,0.1)] backdrop-blur-lg py-[10px] ">
      <div className="marquee-content flex justify-between flex-nowrap text-2xl p-2">
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
        <span>$WAWA </span>
      </div>
    </div>
  );
};

export default Marquee;
