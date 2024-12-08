import React from "react";
import Sidebar from "../components/sidebar";

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full h-full  ">
      <Sidebar />

      {children}
    </div>
  );
};

export default Layout;
