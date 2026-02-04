"use client";

import { useEffect } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

const signinPage = () => {
  const user = useAppSelector((state) => state.userState.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <section className="min-h-screen flex">
      <LeftPanel />
      <RightPanel />
    </section>
  );
};
export default signinPage;
