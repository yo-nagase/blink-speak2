
import { Title } from "@radix-ui/react-toast";
import React from "react";

export default function DatabasePage({ children }: { children: React.ReactNode }) {

  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <div className="h-full rounded-md border-2 border-dashed p-2">
        <Title>Database</Title>
        
        Get data from database.

      </div>
    </main>
  );
}
