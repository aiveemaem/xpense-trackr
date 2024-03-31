import Link from "next/link";
import Heading from "./heading";
export default function Page() {
  return (
    <main className="container mx-auto px-2 border bg-blue-50 relative">
      <div className="flex min-h-screen w-full flex-col">
        <Heading />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Xpense Trackr
          </h1>
          <p className="text-lg text-center mt-4">
            The best way to track your expenses and manage your finances
          </p>
          <Link href="/home" className="m-10">
            Login to start your journey
          </Link>
        </div>
      </div>
    </main>
  );
}
