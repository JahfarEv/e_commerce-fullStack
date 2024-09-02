import React, { useEffect, useState } from "react";
import "../components/Home.css";
import { Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-awesome-slider/dist/styles.css";
import img1 from "../components/slider/new2.jpg";
import img2 from "../components/slider/nw1.jpg";
import Footer from "./Footer";
import Nav from "./Nav";
import { toast } from "react-toastify";
import axios from "axios";
import { Checkbox } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/admin/category/get-category"
      );
      if (response.status === 200) {
        setCategory(response.data.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
    getTotal();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:4000/api/users/product-list/${page}`
      );
      setLoading(false);
      if (response.status === 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("error");
    }
  };
  //getTotal count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:4000/api/users/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:4000/api/users/product-list/${page}`
      );
      console.log(data);
      setLoading(false);
      setProduct([...products, ...data?.data]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length) getProducts();
  }, [checked.length]);
  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);
  //get filters product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/users/product-filters",
        { checked }
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
  <Nav />

  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <img 
      src={img1}
      className="rounded border"
      alt="bannerhome"
      style={{ width: "90%", height: "auto", cursor: "pointer" }}
      onClick={() => navigate("/products")}
    />  
  </div>

  <Container>
    <div className="row">
      <div className="row justify-content-center">
        {products.map((item) => (
          <Card
            style={{ width: "17rem", height: "auto" }}
            key={item._id}
            className="bg-light text-black text-center p-0 overflow-hidden mx-auto mb-4 border-1"
          >
            <Card.Body>
              <Card.Img
                variant="top"
                src={item.Image}
                style={{ height: "300px" }}
              />
              <Card.Title
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  color: "white",
                }}
              >
                {item.title}
              </Card.Title>

              <Card.Title style={{ color: "white" }}>
                <i className="bi bi-currency-rupee"></i>
                <span className="h4">{item.price}</span>
              </Card.Title>
              <Button
                onClick={() => navigate(`/view/${item._id}`)}
                className="d-flex align-items-center m-auto border-0"
              >
                View Item
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
    
    {/* Load More Button */}
    <div className="m-2 p-3">
      {products && products.length < total && (
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  </Container>

  {/* Optional: Bottom Divider */}
  <div
    style={{
      border: "none solid black",
      width: "100%",
      height: "2px",
      backgroundColor: "gray",
    }}
  ></div>

  <Footer />
</>

  );
};

export default Home;
