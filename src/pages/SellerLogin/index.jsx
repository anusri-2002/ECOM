import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sellerlogin.css";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const loginseller = async () => {
    setLoading(true);
    try {
      const user = await axios.post("http://localhost:7000/seller/login", data);
      const sellerid=user.data.sellerId;
      const token=user.data.token;
      localStorage.setItem('sellerId',sellerid)
      localStorage.setItem('token',token)

      console.log(user);
      setLoading(false);
      navigate("/seller/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const onClick = () => {
    loginseller();
  };

  return (
    <div className="sellerlogin">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Email</label>
        <Input onChange={(e) => onChange(e, "email")} placeholder="Email" />
        <label>password</label>
        <Input.Password
          onChange={(e) => onChange(e, "password")}
          size="large"
          placeholder="password"
        />

        <Button
          onClick={onClick}
          className="loginbtn"
          size="large"
          type="primary"
        >
          LOG IN
        </Button>
        <p>Not a Member?Sign Up</p>
      </div>
    </div>
  );
};
export default SellerLogin;
