'use client'
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { useSettingStore } from "@/lib/setting-store";

export default function Zustand2() {
  const targetLanguage = useSettingStore((state) => state.targetLanguage)


  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        {targetLanguage}
      </div>
    </main>
  );
}
