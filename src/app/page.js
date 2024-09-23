import ClickButton from "./components/ClickButton";
import Leaderboard from "./components/Leaderboard";
import { useClick } from "../contexts/click";
import debounce from "lodash.debounce";

export default function Home() {
  const { clicks, scoreboard, addClick } = useClick();

  // Create a debounced version of addClick
  const debouncedAddClick = debounce(addClick, 1000);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Click the Cat!</h1>
      <ClickButton onClick={debouncedAddClick} />
      <h2>Total Clicks: {clicks}</h2>
      <Leaderboard scores={scoreboard} />
    </div>
  );
}
