"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { themeChange } from "theme-change";

export default function NavBar() {
  const { user, firebaseSignOut } = useUserAuth();

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   themeChange(false);
  // }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {user ? (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box"
            >
              <li aria-label="Home Page">
                <Link
                  href="/pages/home"
                  className=" px-4 py-2 text-sm hover:bg-base-200 rounded-lg"
                >
                  Dashboard
                </Link>
              </li>
              <li aria-label="Transaction Page">
                <Link
                  href="/pages/transactions"
                  className="px-4 py-2 text-sm hover:bg-base-200 rounded-lg"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <button
                  className="px-4 py-2 text-sm hover:bg-base-200 rounded-lg"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : null}
        <a className="btn btn-ghost text-4xl">XPENSE TRACKR</a>
      </div>
      {user ? (
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 text-xl">
            <li aria-label="Home Page">
              <Link href="/pages/home" className="">
                Dashboard
              </Link>
            </li>
            <li aria-label="Transactions Page">
              <Link href="/pages/transactions" className="">
                Transactions
              </Link>
            </li>
            <li>
              <button className="" onClick={handleSignOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
