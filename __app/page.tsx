import "./globals.css";

import { cookies } from "next/headers";
import React from "react";
import TopMenuBar from "@/components/TopMenuBar";
import { SidebarLayout } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
    <TopMenuBar />
    <div className="pt-12 "> {/* TopMenuBarの高さ分のパディングを追加 */}
      <SidebarLayout
        defaultOpen={cookies().get("sidebar:state")?.value === "true"}
      >
        <AppSidebar/>
        {children}
      </SidebarLayout>
    </div>
  </>
  );
}
