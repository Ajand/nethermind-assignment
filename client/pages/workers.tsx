import Navbar from "../components/Navbar";
import type { NextPage } from "next";

const Workers: NextPage = () => {
  return (
    <div>
      <main className="main">
        <Navbar />
        <div className="content">
          <div className="panel-2 p-10 ">
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
                <tr className="table-row-backgorund">
                  <td>0</td>
                  <td className="text-xs">
                    54e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107
                  </td>
                  <td className="text-xs">Processing</td>
                  <td className="text-xs">19644165511</td>
                  <td>
                    <button className="btn-red p-1 px-3 text-sm">Stop</button>
                  </td>
                </tr>
                <tr className="table-row-backgorund">
                  <td>1</td>

                  <td className="text-xs"></td>
                  <td className="text-xs">Empty</td>
                  <td className="text-xs"></td>
                  <td>
                    <button className="btn-red p-1 px-3 text-sm">Stop</button>
                  </td>
                </tr>
                <tr className="table-row-backgorund">
                  <td>2</td>

                  <td className="text-xs">
                    54e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107
                  </td>
                  <td className="text-xs">Processing</td>
                  <td className="text-xs">19644165511</td>
                  <td>
                    <button className="btn-red p-1 px-3 text-sm">Stop</button>
                  </td>
                </tr>
                <tr className="table-row-backgorund">
                  <td>3</td>

                  <td className="text-xs">
                    54e604787cbf194841e7b68d7cd28786f6c9a0a3ab9f8b0a0e87cb4387ab0107
                  </td>
                  <td className="text-xs">Processing</td>
                  <td className="text-xs">19644165511</td>
                  <td>
                    <button className="btn-red p-1 px-3 text-sm">Stop</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workers;
