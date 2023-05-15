import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRimg1 from "../Assets/QRcode.PNG";
const AdsViewWithdrawRequest = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = () => {
    fetch("https://backend-87hw.onrender.com/taskwithdrawrequest").then(
      (res) => {
        res.json().then((item) => {
          setdata(item.Withdrawrequest);
          setLoading(false);
        });
      }
    );
  };

  useEffect(() => {
    getdata();
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
          <h2 className="mb-4">Ads View Withdraw Request </h2>
          <table className="table table-striped text-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User ID </th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col"> QR</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
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
                    amount={item.amount}
                    qr_code_screenshot={item.qr_code_screenshot}
                    status={item.status}
                    createdAt={item.createdAt}
                    id={item._id}
                    requestType={item.requestType}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="8">
                  <h3>No Request Made</h3>
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdsViewWithdrawRequest;

function Listdata(props) {
  const [PaymentStatus, setPaymentStatus] = useState("Unpayed");
  const PaymentStatusBTN = () => {
    setPaymentStatus("Payed");
  };

  const {
    customer_id,
    amount,
    qr_code_screenshot,
    status,
    createdAt,
    index,
    id,
    requestType,
  } = props;
  const newdate = new Date(createdAt);

  const year = newdate.getFullYear();
  const month = newdate.getMonth();
  const day = newdate.getDay();

  const Approvertaskwithdraw = () => {
    fetch(
      `https://backend-87hw.onrender.com/referwithdrawrequest/${customer_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          id: id,
          requestType: requestType,
        }),
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
          <td className="text-white">{customer_id}</td>
          <td className="text-white">{`${day}-${month}-${year}`}</td>

          <td className="text-white">{amount}</td>
          <td className="text-white">
            <ViewQR
              qr_code_screenshot={qr_code_screenshot}
              paymentId={`payment-${index}`}
            />
          </td>
          <td className="text-white">{status}</td>
          <td className="text-white">
            <button className="btn btn-info" onClick={Approvertaskwithdraw}>
              Mark as Paid
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

const ViewQR = (params) => {
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
          View QR
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
