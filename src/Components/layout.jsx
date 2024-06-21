import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

/**
 * Renders the layout of the application, including the header and the main content.
 *
 * @return {JSX.Element} The layout component.
 */
export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
