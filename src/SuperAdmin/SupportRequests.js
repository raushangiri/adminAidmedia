import React from "react";
import { Link } from "react-router-dom";
const SupportRequests = () => {
  return (
    <div className="AdminContainer">
      <div className="row mx-0 p-4">
        <div className="col-sm-12 rounded p-5 metalic-color overflow-auto">
          <h2 className="mb-4">Support Requests</h2>

          <table className="table table-striped text-light ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sponsor Id</th>
                <th scope="col">Name</th>
                <th scope="col">User Id</th>
                <th scope="col">Subject</th>
                <th scope="col">Inquiry/Question</th>
                <th scope="col">Date</th>
                <th scope="col">Reply</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row px-0 mx-0" className="text-white">
                  1
                </th>
                <td className="text-white">548</td>
                <td className="text-white">Sachin</td>
                <td className="text-white">TR54</td>
                <td className="text-white">Balance </td>
                <td className="text-white">Here will be asked question </td>
                <td className="text-white">12-02-2023</td>
                <td className="text-white">
                  <ReplyBTN TokenId="1" question="asked question" />
                </td>
                <td className="text-white">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportRequests;

const ReplyBTN = (params) => {
  return (
    <>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#Model-for-${params.TokenId}`}
        >
          Reply
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id={`Model-for-${params.TokenId}`}
          tabIndex={-1}
          aria-labelledby={`Model-for-${params.TokenId}-Label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header text-black">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-black">
                <form className="form-control">
                  <h5>{params.question}</h5>
                  <p>Reply</p>
                  <textarea rows={5} className="form-control"></textarea>
                  <input
                    type="submit"
                    className="form-control btn btn-info my-3"
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
