import api from "@/utils/api";

export const submitTwitterHandle = async (twitterHandle) => {
  try {
    const response = await api.post("/mails/submit-twitter-handle", {
      twitterHandle,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting Twitter handle:", error);
    throw error;
  }
};
