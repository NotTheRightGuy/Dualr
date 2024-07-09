import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export default function SignUp() {
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
          <form action="" className="flex flex-col gap-3">
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
              />
            </div>
            <Button className="bg-brand-1 font-semibold text-white hover:bg-blue-600">
              Sign up
            </Button>
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
