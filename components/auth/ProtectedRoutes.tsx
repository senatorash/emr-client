"use client";

// import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hook";
import Loading from "@/app/loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isHydrated, isRefreshing } = useAppSelector(
    (state) => state.userState,
  );
  useEffect(() => {
    if (isHydrated && !isRefreshing && !user) {
      router.replace("/signin");
    }
  }, [isHydrated, isRefreshing, user, router]);

  if (!isHydrated || isRefreshing) {
    return <Loading />;
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "sonner";
// import { useAppSelector } from "@/lib/hook";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const { user, isHydrated, isRefreshing } = useAppSelector((state) => state.userState);

//   useEffect(() => {
//     if (!isHydrated || isRefreshing) return;

//     if (!user) {
//       // Show toast right away
//       toast.error("Your session has expired. Please sign in again.", {
//         duration: 5000,               // Longer so user can read it
//         position: "top-right",        // or "top-center" — your preference
//         dismissible: true,
//         // Optional: action: { label: "Sign in", onClick: () => router.push("/signin") }
//       });

//       // Delay redirect → gives toast time to appear & animate
//       const timer = setTimeout(() => {
//         router.replace("/signin");
//       }, 800); // 800 ms — sweet spot; increase to 1200 if toast still cuts off

//       return () => clearTimeout(timer); // cleanup if component unmounts early
//     }
//   }, [isHydrated, isRefreshing, user, router]);

//   // ────────────────────────────────────────────────
//   // Always render SOMETHING — prevents white/blank screen
//   // ────────────────────────────────────────────────

//   if (isRefreshing || !isHydrated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   if (!user) {
//     // During the short delay before redirect
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <p className="text-lg text-muted-foreground">Redirecting to sign in...</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
