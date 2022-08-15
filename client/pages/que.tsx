import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import { MyQueContext } from "../lib/MyQueProvider";
import { useQuery, gql } from "@apollo/client";
import { ethers } from "ethers";

const INPUT_CALCULATIONS = gql`
  query InputCalculations($values: [String!]!) {
    inputCalculations(values: $values) {
      value
      lastProcessedNonce
      resultNonce
      status
      jobId
    }
  }
`;

interface InputCalculation {
  value: string;
  lastProcessedNonce: string;
  resultNonce: string;
  status: string;
  jobId: string;
}

const Que: NextPage = () => {
  const { que, remove } = useContext(MyQueContext);

  const { data, loading, error, refetch, startPolling, stopPolling } = useQuery(
    INPUT_CALCULATIONS,
    {
      variables: { values: Array.from(que) },
      pollInterval: 1000,
    }
  );

  console.log(error);

  useEffect(() => {
    startPolling(500);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  return (
    <div>
      <main className="main">
        <Navbar />
        <div className="content">
          <div className="panel-2 p-10 ">
            {loading ? (
              <>
                <p className="text-xl text-white">Loading your inputs...</p>
              </>
            ) : data && data.inputCalculations.length === 0 ? (
              <p className="text-xl text-white">No input yet.</p>
            ) : (
              <>
                <p className="text-xl text-white">Your Inputs History:</p>

                <table className="text-white w-full text-left mt-6">
                  <thead className="p-8">
                    <tr className="table-header-backgorund ">
                      <th>Input</th>
                      <th>Status</th>
                      <th>Nonce</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.inputCalculations.map(
                      (inputCalc: InputCalculation) => (
                        <tr
                          className="table-row-backgorund"
                          key={inputCalc.value}
                        >
                          <td className="text-xs">{inputCalc.value}</td>
                          <td className="text-xs">{inputCalc.status}</td>
                          <td className="text-xs">
                            {ethers.BigNumber.from(inputCalc.resultNonce).gte(
                              ethers.BigNumber.from(
                                inputCalc.lastProcessedNonce
                              )
                            )
                              ? inputCalc.resultNonce
                              : inputCalc.lastProcessedNonce}
                          </td>
                          <td>
                            {inputCalc.status == "Processing" ? (
                              <button className="btn-red p-1 px-3 text-sm">
                                Stop
                              </button>
                            ) : (
                              <></>
                            )}
                            {inputCalc.status == "Queued" ? (
                              <button className="btn-red p-1 px-3 text-sm">
                                Cancel
                              </button>
                            ) : (
                              <></>
                            )}
                            {inputCalc.status == "Finished" ||
                            inputCalc.status == "Stopped" ? (
                              <button
                                onClick={() => refetch()}
                                className="btn-red p-1 px-3 text-sm"
                              >
                                Delete
                              </button>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Que;
