import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./product.css";

const Product = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState([false]);

  const Navigate = useNavigate();

  const productCol = [
    { 
        title: "ID", 
        dataIndex: "_id" ,
   render:id=><Link to={`/seller/addproduct/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Price", dataIndex: "price" },
    { title: "Tags", dataIndex: "tags" },
    {
      title: "ThumbnailImage",
      dataIndex: "thumbnailimage",
      render: (text) => (
        <img src={text} className="product-thumbimg" crossOrigin="anonymous" />
      ),
    },
    { title: "Discount", dataIndex: "discount" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} className="product-img" crossOrigin="anonymous" />
      ),
    },
    { title: "Categoryid", dataIndex: "categoryid" },
    { title: "Subcayegoryid", dataIndex: "subcategoryid" },
    { title: "variants", dataIndex: "variants" },
    { title: "is_available", dataIndex: "is_available" },
    { title: "Sellerid", dataIndex: "sellerid" },
    
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => (
        <i onClick={() => onDelete(id)} class="fa-solid fa-trash"></i>
      ),
    },
  ]; 
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/product/${id}`
      );
    } catch (e) {
      console.log(e);
    }
    fetchProduct();
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/product")
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const onClick = () => {
    Navigate("/seller/addproduct");
  };
  return (
    <Frame>
      <div className="product-btns">
        <Button onClick={onClick} type="primary">
          ADD PRODUCT
        </Button>
      </div>
      <Table
        className="product-table"
        columns={productCol}
        dataSource={data}
      />
    </Frame>
  );
};

export default Product;
