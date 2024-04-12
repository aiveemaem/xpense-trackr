import RecentTxn from "../../components/recent-txn";
import Charts from "../../components/charts";
import Status from "./status";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <main className="flex-1 w-full py-4 px-4 md:px-8 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center ">
            <h1 className="text-xl font-semibold mt-4">DASHBOARD</h1>
          </div>
          <div className="flex-1 flex flex-col gap-2 md:gap-4 md:p-10">
            <Status />
            <Charts />
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
