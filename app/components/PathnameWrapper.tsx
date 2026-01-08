"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function PathnameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/signin";

  return (
    <>
      {!hideLayout && <NavBar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
