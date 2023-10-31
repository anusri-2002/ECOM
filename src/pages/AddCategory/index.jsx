import React, { useState, useEffect } from "react";
import { Input, Button, Upload } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./addcategory.css";

const AddCategory = () => {
  const [data, setData] = useState({ image: "", name: "" });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/category/${id}`);
      console.log(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, [id]); // Added the dependency array to rerun the effect when 'id' changes

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const addCategory = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:7000/category", data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };

  const editCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:7000/category/${id}`,
        data
      );
      setLoading(false);
      navigate("/seller/category");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    if (id) {
      editCategory();
    } else {
      addCategory();
    }
  };

  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <div className="addcategory">
      <h1>{id ? "EDIT CATEGORY" : "ADD CATEGORY"}</h1>
      <div className="uploaddiv">
        <label>Image</label>
        <Upload
          name="file"
          action="http://localhost:7000/upload"
          onChange={onUploadChange}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>

      <div className="form">
        <label>Name</label>
        <Input onChange={(e) => onChange(e, "name")} placeholder="Name" />
        

        <div className="addcategorybtn">
          {" "}
          <hr />
          <Button
            onClick={onClick}
            className="category-btn"
            size="large"
            type="primary"
            block
            loading={loading}
          >
            {id ? "EDIT CATEGORY" : "ADD CATEGORY"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
