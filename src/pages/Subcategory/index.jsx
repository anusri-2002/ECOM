import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./subcategory.css";

const Subcategory = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState([false]);

  const Navigate = useNavigate();

  const subcategoryCol = [
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
        <img src={text} className="subcategory-img" crossOrigin="anonymous" />
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
        `http://localhost:7000/subcategory/${id}`
      );
    } catch (e) {
      console.log(e);
    }
    fetchSubcategory();
  };

  const fetchSubcategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:7000/subcategory");
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSubcategory();
  }, []);

  const onClick = () => {
    Navigate("/seller/addsubcategory");
  };
  return (
    <Frame>
      <div className="subcategory-btns">
        <Button onClick={onClick} type="primary">
          ADD SUBCATEGORY
        </Button>
      </div>
      <Table
        className="subcategory-table"
        columns={subcategoryCol}
        dataSource={data}
      />
    </Frame>
  );
};

export default Subcategory;
