"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { clickService } from "../services/click";

const ClickContext = createContext();

export const useClickContext = () => useContext(ClickContext);

export const ClickProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  const [scoreboard, setScoreboard] = useState([]);

  const addClick = async () => {
    setClicks(clicks + 1);
    await clickService.addClick("YourCountry"); // Replace "YourCountry" with the actual country logic
  };

  const fetchLeaderboard = async () => {
    const data = await clickService.getLeaderboard();
    setScoreboard(data);
  };

  const handleUpdate = (updatedLeaderboard) => {
    setScoreboard(updatedLeaderboard);
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);

    // Set up WebSocket connection
    clickService.setupWebSocket(handleUpdate);

    return () => {
      clearInterval(interval);
      clickService.cleanupWebSocket();
    };
  }, []);

  return (
    <ClickContext.Provider value={{ clicks, scoreboard, addClick }}>
      {children}
    </ClickContext.Provider>
  );
};
