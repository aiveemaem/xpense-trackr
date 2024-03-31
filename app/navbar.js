import Link from "next/link";
export default function NavBar() {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <nav className="flex flex-col justify-between items-start m-10">
        <div className="flex flex-col items-start space-y-4">
          <Link href="/home" className="text-blue-500">
            Home
          </Link>
          <Link href="/transactions" className="text-blue-500">
            Transactions
          </Link>
        </div>
        <Link href="/" className="text-red-500 mt-4">
          Logout
        </Link>
      </nav>
    </div>
  );
}
