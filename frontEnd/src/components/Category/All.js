import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import { Axios, shopContext } from "../../App";
import Nav from "../Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";

const userId = localStorage.getItem('userId')

const All = () => {
  const [products,setProduct] = useState([])
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [wishList,setWishList] = useState([])
  const {id} = useParams()
  
 
useEffect(()=>{
  const getProducts = async()=>{
    try{
const response = await axios.get('http://127.0.0.1:4000/api/users/products');
if(response.status === 200){
  setProduct(response.data.data.products);

}
    }
    catch (error){
console.log(error);
toast.error('error')
    }
  }
  getProducts()
},[])

const search = products.filter((val) => {
  if (searchItem === "") {
    return val;
  } else if (
    val.title.toLowerCase().includes(searchItem.toLowerCase())
  ) {
    return val;
  } else {
    return "";
  }
});

const addToWishlist = async (id) => {
try {
  const response = await Axios.post(`api/users/wishlist/${userId}`,
  {productId:id})
  if(response.status === 200){
    console.log(response);
    setWishList(response.data.data.products);
  }
} catch (error) {
  console.log(error);
}
  
};
  return (
    <div style={{ backgroundColor: "#3c0747" }}>
      <Nav />
      <div style={{border:"none solid black", width:'100%',height:'20px',backgroundColor:'white'}}></div>

      {/* <img src={img1} alt="banner" style={{ width: "100%" }} /> */}
      <div style={{border:"none solid black", width:'100%',height:'20px',backgroundColor:'white'}}></div>
      <div
        className="templateContainer "
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <div className="searchInput_Container">
          <input
            style={{ width: "250px" }}
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearchItem(event.target.value);
            }}
          />
        </div>
      </div>

      <Container>
        <div className="row justify-content-center">
        
        
          {search.map((item) => (
            
            <Card
              style={{ width: "15rem", height: "auto" }}
              key={item._id}
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
                  <i className="bi bi-currency-rupee"></i>
                  <span className="h4">{item.price}</span>
                </Card.Title>
                <Button
                  onClick={() => navigate(`/view/${item._id}`)}
                  className={`d-flex align-item-center m-auto border-0`}
                >
                  View Item
                </Button>
                <br/>
                <Button
                  onClick={()=>addToWishlist(item._id)}
                  className={`d-flex align-item-center m-auto border-0`}
                >
                  Add to wish list
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

export default All;
