"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSignUp() {
    setLoading(true);
    const username = userNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .finally(() => setLoading(false));
    console.log(res);
    if (res.error) {
      toast.error(res.error + " Try with different email or username");
      return;
    }
    toast.success("Account created successfully");
    router.push("/auth/signin");
  }

  return (
    <nav className="flex h-screen items-center justify-center">
      <div className="w-1/3">
        <div className="mb-6 text-headline-6 font-medium">Dualr</div>
        <p className="text-headline-4 font-bold">Let's get you started</p>
        <div className="flex gap-2">
          <p className="opacity-50">Already have an account?</p>
          <Link href="" className="text-brand-1 opacity-100 hover:underline">
            Login instead
          </Link>{" "}
        </div>
        <div className="mt-6 flex gap-2 *:flex-1 *:bg-dark-2 *:font-semibold hover:*:bg-dark-1">
          <Button>
            <IconBrandGoogleFilled size={20} />
          </Button>
          <Button>
            <IconBrandGithub size={20} />
          </Button>
        </div>
        <hr className="mt-4 opacity-25" />
        <main className="dark mt-4">
          <form className="flex flex-col gap-3">
            <div>
              <label
                htmlFor=""
                className="text-base-1 font-semibold opacity-45"
              >
                Username
              </label>
              <Input
                placeholder="bhangidevrat"
                className="mt-1 border-light-4 bg-dark-3"
                ref={userNameRef}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-base-1 font-semibold opacity-45"
              >
                Email
              </label>
              <Input
                placeholder="johndoe@gmail.com"
                className="mt-1 border-light-4 bg-dark-3"
                ref={emailRef}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-base-1 font-semibold opacity-45"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="******"
                className="mt-1 border-light-4 bg-dark-3"
                ref={passwordRef}
              />
            </div>

            {loading ? (
              <Button
                className="bg-brand-1 font-semibold text-white hover:bg-blue-600"
                variant={"ghost"}
                disabled
              >
                <LoaderCircle size={20} className="animate-spin" />
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp();
                }}
                className="bg-brand-1 font-semibold text-white hover:bg-blue-600"
              >
                Sign up
              </Button>
            )}
            <p className="text-xs opacity-40">
              By agreeing to sign up, you agree to our Terms and Conditions and
              Privacy Policy
            </p>
          </form>
        </main>
      </div>
    </nav>
  );
}
