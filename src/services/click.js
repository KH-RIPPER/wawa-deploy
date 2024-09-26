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
      return response.data.result; // Assuming backend response contains `result`
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error;
    }
  },

  setupSocketIO: (onUpdate) => {
    socket = io(process.env.NEXT_PUBLIC_API_URL, { transports: ["websocket"] });

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

  cleanupSocketIO: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
};

export default clickService;
