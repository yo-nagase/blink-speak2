'use client'
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useSettingStore } from "@/lib/setting-store";
import useQuestion from "@/components/language-quiz/hooks/useQuestion";

export default function Zustand2() {
  const targetLanguage = useSettingStore((state) => state.targetLanguage)
  const { getNewQuestion, currentQuestion, isQuestionLoading, error } = useQuestion();
  useEffect(() => {
    getNewQuestion()
  }, [])

  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        {targetLanguage}
        {currentQuestion?.contents}
      </div>
    </main>
  );
}
