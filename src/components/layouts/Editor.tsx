import React from "react";
import "@/resources/styling/components/layouts/editor-layout.scss";
import { cn } from "@/lib/utils";

export function Layout({ children, className }: { 
  children: React.ReactNode,
  className?: string, 
}) {
  return <div className={"editor-container " + className}>{children}</div>;
}
export function SideNav() {
  return <div className="sidebar border-x">Side nav</div>;
}
export function TopNav() {
  return <div className="topnav border-y">EditorTopNav</div>;
}

const Editor = {
  Layout: Layout,
  SideNav: SideNav,
  TopNav: TopNav,
};

export default Editor;