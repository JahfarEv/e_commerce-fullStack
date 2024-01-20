import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Container from "react-bootstrap/esm/Container";


const ProductCategory = () => {
    const params = useParams()
    const [products,setProduct] = useState([])
    const [category,setCategory] = useState([])
    const navigate = useNavigate();
    

useEffect(()=>{
if(params.slug) getProductsByCategory()
},[params.slug])

    const getProductsByCategory = async()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:4000/api/users/product-category/${params.slug}`)
            console.log(response.data);
            setProduct(response.data.data.products)
            setCategory(response.data.data.category)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className='container'>
<h1>{category.name}</h1>
<h1>{products.length}</h1>
      </div>

      
        <div className="row justify-content-center">
          {products.map((item) => (
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
              </Card.Body>
            </Card>
          ))}
        </div>
     
    </div>
  )
}

export default ProductCategory
