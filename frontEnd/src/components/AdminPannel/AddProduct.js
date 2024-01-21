import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [category, setcategory] = useState("");

  const allCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/admin/category/get-category"
      );
      console.log(response);
      if (response.status === 200) {
        setCategories(response.data.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in getting category");
    }
  };
  useEffect(() => {
    allCategories();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);

      const response = await axios.post(
        "http://127.0.0.1:4000/api/admin/addProduct",
        formData
      );
      if (response.status === 201) {
        toast.success("Product create successfully");
        navigate("/ProductList");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div
        style={{
          flex: "1",
          backgroundColor: "#3c0747"
        }}
      >
        <h1
          style={{
            // position: "relative",
            top: "15px",
            color: "white",
            textAlign:"center"
          }}
        >
          CREATE PRODUCT
        </h1>
        <div className="m-1 w-50" >
          <Select
            bordered={false}
            placeholder="Select category"
            size="large"
            showSearch
            className="form-select mb-3 "
            style={{marginLeft:"100px",marginRight:"100px"}}
            onChange={(value) => {
              setcategory(value);
            }}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12"  style={{marginLeft:"100px",marginRight:"100px"}}>
              {image ? image.name : "Upload image..."}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            {image && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="product photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={title}
              placeholder="write a name"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              style={{marginLeft:"150px",marginRight:"150px"}}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              style={{marginLeft:"150px",marginRight:"150px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="write a Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              style={{marginLeft:"150px",marginRight:"150px"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
              style={{marginLeft:"150px",marginRight:"150px"}}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" style={{marginLeft:"150px",marginRight:"150px"}} onClick={handleCreate}>
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
