import localFont from "next/font/local";
import Provider from "./provider";
import "./globals.css";

const BodoAmat = localFont({
  src: "./fonts/BodoAmat.woff",
  variable: "--font-bodo-amat",
  weight: "100 900",
});
export const metadata = {
  title: "Wawa Cat",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${BodoAmat.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
