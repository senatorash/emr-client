"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

const providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="transition-colors duration-300">{children}</div>;
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
};
export default providers;
