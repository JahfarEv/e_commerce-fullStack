import React, {useEffect, useState } from "react";
import { Axios } from "../../App";
import Nav from "../Nav";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
console.log(userId);
  const getCart = async () => {
    const response = await Axios.get(
      `api/users/viewcart/${userId}`
    );
    setCart(response.data.data);
  };
  useEffect(() => {
    getCart();
  }, []);

  //total price
  const totalPrice = ()=>{
    try {
      let total = 0
      cart.map((item)=>{
        total = total+item.price
      })
      return total
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromCart = async (id) => {
    try {
      const productId = id;
      const response = await Axios.delete(
        `api/users/cart/remove/${userId}`,
        { data: { productId: productId } }
      );
      console.log(response.data);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await Axios.post(
        `api/users/payments/${userId}`
      );
      console.log(response);

      const session = response.data.session;
      window.location.href = session;
      navigate('/orders')
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="continer" style={{ color: "white" }}>
        <h1 className="mt-4">Your Cart</h1>
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "" }}
            >
              <div>
                <h5>{item.title}</h5>
                <p>
                  {" "}
                  <i class="bi bi-currency-rupee"></i>
                  {item.price}
                  
                </p>
                <div className="input-group">
                  <button
                    // onClick={() => cartDegrement(item)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    -
                  </button>
                  <button
                    // onClick={() => cartIncrement(item)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteFromCart(item._id)}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handlePayment}
                    type="button"
                    className="btn btn-outline-success "
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div>
                <img
                  src={item.Image}
                  alt={item.title}
                  style={{ width: "100px" }}
                />
                <p>Quantity :{item.quantity}</p>
                {/* <p>
                  Total : <i class="bi bi-currency-rupee"></i>
                </p> */}
              </div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mt-3" style={{ fontSize: "25px", fontWeight: 600 }}>
            Your Total Amount :{totalPrice()}
          </p>
          <p className="mt-3" style={{ fontSize: "25px", fontWeight: 600 }}>
            {/* <i class="bi bi-currency-rupee"></i>{totalAmount} */}
          </p>
        </div>
      </div>
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

export default Cart;
