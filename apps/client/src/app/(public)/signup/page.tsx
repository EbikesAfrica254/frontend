import { SignupForm } from "./_components/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          {/*<div className="w-full max-w-xs">*/}
          {/*  */}
          {/*</div>*/}
          <SignupForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://picsum.photos/seed/ebikes-hero-1/1920/1080"
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
