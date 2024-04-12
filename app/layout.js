import { Inter } from "next/font/google";
import { AuthContextProvider } from "./_utils/auth-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Xpense Trackr",
  description: "A simple expense tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
