import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./category.css";

const Category = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState([false]);

  const Navigate = useNavigate();

  const categoryCol = [
    { 
        title: "ID", 
        dataIndex: "_id" ,
   render:id=><Link to={`/seller/addcategory/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} className="category-img" crossOrigin="anonymous" />
      ),
    },
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
        `http://localhost:7000/category/${id}`
      );
    } catch (e) {
      console.log(e);
    }
    fetchCategory();
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/category");
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const onClick = () => {
    Navigate("/seller/addcategory");
  };
  return (
    <Frame>
      <div className="category-btns">
        <Button onClick={onClick} type="primary">
          ADD CATEGORY
        </Button>
      </div>
      <Table
        className="category-table"
        columns={categoryCol}
        dataSource={data}
      />
    </Frame>
  );
};

export default Category;
