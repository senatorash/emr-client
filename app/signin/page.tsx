"use client";

import { useEffect } from "react";
import LeftPanel from "@/components/signin/LeftPanel";
import RightPanel from "@/components/signin/RightPanel";
import { useAppSelector } from "@/lib/hook";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const { user } = useAppSelector((state) => state.userState);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <section className="flex min-h-screen">
      <LeftPanel />
      <RightPanel />
    </section>
  );
};
export default SigninPage;
