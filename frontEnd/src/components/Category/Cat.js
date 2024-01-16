import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../../App";
import Nav from "../Nav";
import img1 from "../slider/nw1.jpg";
import Footer from "../Footer";
import axios from "axios";
import Dog from "./Dog";

const Cat = () => {
  // const { product } = useContext(shopContext);
  const navigate = useNavigate();
  // const pet = product.filter((dg) => dg.category === "Cat");
  const[cat,setCat] = useState([])

  useEffect(()=>{
    const getProduct =async ()=>{
try {
  const response = await axios.get('http://127.0.0.1:4000/api/users/category/cat')
console.log(response.data.data.product);
if(response.status === 200){
  setCat(response.data.data.product)
}
} catch (error) {
  console.log(error);
}
    }
    getProduct()
  },[])

  return (
    <div style={{ backgroundColor: "#3c0747" }}>
      <Nav />
      <div style={{border:"none solid black", width:'100%',height:'20px',backgroundColor:'white'}}></div>
      <img src={img1} alt="banner" style={{ width: "100%" }} />
      <div style={{border:"none solid black", width:'100%',height:'20px',backgroundColor:'white'}}></div>
      <Container>
       
        <div className="row justify-content-center">
        
          {cat.map((item) => (
            <Card
              style={{ width: "15rem", height: "auto",marginTop:'10px' }}
              key={item.id}
              className={`'bg-light-black text-light':'bg-light text-black'} text-center p-0 overflow-hidden shadow mx-auto mb-4`}
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </Card.Title>
                <Card.Img
                  variant="top"
                  src={item.Image}
                  style={{ height: "300px" }}
                />
                <Card.Title>
                  <i class="bi bi-currency-rupee"></i>
                  <span className="h4">{item.price}</span>
                </Card.Title>
                <Button
                  onClick={() => navigate(`/view/${item.id}`)}
                  className={`d-flex align-item-center m-auto border-0`}
                >
                  View Item
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <div style={{border:"none solid black", width:'100%',height:'20px',backgroundColor:'white'}}></div>
      <Footer />
    </div>
  );
};

export default Cat;
