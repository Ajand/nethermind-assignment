import Navbar from "../components/Navbar";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ethers } from "ethers";
import { Worker } from "../lib/interfaces";

const WORKERS = gql`
  query Workers {
    workers {
      id
      status
      jobId
      input {
        value
        lastProcessedNonce
        resultNonce
        status
        jobId
      }
    }
  }
`;

const EMPTY_WORKER = gql`
  mutation EmptyWorker($id: String!) {
    emptyWorker(id: $id)
  }
`;

const Workers: NextPage = () => {
  const { data, loading, error, refetch, startPolling, stopPolling } =
    useQuery(WORKERS);

  const [emptyWorker] = useMutation(EMPTY_WORKER);

  useEffect(() => {
    startPolling(500);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (error)
    return (
      <main className="main">
        <Navbar />
        <div className="content">
          <div className="panel-2 p-10 text-white text-lg">
            Something unexpected happened
          </div>
        </div>
      </main>
    );

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
            ) : (
              <table className="text-white w-full text-left ">
                <thead className="p-8">
                  <tr className="table-header-backgorund ">
                    <th>Worker Id</th>
                    <th>Input</th>
                    <th>Status</th>
                    <th>Nonce</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data.workers.map((worker: Worker) => (
                    <tr key={worker.id} className="table-row-backgorund">
                      <td>{worker.id}</td>
                      <td className="text-xs">
                        {worker.status === "Processing"
                          ? worker.input.value
                          : "-"}
                      </td>
                      <td className="text-xs">{worker.status}</td>
                      <td className="text-xs">
                        {worker.status === "Processing" ? (
                          ethers.BigNumber.from(worker.input.resultNonce).gte(
                            ethers.BigNumber.from(
                              worker.input.lastProcessedNonce
                            )
                          ) ? (
                            worker.input.resultNonce
                          ) : (
                            worker.input.lastProcessedNonce
                          )
                        ) : (
                          <>-</>
                        )}
                      </td>
                      <td>
                        {worker.status === "Processing" ? (
                          <>
                            <button
                              onClick={() => {
                                emptyWorker({
                                  variables: {
                                    id: worker.id,
                                  },
                                });
                              }}
                              className="btn-red p-1 px-3 text-sm"
                            >
                              Stop
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workers;
