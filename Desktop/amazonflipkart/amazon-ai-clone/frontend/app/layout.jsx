import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Amazon.in: Online Shopping India",
  description: "Amazon India clone with AI recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
