import AppSideBar from "@/components/layouts/dashboard/AppSideBar";
import DarkModeSwitch from "@/components/ui/DarkModeSwitch";
import { LuSearch, LuBell } from "react-icons/lu";
import { useAppSelector } from "@/lib/hook";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full bg-background">
        <AppSideBar />
        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm">
            <div className="flex max-w-md flex-1 items-center gap-4">
              <div className="relative flex-1">
                <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search patients, records..."
                  className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-4 py-2 pl-10 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DarkModeSwitch />
              <button className="relative inline-flex h-10 w-10 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                <LuBell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
              </button>
              <div className="ml-2 border-l border-border pl-4">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default DashBoardLayout;
