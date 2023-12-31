import { Avatar } from "antd";
import "./navbar.css";
import { UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState({ email: "", name: "", image: "" });

  const fetchUser = async () => {
    const userId = localStorage.getItem("sellerId");
    console.log(userId);
    const user = await axios.get(`http://localhost:7000/seller/${userId}`);
    console.log(user.data);
    setUser({
      name: user.data.name,
      email: user.data.email,
      image: user.data.image,
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="navbar">
      <div className="user">
        <Avatar
          size={50}
          src={<img src={user.image} crossOrigin="anonymous" />}
        />
        <div className="sub">
          <p className="username">{user.name}</p>
          <p className="email">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
