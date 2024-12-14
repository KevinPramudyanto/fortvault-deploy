import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold tracking-widest">404</h1>
      <div className="absolute rotate-6 rounded bg-red-600 px-2 text-white">
        Page Not Found
      </div>
      <Link
        className="mt-5 bg-green-800 px-6 py-3 font-bold text-white hover:bg-green-900"
        to="/"
      >
        Go Back to Home
      </Link>
    </main>
  );
};

export default NotFound;
