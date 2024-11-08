import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { useSettingStore } from "@/lib/setting-store";
import useQuestion from "@/components/language-quiz/hooks/useQuestion";

export default async function Zustand2() {
  //const targetLanguage = useSettingStore((state) => state.targetLanguage)
  //const { getNewQuestion, currentQuestion, isQuestionLoading, error } = useQuestion();
  const res = await fetch('http://localhost:3000/api/ai/question', { cache: 'no-store' });
  const data = await res.json();


  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <SidebarTrigger />
      
        <pre>{JSON.stringify(data, null, 2)}</pre>
       

      </div>
    </main>
  );
}


// export default async function Home() {

//   return (
//     <div>
//       <h1>Data from API</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }