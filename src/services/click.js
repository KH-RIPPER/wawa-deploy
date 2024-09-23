import API from "@/utils/api";
import { io } from "socket.io-client";

let socket;

const clickService = {
  addClick: async (country) => {
    try {
      const response = await API.post("/click/add", { country });
      return response.data;
    } catch (error) {
      console.error("Error adding click:", error);
      throw error;
    }
  },

  getLeaderboard: async () => {
    try {
      const response = await API.get("/click/all");
      return response.data.result;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  },

  // Function to set up Socket.IO connection
  setupSocketIO: (onUpdate) => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL,}`, { transports: ["websocket"] }); // Replace with your server URL

    socket.on("connect", () => {
      console.log("Socket.IO connection established");
    });

    socket.on("leaderboardUpdate", (data) => {
      onUpdate(data.leaderboard);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });
  },

  // Function to clean up Socket.IO connection
  cleanupSocketIO: () => {
    if (socket) {
      socket.disconnect();
    }
  },
};

export default clickService;
