// app/layout.tsx
import NavBar from "./sharedComponent/NavBar";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Toaster
          position="top-center"
          richColors
          duration={3000}
        />
      </body>
    </html>
  );
}

