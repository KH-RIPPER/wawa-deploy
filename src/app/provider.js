import { ClickProvider } from "@/contexts/click";

export default function Providers({ children }) {
  return <ClickProvider>{children}</ClickProvider>;
}
