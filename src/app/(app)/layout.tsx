import React from "react";
import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/toaster";
export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkAuth();
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
