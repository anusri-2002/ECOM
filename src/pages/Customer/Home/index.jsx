import axios from "axios";
import Navbar from "../../../Components/Customer/Navbar";
import "./home.css";
import { useState, useEffect } from "react";
import Product from "../../../Components/Customer/Product";
import { ToastContainer, toast } from "react-toastify";

import React from "react";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const fetchCategory = async () => {
    const response = await axios.get("http://localhost:7000/category");
    setCategory(response.data);
  };
  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:7000/product");
    setProduct(response.data);
  };

  const fetchProductWithCat = async (catId) => {
    const response = await axios.get(
      `http://localhost:7000/product?category=${catId}`
    );
    console.log(response.data, "working");
    setProduct(response.data);
  };
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  console.log(category);
  console.log(product);
  return (
    <>
      <div className="home">
        <ToastContainer />
        <Navbar />
      </div>
      <div className="home-img"></div>
      <div className="home-category">
        <div className="home-category-container">
          {category.map((item) => (
            <div
              onClick={() => {
                fetchProductWithCat(item._id);
              }}
              className="image-div"
            >
              <img src={item.image} alt="" crossOrigin="anonymous" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="product-container">
        {product.map((item) => (
          <Product
            thumbnailImage={item.thumbnailImage}
            description={item.description}
            price={item.price}
            discount={item.discount}
            name={item.name}
            sellerId={item.sellerid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
