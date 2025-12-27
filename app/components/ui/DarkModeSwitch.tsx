import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-secondary hover:text-secondary-foreground h-10 w-10 rounded-full"
      onClick={toggleTheme}
    >
      {mounted && currentTheme === "dark" ? <LuSun /> : <LuMoon />}
    </button>
  );
};

export default DarkModeSwitch;
