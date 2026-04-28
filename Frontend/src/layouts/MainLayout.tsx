/**
 *  @dependencies
 */
import React from "react";

/**
 * styles
 */
import "./MainLayout.css";

/**
 * Additional Components
 */
import Header from "../components/Header/Header";
import Sidebar from "../components/Siderbar/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
