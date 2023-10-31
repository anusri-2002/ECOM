import { useState, useEffect } from "react";
import { Input, Button, Upload } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import "./addsubcategory.css";

const AddSubCategory = () => {
  const [data, setData] = useState({ image: "", name: "" });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:7000/category${id}`);
      console.log(response);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const addsubCategory = async () => {
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
    setLoading(true);
    try {
      await axios.patch(`http://localhost:7000/category/${id}`, data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = () => {
    if (id) {
      editCategory();
    } else {
      addsubCategory();
    }
  };
  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <div className="addsubcategory">
      <h1>{id ? "EDIT CATEGORY" : "ADD SUBCATEGORY"}</h1>
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
        <Input onChange={(e) => onChange(e, "image")} placeholder="Name" />

        <div className="addsubcategorybtn">
          {" "}
          <hr />
          <Button
            onClick={onClick}
            className="addsubcategory-btn"
            size="large"
            type="primary"
            block
            loading={loading}
          >
            {id ? "EDIT CATEGORY" : "ADD SUBCATEGORY"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
