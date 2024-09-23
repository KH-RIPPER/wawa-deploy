"use client";
import React from "react";
import ClickButton from "./components/ClickButton";
import Leaderboard from "./components/Leaderboard";
import { useClick } from "../hooks/click";

const Home = () => {
  const { clicks, scoreboard, addClick } = useClick();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Click the Cat!</h1>
      <ClickButton onClick={addClick} />
      <h2>Total Clicks: {clicks}</h2>
      <Leaderboard scores={scoreboard} />
    </div>
  );
};

export default Home;
