import RecentTxn from "../../components/recent-txn";
import Charts from "../../components/charts";
import Status from "./status";

export default function HomePage() {
  return (
    <main className=" border w-full flex justify-center">
      <div className="flex-1 flex flex-col  gap-2 p-4 md:gap-4 md:p-10">
        <Status />
        <Charts />
        {/* <RecentTxn /> */}
      </div>
    </main>
  );
}
