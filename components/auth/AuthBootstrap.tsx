"use client";

import Loading from "@/app/loading";
// import Loading from "@/app/loading";
import { useGetCurrentUserMutation } from "@/lib/features/apis/AuthApi";
import { useAppSelector } from "@/lib/hook";
import { useEffect, useState } from "react";

const AuthBootstrap = ({ children }: { children: React.ReactNode }) => {
  const [getCurrentUser, { isLoading }] = useGetCurrentUserMutation();

  const { isHydrated } = useAppSelector((state) => state.userState);

  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await getCurrentUser().unwrap();
      } catch (error) {
      } finally {
        setBootstrapping(false);
      }
    };

    if (!isHydrated) {
      bootstrap();
    } else {
      setBootstrapping(false);
    }
  }, [getCurrentUser, isHydrated]);

  if (bootstrapping || isLoading) return <Loading />;

  return <>{children}</>;
};
export default AuthBootstrap;
