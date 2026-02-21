"use client";

import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hook";

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

  if (isRefreshing) {
    return (
      <div className="p-4">
        <Loading />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
