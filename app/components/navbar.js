"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function NavBar() {
  const { user, firebaseSignOut } = useUserAuth();
  const [activePage, setActivePage] = useState("home");

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }

  function handlePageChange(pageName, event) {
    // event.preventDefault(); // Prevent default anchor behavior
    setActivePage(pageName);
  }

  return (
    <div className="menu">
      <div className=" m-10 ">
        {user ? (
          <ul className=" text-xl pb-7">
            <li>
              <Link
                href="/pages/home"
                passHref
                className={`${
                  activePage === "home"
                    ? "link link-info text-center"
                    : "bg-white text-center"
                }`}
                onClick={(e) => handlePageChange("home", e)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/pages/transactions"
                onClick={(e) => handlePageChange("transactions", e)}
                className={`${
                  activePage === "transactions"
                    ? "link link-info text-center"
                    : "bg-white text-center"
                }`}
              >
                Transactions
              </Link>
            </li>
            <li>
              <button className="bg-white text-center" onClick={handleSignOut}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="menu text-xl">
            <li>
              <p>Please sign in to view content.</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
