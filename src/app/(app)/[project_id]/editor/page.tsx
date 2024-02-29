import React from "react";
import Editor from "@/components/layouts/Editor";

export default async function EditorPage() {
  "use server";

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

    <Editor.Layout>
      <Editor.SideNav />
      <Editor.TopNav />
    </Editor.Layout>
  );
}
