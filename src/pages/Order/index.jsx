import Frame from "../../Components/Frame";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./order.css";

const Order = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState([false]);

  const Navigate = useNavigate();

  const orderCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addorder/${id}`}>{id}</Link>,
    },
    { title: "Customer", dataIndex: "customerId",render:customer=><p>{customer.name}</p> },
    {
      title: "Product",
      dataIndex: "products",
      render: product=><p>{product[0].productId}</p>,
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
      const response = await axios.delete(`http://localhost:7000/order/${id}`);
    } catch (e) {
      console.log(e);
    }
    fetchOrder();
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
        const sellerId=localStorage.getItem('sellerId')
      const response = await axios.get(`http://localhost:7000/order?sellerId=${sellerId}`);
      setLoading(false);
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const onClick = () => {
    Navigate("/seller/addorder");
  };
  return (
    <Frame>
      <div className="order-btns">
        <Button onClick={onClick} type="primary">
          ADD ORDER
        </Button>
      </div>
      <Table className="order-table" columns={orderCol} dataSource={data} />
    </Frame>
  );
};

export default Order;
