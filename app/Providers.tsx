import { ThemeProvider } from "next-themes";

const providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="transition-colors duration-300">{children}</div>
    </ThemeProvider>
  );
};
export default providers;
