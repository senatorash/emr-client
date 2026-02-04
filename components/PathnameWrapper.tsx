"use client";

import { usePathname } from "next/navigation";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";

export default function PathnameWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ["/signin", "/dashboard", "/patients"];

  const hideLayout = noHeaderFooterRoutes.includes(pathname);
  return (
    <>
      {!hideLayout && <NavBar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
