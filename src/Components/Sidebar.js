import React, { useState, useContext } from "react";
import "./Sidebar.css";
import "../AdminCSS.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const { setUserLoggedIn, logout } = useContext(AuthContext);
  const nevigate = useNavigate();

  function toggleSubMenu(menuIndex) {
    setActiveMenu(menuIndex === activeMenu ? null : menuIndex);
  }
  const [SidebarStatus, setSidebarStatus] = useState("SidebarVisible");
  const SidebarBTN = () => {
    if (SidebarStatus === "SidebarVisible") {
      setSidebarStatus("SidebarHide");
    } else {
      setSidebarStatus("SidebarVisible");
    }
  };

  const handlelogout = () => {
    logout();
    localStorage.removeItem("userLoggedIn");
    nevigate("/");
  };
  return (
    <>
      <div className={`sidebarContainer ${SidebarStatus}`}>
        <div
          className="rounded sidebarBTN text-center bg-dark  "
          onClick={SidebarBTN}
        >
          <h4 className="bi bi-list text-white my-4"></h4>
        </div>
        <div className={`sidebar bg-dark `}>
          <center className="my-3">
            <i
              className="bi bi-person-circle "
              style={{ fontSize: "20px" }}
            ></i>
            <h5 className="text-warning ">Raushan</h5>
            <p className="text-warning ">BH000044</p>
          </center>

          <ul>
            <li className="menu-item  active">
              <Link to="/Super-Admin-Dashboard">
                <i className="bi bi-box"></i>Dashboard
              </Link>
            </li>
            <li className="menu-item ">
              <Link to="/Received-Payment">
                <i className="bi bi-wallet2"></i>Received Payment
              </Link>
            </li>
            <li className="menu-item ">
              <Link to="/Direct-Withdraw-Request">
                <i className="bi bi-wallet2"></i>Direct Withdraw Request
              </Link>
            </li>
            <li className="menu-item ">
              <Link to="/Ads-View-Withdraw-Request">
                <i className="bi bi-wallet2"></i>Ads View Withdraw Request
              </Link>
            </li>

            <li className="menu-item ">
              <Link to="/" onClick={handlelogout}>
                <i className="bi bi-box-arrow-left"></i>Logout
              </Link>
            </li>
            {/* <li className="menu-item ">
              <Link to="/profile" onClick={() => toggleSubMenu(0)}>
                <i className="bi bi-person-square"></i>Profile{" "}
              </Link>
            </li>
            <li className="menu-item ">
              <Link to="#" onClick={() => toggleSubMenu(1)}>
                <i className="bi bi-people"></i>Team{" "}
                {activeMenu === 1 ? "-" : "+"}
              </Link>
              <ul className={activeMenu === 1 ? "sub-menu open" : "sub-menu"}>
                <li>
                  <Link to="/direct-team">
                    <i className="bi bi-caret-right"></i>Direct Team
                  </Link>
                </li>
                <li>
                  <Link to="level-team">
                    <i className="bi bi-caret-right"></i>Level Team
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <Link to="#" onClick={() => toggleSubMenu(2)}>
                <i className="bi bi-dice-4"></i>Task{" "}
                {activeMenu === 2 ? "-" : "+"}
              </Link>
              <ul className={activeMenu === 2 ? "sub-menu open" : "sub-menu"}>
                <li>
                  <Link to="/view-task">
                    <i className="bi bi-caret-right"></i>View Task
                  </Link>
                </li>
                <li>
                  <Link to="/task-history">
                    <i className="bi bi-caret-right"></i>History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <Link to="#" onClick={() => toggleSubMenu(3)}>
                <i className="bi bi-coin"></i>Deposit{" "}
                {activeMenu === 3 ? "-" : "+"}
              </Link>
              <ul className={activeMenu === 3 ? "sub-menu open" : "sub-menu"}>
                <li>
                  <Link to="/scan-pay">
                    <i className="bi bi-caret-right"></i>Scan & Pay
                  </Link>
                </li>
                <li>
                  <Link to="/payment-history">
                    <i className="bi bi-caret-right"></i>Payment / Deposit
                    History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <Link to="#" onClick={() => toggleSubMenu(5)}>
                <i className="bi bi-question-octagon"></i>Support{" "}
                {activeMenu === 5 ? "-" : "+"}
              </Link>
              <ul className={activeMenu === 5 ? "sub-menu open" : "sub-menu"}>
                <li>
                  <Link to="/support">
                    <i className="bi bi-caret-right"></i>Support
                  </Link>
                </li>
                <li>
                  <Link to="/support-history">
                    <i className="bi bi-caret-right"></i>Support History
                  </Link>
                </li>
              </ul>
            </li> */}

            {/* <li className="menu-item ">
              <Link to="#" onClick={() => toggleSubMenu(7)}>
                <i className="bi bi-wallet2"></i> Withdraw{" "}
                {activeMenu === 7 ? "-" : "+"}
              </Link>
              <ul className={activeMenu === 7 ? "sub-menu open" : "sub-menu"}>
                <li>
                  <Link to="/direct-withdraw">
                    <i className="bi bi-caret-right"></i>Direct withdraw
                  </Link>
                </li>
                <li>
                  <Link to="/ads-view-withdraw">
                    <i className="bi bi-caret-right"></i>Ads view withdraw
                  </Link>
                </li>

                <li>
                  <Link to="/withdraw-history">
                    <i className="bi bi-caret-right"></i>Withdraw history
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <Link to="/refer">
                <i className="bi bi-share-fill"></i>Refers
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
