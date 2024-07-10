"use client";

import Link from "next/link";
import React from "react";
import {
  IconBrandGoogleFilled,
  IconBrandGithubFilled,
} from "@tabler/icons-react";
import { signIn } from "next-auth/react";

import { toast } from "sonner";

export default function SignUp() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  async function handleLogin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());

      if (res.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Logged in successfully");
        signIn("credentials", {
          email,
          callbackUrl: "/dashboard",
        });
      }
    } else {
      toast.error("Please fill all the fields");
    }
  }

  return (
    <>
      <div className="py-20 text-zinc-200 selection:bg-zinc-600">
        <div
          className="relative z-10 mx-auto w-full max-w-xl p-4"
          style={{
            opacity: "1",
            transform: "none",
          }}
        >
          <div>
            <Link href="/" className="text-headline-6 font-semibold">
              Dualr
            </Link>
            <div className="mb-9 mt-6 space-y-1.5">
              <h1 className="text-2xl font-semibold">
                Sign in to your account
              </h1>
              <p className="text-zinc-400">
                Don't have an account?{/* */}{" "}
                <a href="/auth/signup" className="text-blue-400">
                  Create one.
                </a>
              </p>
            </div>
          </div>
          <div>
            <div className="mb-3 flex gap-3">
              <button className='relative z-0 flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 px-3 py-3 text-zinc-50 transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5] before:rounded-[100%] before:bg-zinc-100 before:transition-transform before:duration-500 before:content-[""] hover:scale-105 hover:text-zinc-900 hover:before:translate-y-[0%] active:scale-100'>
                <IconBrandGoogleFilled size={20} />
              </button>
              <button className='relative z-0 flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950 px-3 py-3 text-zinc-50 transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5] before:rounded-[100%] before:bg-zinc-100 before:transition-transform before:duration-500 before:content-[""] hover:scale-105 hover:text-zinc-900 hover:before:translate-y-[0%] active:scale-100'>
                <IconBrandGithubFilled size={20} />
              </button>
            </div>
          </div>
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] w-full bg-zinc-700" />
            <span className="text-zinc-400">OR</span>
            <div className="h-[1px] w-full bg-zinc-700" />
          </div>
          <form>
            <div className="mb-3">
              <label
                htmlFor="email-input"
                className="mb-1.5 block text-zinc-400"
              >
                Email
              </label>
              <input
                id="email-input"
                type="email"
                ref={emailRef}
                placeholder="your.email@provider.com"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
              />
            </div>
            <div className="mb-6">
              <div className="mb-1.5 flex items-end justify-between">
                <label htmlFor="password-input" className="block text-zinc-400">
                  Password
                </label>
              </div>
              <input
                ref={passwordRef}
                id="password-input"
                type="password"
                placeholder="••••••••••••"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
              />
            </div>
            <button
              className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
              type="button"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </form>
          <p className="mt-9 text-xs text-zinc-400">
            By signing in, you agree to our{/* */}{" "}
            <a href="#" className="text-blue-400">
              Terms &amp; Conditions
            </a>{" "}
            {/* */}and{/* */}{" "}
            <a href="#" className="text-blue-400">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
