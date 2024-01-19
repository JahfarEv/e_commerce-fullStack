import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WishList = () => {
    const navigate =useNavigate()
    const [wishLists,setWishList] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(()=>{
        const wishList = async()=>{
try {
    const response = await axios.get(`http://127.0.0.1:4000/api/users/viewlist/${userId}`)
    setWishList(response.data.data)
    console.log(response);
} catch (error) {
    console.log(error);
}
        }
        wishList()
    },[])
  return (
    <div>
      <Container>
        <div className="row justify-content-center">
          {wishLists.map((item) => (
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
                  onClick={() => navigate(`/wishlist/${item._id}`)}
                  className={`d-flex align-item-center m-auto border-0`}
                >
                  View Item
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default WishList
