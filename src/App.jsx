import { Routes, Route } from "react-router-dom";
import SellerLogin from "./pages/SellerLogin";
import SellerSignup from "./pages/SellerSignup";
import SellerDashboard from "./pages/SellerDashboard";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import Subcategory from "./pages/Subcategory";
import AddSubCategory from "./pages/AddSubCategory";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";
import Account from "./pages/Account";
import Signout from "./pages/Signout";
import { Navigate } from "react-router-dom";
import Home from "./pages/Customer/Home";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Customer/Login";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  const Token = ({ children }) => {
    if (token) {
      return <>{children}</>;
    } else return <Navigate to="/seller/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/seller/login" element={<SellerLogin />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              <SellerDashboard />
            </Token>
          }
        />

        <Route path="/seller/signup" element={<SellerSignup />} />

        {/* <Route path="/seller/dashboard" element={<SellerDashboard />} /> */}

        <Route
          path="/seller/category"
          element={
            <Token>
              <Category />
            </Token>
          }
        />

        <Route
          path="/seller/addcategory"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/subcategory"
          element={
            <Token>
              <Subcategory />
            </Token>
          }
        />
         <Route
          path="/seller/order"
          element={
            <Token>
              <Order />
            </Token>
          }
        />

        <Route path="/seller/addsubcategory" element={<AddSubCategory />} />
        <Route path="/seller/addcategory/:id" element={<AddCategory />} />
        <Route path="/seller/inventory" element={<Inventory />} />


        

        <Route path="/seller/Account" element={<Account />} />
        <Route path="/seller/signout" element={<Signout />} />
        <Route path="/seller/product" element={<Product />} />
        <Route path="/seller/addproduct" element={<AddProduct />} />
        <Route path="/seller/addproduct/:id" element={<AddProduct />} />

        <Route path="/customer/login" element={<Login />} />
      </Routes>
  
    </>

     ) 
    }
      

export default App;
