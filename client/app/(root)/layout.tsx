import React from "react";
import Navbar from "./_components/navbar";
import { ChildProps } from "@/types";

const Layout = ({ children }: ChildProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
