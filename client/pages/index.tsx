import type { NextPage } from "next";

import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <main className="main">
        <Navbar />
        <div className="content">
          <div className="panel p-10 ">
            <p className="text-3xl text-white">
              Enter any 256-bit hexadecimal value to find a nonce that generates
              a keccak256 hash that is less than your input.
            </p>
            <input
              className="w-full mt-6 px-6 p-4 text-2xl input-background text-white"
              placeholder="What is your input?"
            />
            <p className="text-lg mt-3 text-gray-300">
              Only 256-bit hexadecimal is allowed.
            </p>
            <div className="flex justify-center">
              <button className="btn btn-red p-4 mt-4 text-center">
                Find The Nonce
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
