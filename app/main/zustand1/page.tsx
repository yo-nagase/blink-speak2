'use client'
import Home from "@/components/Home";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Language, useSettingStore } from "@/lib/setting-store";
import React from "react";

export default function Zustand1() {

  const targetLanguage = useSettingStore((state) => state.targetLanguage)
  const level = useSettingStore((state) => state.level)
  const setTargetLanguage = useSettingStore((state) => state.setTargetLanguage)
  const setLevel = useSettingStore((state) => state.setLevel)

  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start gap-6 p-6 sm:flex-row sm:p-8">
          <Button onClick={() => setTargetLanguage(Language.ENGLISH)}>Set as English</Button>
          <Button onClick={() => setTargetLanguage(Language.JAPANESE)}>Set as Japanese</Button>


          {targetLanguage}

          <Home />
        </div>
      </div>
    </main>
  );
}
