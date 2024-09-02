import React, { useContext, useEffect, useState } from "react";
import { Axios, shopContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "../Nav";
import Footer from "../Footer";
import axios from "axios";

const ViewProduct = () => {
  const naviagate = useNavigate();

  const { id } = useParams();

  const [viewProduct, setViewProduct] = useState([]);
  const userId = localStorage.getItem("userId");
  console.log(userId);

  useEffect(() => {
    const viewProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/users/product/${id}`
        );
        console.log(response);
        if (response.status === 200) {
          setViewProduct(response.data.data.products);
        }
      } catch (error) {
        console.log(error);
        toast.error("Product not available");
      }
    };
    viewProduct();
  }, []);
  const view = [];
  view.push(viewProduct);

  const handleClick = async () => {
    try{
      const response = await Axios.post(
        `http://127.0.0.1:4000/api/users/cart/${userId}`,
        { product: id }
      );
      
      if (response.status === 200) {
        await Axios.get(`http://127.0.0.1:4000/api/users/viewcart/${userId}`);
       toast.success('Product added to cart')
       
      }
    }
    catch (error){
console.log(error);
    }
    
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          border: "none solid black",
          width: "100%",
          height: "20px",
          backgroundColor: "white",
        }}
      ></div>
      <Container className="d-flex align-items-center justify-content-center ">
        {view.map((item) => (
          <div className="mt-4">
            <Card
              key={item.id}
              style={{ width: "35%", height: "auto" }}
              className={`'bg-light-black text-light':'bg-light text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}
            >
              <Card.Img
                variant="top"
                src={item.Image}
                style={{ height: "100%", width: "100%" }}
              />
            </Card>

            <Card
              key={item.id}
              style={{ width: "36%", height: "auto" }}
              className={`'bg-light-black text-light':'bg-light text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                  }}
                >
                 Name: {item.title}
                </Card.Title>
                <Card.Title
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Description:{item.description}
                </Card.Title>
                <Card.Title
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                Category:  {item.name}
                </Card.Title>
                <Card.Title>
                  <i class="bi bi-currency-rupee"></i>
                  <span className="h4">:{item.price}</span>
                </Card.Title>
                <Button
                  onClick={handleClick}
                  className={`d-flex align-item-center m-auto border-0`}
                >
                  <BsCartPlus size="1.8rem" />
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
      <div
        style={{
          border: "none solid black",
          width: "100%",
          height: "20px",
          backgroundColor: "white",
        }}
      ></div>
      <Footer />
    </div>
  );
};

export default ViewProduct;
