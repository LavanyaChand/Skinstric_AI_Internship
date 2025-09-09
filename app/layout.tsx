// app/layout.tsx
import NavBar from "../components/NavBar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

