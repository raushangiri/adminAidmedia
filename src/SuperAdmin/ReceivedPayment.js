import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import paymentImg1 from "../Assets/paymentSS.webp";

const ReceivedPayment = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const getdata = () => {
    fetch("https://backend-87hw.onrender.com/receivedpayment")
      .then((item) => item.json())
      .then((data1) => {
        setdata(data1.admindata);
        setLoading(false);
      });
  };

  useEffect(() => {
    getdata();

    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn !== "true") {
      // User is not logged in, redirect to login page
      navigate("/");
    }
  }, []);

  if (loading) {
    return (
      <div className="AdminContainer spinner-container">
        <div className="spinner-border color-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="AdminContainer">
      <div className="row mx-0 p-4">
        <div className="col-sm-12 rounded p-5 metalic-color ">
          <h2 className="mb-4">Received Payment </h2>
          <table className="table table-striped text-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image </th>
                <th scope="col">User ID </th>
                <th scope="col">Transaction ID </th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <Listdata
                    key={index + 1}
                    index={index + 1}
                    customer_id={item.customer_id}
                    qr_code_screenshot={item.qr_code_screenshot}
                    transaction_id={item.transaction_id}
                    createdAt={item.createdAt}
                    id={item._id}
                    status={item.account_status}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="8">
                  <h4>No account activation request</h4>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceivedPayment;

function Listdata(props) {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); // state variable to track account status

  const {
    customer_id,
    qr_code_screenshot,
    transaction_id,
    createdAt,
    index,
    id,
    status,
  } = props;

  const newdate = new Date(createdAt);
  const year = newdate.getFullYear();
  const month = newdate.getMonth();
  const day = newdate.getDay();

  const activeaccount = () => {
    fetch(
      `https://backend-87hw.onrender.com/activeUserwithtask/${customer_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_status: "Active" }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data");
        window.location.reload();
        setIsActive(true); // set state variable to true when account is activated
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <tbody>
        <tr>
          <th scope="row px-0 mx-0" className="text-white">
            {index}
          </th>
          <td className="text-white">
            <PaymentSlipView
              qr_code_screenshot={qr_code_screenshot}
              paymentId={`payment-${index}`}
            />
          </td>
          <td className="text-white">{customer_id}</td>
          <td className="text-white">{transaction_id}</td>
          <td className="text-white">{`${day}-${month}-${year}`}</td>
          <td className="text-white">{status}</td>
          <td className="text-white">
            <button className="btn btn-info" onClick={activeaccount}>
              Activate
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

const PaymentSlipView = (params) => {
  const { qr_code_screenshot } = params;
  return (
    <>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-info"
          data-bs-toggle="modal"
          data-bs-target={`#Model-for-${params.paymentId}`}
        >
          View
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id={`Model-for-${params.paymentId}`}
          tabIndex={-1}
          aria-labelledby={`Model-for-${params.paymentId}-Label`}
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
              <div className="modal-body text-black text-center">
                <img
                  src={qr_code_screenshot}
                  className="w-auto"
                  height="400px"
                  alt=" ... "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
