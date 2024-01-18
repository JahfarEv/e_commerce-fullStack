import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
const { Option } = Select;
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
  const[categories,setCategories] = useState([])
  const [category, setcategory] = useState("");
  const [image,setImage] = useState("")
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
      <div style={{ flex: "1", textAlign: "center" , backgroundColor: "#3c0747" }}>
        <h1
          style={{
            
            padding: "10px",
            position: "relative",
           margin:"10px",
            color: "white",
          }} className="mt-5"
        >
         Update Products
        </h1>
        <div className="m-1 w-75">
        <Select
            bordered={false}
            placeholder="Select category"
            size="large"
            showSearch
            className="form-select mb-3"
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
        <br />
        <hr />
        <Form onSubmit={updateProduct}>
          
          <div className="mb-3">
          <input
            className="form-control"
           placeholder="Write a title"
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
          </div>
         
          <br />
          <div className="mb-3">
          <input
            className="form-control"
            
            placeholder="Write a price"
            type="number"
            name="price"
           value={product.price}
           onChange={handleChange}
          />
          </div>
         
<br/>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
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

          {/* <label style={{ fontSize: "20px" }}> Product Image </label> */}
          {/* <br />
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
          <br /> */}

         
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
    </div>
  );
};

export default Edit;
