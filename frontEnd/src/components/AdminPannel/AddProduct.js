import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { shopContext } from "../../App";
import axios from "axios";

const AddProduct = () => {
  // const navigate = useNavigate();
  // const { product, setProduct } = useContext(shopContext);
  // const [newProduct, setNewProduct] = useState({
  //   id: product.length + 1,
  //   productName: "",
  //   price: "",
  //   productImage: "",
  //   category: "",
  // });

  const [title,setTitle] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [quantity,setQuantity] = useState("")
  // const Change = (e) => {
  //   const { name, value } = e.target;
  //   setNewProduct({
  //     ...newProduct,
  //     [name]: value,
  //   });
  // };
  const Submit = async(e) => {
    e.preventDefault()
    if(!title||!image||!description||!price||!category||!quantity){
      toast.error('fill this field')
    }
    const formData = new FormData()
    formData.append("title",title)
    formData.append("image",image)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("quantity",quantity)
try{
    await axios.post('http://127.0.0.1:4000/api/admin/addProduct',formData).then((res)=>{
      toast.success('Product added successfully')
console.log(res);
    }).catch((err)=>{
      toast.error(err)
    })
  }
  catch (error){
console.log(error);
  }
    // if (
    //   newProduct.productName &&
    //   newProduct.price &&
    //   newProduct.productImage &&
    //   newProduct.category
    // ) {
    //   setProduct([...product, newProduct]);
    //   setNewProduct({
    //     id: product.length + 1,
    //     productName: "",
    //     price: "",
    //     productImage: "",
    //     category: "",
    //   });
    //   navigate("/productList");
    // } else {
    //   toast.error("Fill");
    // }
  };
  return (
    <div className="d-flex">
      <Sidebar />
      <div
        style={{ flex: "1", textAlign: "center", backgroundColor: "lightgray" }}
      >
        <h1
          style={{
            padding: "10px",
            position: "relative",
            top: "30px",
            color: "#333",
          }}
        >
          Add Product
        </h1>
        <br />
        <hr />
        <Form>
          <label style={{ fontSize: "20px" }}>Product Name</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="Title"
            value={title}
            onChange={(e) =>setTitle(e.target.value)}
            required
          />{" "}
          <br />
          <br />
          <label style={{ fontSize: "20px" }}>Description</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="Title"
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
            required
          />{" "}
          <br />
          <br />
          <label style={{ fontSize: "20px" }}>Price</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="price"
            value={price}
            onChange={(e)=> setPrice(e.target.value)}
          />
          <br />
          <br />
          <label style={{ fontSize: "20px" }}>Image</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="productImage"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
          />
          <br />
          <br />

          <label style={{ fontSize: "20px" }}>Quantity</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="Title"
            value={quantity}
            onChange={(e) =>setQuantity(e.target.value)}
            required
          />{" "}
          <br />
          <br />
          <label style={{ fontSize: "20px" }}>Product type</label>
          <br />
          <input
            className="shadow"
            style={{
              height: "45px",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              textAlign: "center",
            }}
            type="text"
            name="category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          />
          <br />
          <br />
          <Button
            style={{
              backgroundColor: "black",
              border: "none",
              height: "40px",
              width: "100px",
            }}
            onClick={Submit}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
