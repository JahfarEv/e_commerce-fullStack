import React, { useEffect, useState } from "react";
import "../components/Home.css";
import { Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-awesome-slider/dist/styles.css";
import img1 from "../components/slider/nw3.gif";

import Footer from "./Footer";
import Nav from "./Nav";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked,setChecked] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)

  

  const getCategory =async ()=>{
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/admin/category/get-category')
    if(response.status === 200){
      setCategory(response.data.data.category)
    }
    } catch (error) {
      console.log(error);
    }
        }
useEffect(()=>{
getCategory()
getTotal()

},[])


  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://127.0.0.1:4000/api/users/product-list/${page}`
      );
      setLoading(false)
      if (response.status === 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("error");
    }
  };
//getTotal count

const getTotal = async()=>{
  try {
    const {data} = await axios.get('http://127.0.0.1:4000/api/users/product-count')
    setTotal(data?.total)
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
if(page === 1) return;
loadMore()
},[page])
//loadmore
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`http://127.0.0.1:4000/api/users/product-list/${page}`);
    console.log(data);
    setLoading(false);
    setProduct([...products, ...data?.data]);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

  //filter by category
  const handleFilter =(value,id)=>{
let all = [...checked]
if(value){
  all.push(id)
}
else{
  all = all.filter(c => c!== id);

}
setChecked(all)
  }
  useEffect(() => {
   if(!checked.length) getProducts();
  }, [checked.length]);
useEffect(()=>{
if(checked.length) filterProduct()
},[checked])
  //get filters product

  const filterProduct = async()=>{
    try {
      const {data} = await axios.post('http://127.0.0.1:4000/api/users/product-filters',{checked})
      setProduct(data.products)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{ backgroundColor: "#3c0747" }}>
      <Nav />
      
      <div
        style={{
          border: "none solid black",
          width: "100%",
          height: "20px",
          backgroundColor: "white",
        }}
      ></div>
     
      {/* <img 
        src={img1}
        alt="bannerhome"
        style={{ width: "100%", cursor: "pointer" }}
        onClick={() => navigate("/all")}
      /> */}

      <div
        style={{
          border: "none solid black",
          width: "100%",
          height: "20px",
          backgroundColor: "white",
        }}
      ></div>
      
      
       
          

          <Container>
          <div className="row mt-3">
          <div className="col-md-3">
            <h4 className="text-center text-white">Filter by category</h4>
            {category.map((c)=>(
              <Checkbox key={c.id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
        {/* <div className="d-flex justify-content-center">
          <Card
            onClick={() => navigate("/dog")}
            style={{marginRight: "10px", border:'none',marginTop:'25px',backgroundColor:'#3c0747',width:'50%',height:"80%"}}
          >
            
            <Card.Img variant="top" src={img2} style={{ height: "80%", cursor:'pointer' }} />
          </Card>
          <Card onClick={() => navigate("/cat")} style={{border:'none',marginTop:'25px',backgroundColor:'#3c0747',width:'50%',height:'80%'}}>
           
            <Card.Img variant="top" src={img3} style={{ height: "80%", cursor:'pointer' }} />
          </Card>
        </div> */}


        <div className="row justify-content-center " style={{margin:"15px"}}>
        
          {products.map((item) => (
            <Card
              style={{ width: "16rem", height: "auto" }}
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
        <div className="m-2 p-3">
        {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
        )}
          </div>
        
      </Container>
      {/* <div className="m-2 p-2">{products && products.length < total &&(
          <button className="btn btn-warning" onClick={(e)=>{e.preventDefault(); setPage(page + 1)}}>{loading ? "Loading..." :"Loadmore"}</button>
        )}</div> */}
        
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

export default Home;
