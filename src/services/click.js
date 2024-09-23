import API from "@/utils/api";

let socket;

export const clickService = {
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

  // Function to set up WebSocket connection
  setupWebSocket: (onUpdate) => {
    socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data.leaderboard); // Call the provided function with the updated leaderboard
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  },

  // Function to clean up WebSocket connection
  cleanupWebSocket: () => {
    if (socket) {
      socket.close();
    }
  },
};
