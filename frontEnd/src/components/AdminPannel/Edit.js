import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
// import category from "../../../backEnd/src/model/categoryModel";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product,setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: ""
  })

  useEffect(()=>{
    const fetchProducts = async()=>{
try {
  const response = await axios.get(`http://127.0.0.1:4000/api/admin/product/${id}`)
  console.log(response.data.data.productById);
const {_id,title,description,image,price,category} = response.data.data.productById
setProduct({
  id:_id,
  title,
  description,
  image,
  price,
  category


})

} catch (error) {
  console.log(error);
}
    }
    fetchProducts()
  },[id])

  const updateProduct =async (e)=>{
e.preventDefault()
try {
  const response = await axios.patch(`http://127.0.0.1:4000/api/admin/update`,product)
console.log(response);
  if(response.status === 200){
    console.log('Product updated successfully');
    toast.success('Product updated successfully')
    navigate('/ProductList')
  }
} catch (error) {
  console.log(error);
}
  }

  const handleChange = (a)=>{
const {name,value} = a.target;
setProduct((data)=>({
  ...data,
  [name]:value
}))

}
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "sans-serif",
            padding: "10px",
            position: "relative",
            top: "30px",
            color: "#333",
          }}
        >
         EDIT PRODUCTS
        </h1>
        <br />
        <hr />
        <Form onSubmit={updateProduct}>
          {/* <label style={{ fontSize: "20px" }}> Product Name </label> */}
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "500px",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            placeholder="Write a title"
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
          <br />
          <br />
          {/* <label style={{ fontSize: "20px" }}> Product Price </label> */}
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "500px",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            placeholder="Write a price"
            type="number"
            name="price"
           value={product.price}
           onChange={handleChange}
          />
          <br />
          <br />

          {/* <label style={{ fontSize: "20px" }}> Product Image </label> */}
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "500px",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            placeholder="Upload image"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <br />
          <br />

          {/* <label style={{ fontSize: "20px" }}> Product Type </label> */}
          <br />
          <select
            className="shadow"
            style={{
              height: "40px",
              width: "300px",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
              fontSize: "20px",
            }}
            placeholder="Select category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option>dog</option>
            
          </select>
          <br />
          <br />
          <Button
            type="submit"
            style={{
              backgroundColor: "black",
              border: "none",
              height: "40px",
              width: "100px",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
