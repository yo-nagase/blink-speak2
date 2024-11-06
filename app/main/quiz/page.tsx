'use client'
import { LanguageQuiz } from "@/components/language-quiz/language-quiz";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Language, useSettingStore } from "@/lib/setting-store";
import { Title } from "@radix-ui/react-toast";
import React from "react";

export default function QuestionPage() {

  const targetLanguage = useSettingStore((state) => state.targetLanguage)
  const level = useSettingStore((state) => state.level)
  const setTargetLanguage = useSettingStore((state) => state.setTargetLanguage)
  const setLevel = useSettingStore((state) => state.setLevel)

  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        <LanguageQuiz />
      </div>
    </main>
  );
}
