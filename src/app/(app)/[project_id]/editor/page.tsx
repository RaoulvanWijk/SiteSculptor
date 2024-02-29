import React, { use, useEffect, useState } from "react";
import EditorHandler from "@/components/pages/editor/EditorHandler";

export default async function EditorPage() {
  // "use server";
  

  
  return (
    // <EditorLayout>
    //   <EditorSideNav />
    //   <EditorTopNav />
    //   <ScrollArea className="pt-3 rounded-xl border bg-card text-card-foreground shadow p-4 drag-container">
    //     <div className="flex gap-4 flex-col">
    //       <NavbarOne />
    //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
    //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
    //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
    //       <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
    //     </div>
    //   </ScrollArea>
    // </EditorLayout>

    <EditorHandler />
  );
}
