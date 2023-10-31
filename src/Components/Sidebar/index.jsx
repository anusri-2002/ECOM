import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

const SideBar = () => {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("sellerId");
    localStorage.removeItem("token");
    navigate("/seller/login");
  };
  return (
    <div className="sidebar">
      <div className="logosection">
        <i class="fa-solid fa-cart-shopping fa-bounce"></i>
        <h1>ECOMAPP</h1>
      </div>
      <h2 className="sectionheading">DASHBOARD</h2>

      <div className="dashboardsection">
        <NavLink to="/seller/dashboard" className="sidebar-link">
          <i class="fa-solid fa-table-columns"></i>
          DASHBOARD
        </NavLink>

        <NavLink to="/seller/product" className="sidebar-link">
          <i class="fa-solid fa-pallet"></i>
          INVENTORY
        </NavLink>

        <NavLink to="/seller/category" className="sidebar-link">
          <i class="fa-solid fa-cart-plus"></i>
          CATEGORY
        </NavLink>

        <NavLink to="/seller/subcategory" className="sidebar-link">
          <i class="fa-solid fa-truck-ramp-box"></i>
          SUBCATEGORY
        </NavLink>

        <NavLink to="/seller/order" className="sidebar-link">
          <i class="fa-sharp fa-solid fa-truck"></i>
          ORDER
        </NavLink>
        <h2 className="sectionheading">SETTINGS</h2>

        <div className="settings-section">
          <NavLink to="/seller/account" className="sidebar-link">
            <i class="fa-regular fa-user"></i>
            ACCOUNT
          </NavLink>

          <p className="sidebar-link" onClick={onClick}>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            SIGNOUT
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
