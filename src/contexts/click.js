import React, { createContext, useState, useEffect, useContext } from "react";
import clickService from "../services/click";

const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  const [scoreboard, setScoreboard] = useState([]);

  const addClick = async () => {
    try {
      const result = await clickService.addClick();
      setClicks((prevClicks) => prevClicks + 1);
      setScoreboard(result.leaderboard);
    } catch (error) {
      console.error("Error adding click:", error);
    }
  };

  const handleUpdate = (updatedLeaderboard) => {
    setScoreboard(updatedLeaderboard);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialLeaderboard = await clickService.getLeaderboard();
        setScoreboard(initialLeaderboard);
      } catch (error) {
        console.error("Error fetching initial leaderboard:", error);
      }
    };

    fetchInitialData();

    // Set up Socket.IO connection
    clickService.setupSocketIO(handleUpdate);

    return () => {
      // Clean up Socket.IO connection
      clickService.cleanupSocketIO();
    };
  }, []);

  return (
    <ClickContext.Provider value={{ clicks, scoreboard, addClick }}>
      {children}
    </ClickContext.Provider>
  );
};

export const useClick = () => {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error("useClick must be used within a ClickProvider");
  }
  return context;
};
