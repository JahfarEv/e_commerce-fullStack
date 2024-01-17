import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../../App";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const viewProduct = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/api/admin/view");
      console.log(response.data.data.products);
      if (response.status === 200) {
        setProduct(response.data.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewProduct();
  }, []);

  const removeItem = async (id) => {
    try {
      const productId = id;
      const response = await axios.delete(
        "http://127.0.0.1:4000/api/admin/products",
        {
          data: {
            productId: productId,
          },
        }
      );
      viewProduct();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", textAlign: "center"}}>
        <Table striped bordered hover size="sm" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {product.map((item) => (
            <tbody>
              <tr>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <img
                    style={{ height: "3rem" }}
                    src={item.Image}
                    alt="productlist"
                  />
                </td>
                <td>
                  <Button
                    style={{ backgroundColor: "black", border: "none" }}
                    className="m-2"
                    onClick={() => navigate(`/edit/${item._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ backgroundColor: "black", border: "none" }}
                    onClick={() => removeItem(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
