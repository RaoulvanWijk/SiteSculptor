// custom nextjs auth login page
"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [search, setSearch] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  useEffect(() => {
    setSearch(searchParams.get("callbackUrl") ?? "");
    // if user is logged in, redirect to the callback url
    if (status === "authenticated") {
      redirect(search || "/app/dashboard");
    }
  }, []);
  return (
    <div className="h-screen">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Select a provider to login
              </p>
            </div>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  signIn(
                    // get callback url from params
                    "google",
                    { callbackUrl: search || "/app/dashboard" }
                  )
                }
              >
                {isLoading && <p></p>}
                Login with Google
              </Button>
              {/* github */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  signIn(
                    // get callback url from params
                    "github",
                    { callbackUrl: search || "/app/dashboard" }
                  )
                }
              >
                {isLoading && <p></p>}
                Login with Github
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
