import './login.css'
import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const logincustomer = async () => {
    setLoading(true);
    try {
      const user = await axios.post("http://localhost:7000/customer/login", data);
      const customerid=user.data.customerId;
      const token=user.data.token;
      localStorage.setItem('customerId',customerid)
      localStorage.setItem('token',token)

      console.log(user);
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const onClick = () => {
    logincustomer();
  };

  return (
    <div className="customerlogin">
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




<div className="login">

</div>


export default Login