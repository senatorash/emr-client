"use client";

import { useGetCurrentUserQuery } from "@/lib/features/apis/AuthApi";

const AuthBootstrap = ({ children }: { children: React.ReactNode }) => {
  useGetCurrentUserQuery();

  return <>{children}</>;
};
export default AuthBootstrap;
