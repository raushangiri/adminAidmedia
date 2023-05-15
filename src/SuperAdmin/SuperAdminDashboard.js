import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

import "../AdminCSS.css";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const nevigate = useNavigate();

  const { userLoggedIn } = useContext(AuthContext);

  const [data, setdata] = useState({
    name: "",
  });
  const getdashborad = () => {
    fetch("https://backend-87hw.onrender.com/getadmin")
      .then((response) => response.json())
      .then((result) => {
        setdata(result);
      });
  };
  const [count, setCount] = useState({
    activeusers: 0,
    inactiveusers: 0,
    taskwithdrawrequest: 0,
    referwithdrawrequest: 0,
  });
  const getactiveinactiveuser = () => {
    fetch("https://backend-87hw.onrender.com/activependingusers")
      .then((response) => response.json())
      .then((result) => {
        setCount(result);
      });
  };

  useEffect(() => {
    getdashborad();
    getactiveinactiveuser();
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn !== "true") {
      // User is not logged in, redirect to login page
      nevigate("/");
    }
  }, []);

  return (
    <div className="AdminContainer">
      <div className="row mx-0 p-3">
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100 ">
            <h5>Total Payment Received</h5>
            <h1>
              <i className="bi bi-currency-rupee"></i>
              {data.Totalreceivedpayment}
            </h1>
          </div>
        </div>
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Balance</h5>
            <h1>
              <i className="bi bi-currency-rupee"></i>
              {data.Totalreceivedpayment -
              (data.taskwithdraw + data.referrelwithdraw) ? (
                data.Totalreceivedpayment -
                (data.taskwithdraw + data.referrelwithdraw)
              ) : (
                <div class="spinner-border color-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </h1>
          </div>
        </div>
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Payment Distributed</h5>
            <h1>
              <i className="bi bi-currency-rupee"></i>
              {data.taskwithdraw + data.referrelwithdraw ? (
                data.taskwithdraw + data.referrelwithdraw
              ) : (
                <div class="spinner-border color-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </h1>
          </div>
        </div>

        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Pending Referrel Withdraw Request</h5>
            <h1>{count.referwithdrawrequest}</h1>
          </div>
        </div>
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Pending Ads Withdraw Request</h5>
            <h1>{count.taskwithdrawrequest}</h1>
          </div>
        </div>
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Total Active Users</h5>
            <h1>{count.activeusers}</h1>
          </div>
        </div>
        <div className="col-sm-4 my-3 ">
          <div className="col-sm-12 bg-success text-light rounded p-4 h-100">
            <h5>Total Inactive Users</h5>
            <h1>{count.inactiveusers}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
