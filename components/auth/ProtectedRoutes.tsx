"use client";

import { useGetCurrentUserQuery } from "@/lib/features/apis/AuthApi";
import Loading from "@/app/loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="p-4">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
