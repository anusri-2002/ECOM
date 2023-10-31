import React, { useState, useEffect } from "react";
import { Input, Button, Upload, Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import Frame from "../../Components/Frame";
import "./addproduct.css";

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    image: "",
    subcategoryid: "",
    categoryid: "",
    variants: [""],
    is_available: "",
    quantity: "",
    brand: "",
    tags: "",
    thumbnailimage: "",
    sellerid: "",
  });
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/product/${id}`);
      console.log(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]); // Added the dependency array to rerun the effect when 'id' changes

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:7000/category");
      const actualData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });
      console.log(actualData);
      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };

  const addProduct = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:7000/product", data);
      setLoading(false);
      navigate("/seller/product");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:7000/product/${id}`,
        data
      );
      setLoading(false);
      navigate("/seller/product");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    if (id) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const onUploadChange = (info, type) => {
    if (info.file.status === "done") {
      const imageKey = type === "thumbnail" ? "thumbnailImage" : "regularImage";
      setData({ ...data, [imageKey]: info.file.response.imageURL });
    }
  };
  useEffect(() => {
    fetchCategory();
    if (id) {
      addProduct();
    } else {
      editProduct();
    }
  }, []);

  return (
    <Frame>
      <div className="add-product">
        <h1>{id ? "EDIT PRODUCT" : "ADD PRODUCT"}</h1>
        <div className="form">
          <label>Name:</label>
          <Input
            placeholder="Name"
            value={data.name}
            onChange={(e) => onChange(e, "name")}
          />

          <label>Description:</label>
          <TextArea
            rows={4}
            placeholder="Description"
            value={data.description}
            onChange={(e) => onChange(e, "description")}
          />

          <label>Price:</label>
          <Input
            placeholder="Price"
            value={data.price}
            onChange={(e) => onChange(e, "price")}
          />

          <label>Discount:</label>
          <Input
            placeholder="Discount"
            value={data.discount}
            onChange={(e) => onChange(e, "discount")}
          />

          <label>Upload Thumbnail Image:</label>
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={(info) => onUploadChange(info, "thumbnail")}
          >
            <Button icon={<UploadOutlined />}>Upload Thumbnail Image</Button>
          </Upload>

          <label>Upload Regular Image:</label>
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={(info) => onUploadChange(info, "regular")}
          >
            <Button icon={<UploadOutlined />}>Upload Regular Image</Button>
          </Upload>

          <label>Category:</label>
          <Select
            defaultValue="select category"
            className="category-select"
            options={category}
            onChange={(e) => onChange(e, "categoryid")}
          />

          <Button
            type="primary"
            onClick={onClick}
            // loading={loading}
            className="btn"
          >
            {id ? "EDIT PRODUCT" : "ADD PRODUCT"}
          </Button>
        </div>
      </div>
    </Frame>
  );
};

export default AddProduct;
