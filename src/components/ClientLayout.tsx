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

  return (
    <Providers>
      {!noAppbarPaths.includes(pathname) && <Appbar />}
      {children}
      <Toaster position="bottom-right" />
    </Providers>
  );
}