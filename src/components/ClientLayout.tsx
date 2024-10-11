"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Appbar from "@/components/Appbar";
import { Providers } from "@/redux/provider";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define the paths where you don't want to show the Appbar
  const noAppbarPaths = ["/signup", "/signin"];
  const noFooterPaths = ["/signup", "/signin", "/"];

  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        {!noAppbarPaths.includes(pathname) && <Appbar />}
        <main className="flex-grow">
          {children}
        </main>
        {!noFooterPaths.includes(pathname) && <Footer />}
        <Toaster position="bottom-right" />
      </div>
    </Providers>
  );
}