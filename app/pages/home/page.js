import RecentTxn from "../../components/recent-txn";
import Charts from "../../components/charts";
import Status from "./status";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="  w-full flex-1 justify-center">
        <div className="flex-1 flex flex-col  gap-2 p-4 md:gap-4 md:p-10">
          <Status />
          <Charts />
          {/* <RecentTxn /> */}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
