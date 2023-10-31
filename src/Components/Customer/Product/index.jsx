import { Card } from "antd";
import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./product.css";

const Product = (props) => {
  const [customer, setCustomer] = useState({});
  const getCustomerById = async () => {
    const customerId = localStorage.getItem("customerId");
    const response = await axios.get(
      `http://localhost:7000/customer/${customerId}`
    );
    setCustomer(response.data);
  };

  const onBuy = async () => {
    const customerId = localStorage.getItem("customerId");
    const sellerId = props.sellerId;
    const products = [
      {
        productid: props.id,
        quantity: 1,
      },
    ];
    await getCustomerById();
    const address = customer.address;

    await axios.post(`http://localhost:7000/order`, {
      customerid: customerId,
      sellerid: sellerId,
      products: products,
      shippingAddress: address,
      status: "pending",
    });
    toast("order placed");
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={props.thumbnailImage} />}
    >
      <div className="content">
        <div className="price">
          <h2>{props.price}</h2>
          <h3>discount:{props.disocunt}</h3>
        </div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <div className="btns">
          <Button onClick={onBuy}>
            Buy<Button></Button>Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
