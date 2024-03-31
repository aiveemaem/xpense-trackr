import Link from "next/link";
import Heading from "../heading";
import NavBar from "../navbar";
import RecentTxn from "./recent-txn";
import Charts from "./charts";

export default function Home() {
  return (
    <main className="container mx-auto px-2 border bg-blue-50">
      <Heading />
      <div className="flex-1 flex min-h-[calc(100vh_-_theme(spacing.14))] w-full overflow-hidden">
        <NavBar />
        <div className="flex-1 flex flex-col gap-2 p-4 md:gap-4 md:p-10">
          <Charts />
          <RecentTxn />
          {/* <div className="grid gap-4 md:grid-cols-2"></div> */}
        </div>
      </div>
    </main>
  );
}
