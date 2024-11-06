'use client'
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useSettingStore } from "@/lib/setting-store";
import useQuestion from "@/components/language-quiz/hooks/useQuestion";

export default function Zustand2({ children }: { children: React.ReactNode }) {
  const targetLanguage = useSettingStore((state) => state.targetLanguage);
  const { getNewQuestion, currentQuestion, isQuestionLoading, error } = useQuestion();

  const fetchQuestion = async () => {
    if (!currentQuestion) { // currentQuestionが未定義の場合のみ呼び出す
      await getNewQuestion();
     
    }
  };

  useEffect(() => {
    
    fetchQuestion();
  }, [currentQuestion]); // 依存配列を空にして、マウント時にのみ呼び出す

  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
        {targetLanguage}
        {isQuestionLoading ? "Loading..." : ""}
        {currentQuestion?.contents}
      </div>
    </main>
  );
} 