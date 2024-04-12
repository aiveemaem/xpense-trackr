"use client";

import HomePage from "./pages/home/page";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();

  async function handleGitHubSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleSignIn() {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className=" border w-full flex justify-center " data-theme="light">
      {user ? (
        <HomePage />
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold text-center">Welcome to</h1>
          <p className="text-4xl font-bold text-center font-borel text-slate-500 mt-2">
            Xpense Trackr
          </p>
          <p className="text-lg text-center -mt-4 italic ">
            The best way to track your expenses and manage your finances
          </p>
          <div className="flex items-center p-2 rounded-md border w-30 mt-5 hover:bg-slate-100">
            <img src="/images/github.png" className="w-5 mr-2" />
            <button
              onClick={handleGitHubSignIn}
              className="hover:underline cursor-pointer p-2"
            >
              Sign in with GitHub
            </button>
          </div>
          <div className="flex items-center p-2 rounded-md border w-30 hover:bg-slate-100">
            <img src="/images/google.png" className="w-5 mr-2" />
            <button
              onClick={handleGoogleSignIn}
              className="hover:underline cursor-pointer p-2"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
