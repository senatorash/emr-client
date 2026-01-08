"use client";

import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const signinPage = () => {
  return (
    <section className="min-h-screen flex">
      <LeftPanel />
      <RightPanel />
    </section>
  );
};
export default signinPage;
