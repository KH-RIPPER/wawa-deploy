import { useClickContext } from "../contexts/click";

export const useClick = () => {
  const context = useClickContext();
  if (context === undefined) {
    throw new Error("useClick must be used within a ClickProvider");
  }
  return context;
};
