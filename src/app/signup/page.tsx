// custom nextjs auth login page
"use client"
import * as React from "react"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import options from "../api/auth/[...nextauth]/route"

import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'

export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  const searchParams = useSearchParams()
 
  const search = searchParams.get('callbackUrl')
  // if user is logged in, redirect to the callback url
  const { status } = useSession();
  if(status === "authenticated") {
    redirect(search || "/")
  }
  return (
    <div className={cn("grid gap-6")}>
        <div className="grid gap-2">
          <Button disabled={isLoading} onClick={()=>signIn(
            // get callback url from params
            'google', { callbackUrl: search || ''}
          )}>
            {isLoading && (
              <p></p>
            )}
            Sign in with Google
          </Button>
        </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default UserAuthForm
