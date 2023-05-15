import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Assets/logo.png";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import "./Login.css";
const Login = () => {
  const { setUserLoggedIn, login } = useContext(AuthContext);
  const nevigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    if (!email || !password) {
      return toast.error("Please enter login credential", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    const res = await fetch("https://backend-87hw.onrender.com/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 404) {
      return toast.error("Invalid credential", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (res.status === 401) {
      return toast.error("Invalid credential", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (res.status === 200) {
      login();
      localStorage.setItem("userLoggedIn", "true");
      nevigate("/Super-Admin-Dashboard");
    }
  };

  return (
    <>
      <ToastContainer />
      <MDBContainer className="d-flex align-items-center justify-content-center min-vh-100">
        <MDBRow className="border border-5 ">
          <MDBCol col="6">
            <div className="d-flex flex-column ">
              <div className="text-center mx-md-4 img">
                <img src={logo} style={{ width: "185px" }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">We Are The Aid Media Team</h4>
              </div>

              <p>Please login to your account</p>

              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your Email address"
                id="form1"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="text-center pt-1 ">
                <button
                  type="button"
                  class="btn btn-primary col-12"
                  onClick={handlelogin}
                >
                  Login
                </button>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4 ">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4 ms-0">
                <h4 class="mb-4 text-center">
                  We are more than just a company
                </h4>
                <h4 class="mb-4 text-center">A Great Team !!</h4>

                <p class="small mb-0">
                  Teamwork is the ability to work together toward a common
                  vision. The ability to direct individual accomplishments
                  toward organizational objectives. It is the fuel that allows
                  common people to attain uncommon results.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
