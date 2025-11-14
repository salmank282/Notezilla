/**
 *  @dependencies
 */
import React from "react";

import "./MainLayout.css";

/**
 * Additional Components
 */
import Header from "../components/Header/Header";
import Siderbar from "../components/Siderbar/Siderbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-body">
        <Siderbar />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
