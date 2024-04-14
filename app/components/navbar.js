"use client";

import Link from "next/link";
import { useEffect } from "react";
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

  useEffect(() => {
    themeChange(false);
  }, []);

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
        <a className="btn btn-ghost font-bold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          XPENSE TRACKR
        </a>
      </div>
      {user ? (
        <div className="navbar-center hidden lg:flex">
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
      <div className="navbar-end">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm m-1 dropdown-toggle mr-4  md:btn-sm lg:btn-md xl:btn-md"
            aria-label="Theme Selector"
            onClick={(e) => e.currentTarget.focus()}
          >
            Theme
            <svg
              width="12px"
              height="12px"
              className="h-2 w-2 fill-current opacity-60 inline-block sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content absolute z-10 p-2 shadow-2xl bg-base-300 rounded-box"
            id="dropdownMenu"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Default"
                value="default"
                data-set-theme="light"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Dark"
                value="dark"
                data-set-theme="dark"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Synthwave"
                value="synthwave"
                data-set-theme="synthwave"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cupcake"
                value="cupcake"
                data-set-theme="cupcake"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Sunset"
                value="sunset"
                data-set-theme="sunset"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
