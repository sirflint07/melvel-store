// components/ClientWrapper.js
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const path = pathname === "/login" | pathname === '/signup';

  return (
    <>
      {!path && <Navbar />}
      <main className="flex-1 w-[100vw]">{children}</main>
      {!path && <Footer />}
    </>
  );
}