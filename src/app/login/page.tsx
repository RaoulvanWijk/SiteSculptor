// custom nextjs auth login page
"use client"
import { useState } from "react"

import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    redirect(search || "/app/dashboard")
  }
  return (
    <div className={cn("grid gap-6")}>
        <div className="grid gap-2">
          <Button disabled={isLoading} onClick={()=>signIn(
            // get callback url from params
            'google', { callbackUrl: search || '/app/dashboard'}
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
