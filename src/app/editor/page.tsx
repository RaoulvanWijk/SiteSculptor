import React from "react";
import { useState, useEffect } from "react";
import "@/resources/styling/components/layout.scss"; // Import your SCSS file
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ScrollArea } from "@/components/ui/scroll-area"
import NavbarOne from "@/components/dragcomponents/navbars/NavbarOne";

export default function EditPage() {
  return (
    <div className="layout">
      <div className="sidebar border-x">
      </div>
      <div className="topbar border-y">
      </div>
      <div className="placeholdcontainer px-3 mt-3">
        <ScrollArea className="pt-3 rounded-xl border bg-card text-card-foreground shadow p-4">
         <div className="flex gap-4 flex-col">
            <NavbarOne/>
            <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
            <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
            <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
            <div className="w-full h-[500px] border-dashed border-2 border-slate-300 rounded-md"></div>
         </div>
        </ScrollArea>
      </div>
    </div>
  );
}
