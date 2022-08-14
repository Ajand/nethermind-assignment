import type { NextPage } from "next";
import { useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";
import { gql, useMutation } from "@apollo/client";

const Home: NextPage = () => {
  const [input, setInput] = useState("");

  const ADD_TO_QUEUE = gql`
    mutation AddToQueue($value: String!) {
      addToQueue(value: $value)
    }
  `;

  const [addToQueue] = useMutation(ADD_TO_QUEUE);

  const isValid = () => {
    if (input.length !== 64) return false;
    try {
      const hexa = ethers.BigNumber.from("0x" + input);
      return true;
    } catch (err) {
      return false;
    }
  };

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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {!isValid() && (
              <p className="text-lg mt-3 text-gray-300">
                Only 256-bit hexadecimal is allowed.
              </p>
            )}

            <div className="flex justify-center">
              <button
                className={`${
                  isValid() ? "btn btn-red" : "btn-disabled"
                } p-4 mt-4 text-center`}
                onClick={() => {
                  if (isValid()) {
                    addToQueue({ variables: { value: input } })
                      .then((r) => {
                        console.log(r);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
              >
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
