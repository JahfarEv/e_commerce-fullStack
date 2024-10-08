import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/users/Login";
import Registration from "./pages/users/Registration";
import Dog from "./pages/products/Dog";
import Cat from "./pages/products/Cat";
import Products from "./pages/products/Products";
import { createContext, useState } from "react";
import Home from "./components/Home";
import ViewProduct from "./components/Category/ViewProduct";
import { Items } from "./components/Items";
import Cart from "./components/Category/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashbord from "./components/AdminPannel/Dashbord";
import AddProduct from "./components/AdminPannel/AddProduct";
import AdminLogin from "./components/AdminPannel/AdminLogin";
import ProductList from "./components/AdminPannel/ProductList";
import Users from "./components/AdminPannel/Users";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Edit from "./components/AdminPannel/Edit";
import CreateCategory from "./components/AdminPannel/CreateCategory";
import axios from "axios";
import ProductCategory from "./components/Category/ProductCategory";
import WishList from "./components/Category/WishList";
import UserDashbord from "./components/user/UserDashbord";
import UserOrders from "./components/user/UserOrders";
export const shopContext = createContext();

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST || "http://127.0.0.1:4000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

function App() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(Items);
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [productList, setProductList] = useState();
  const [buy, setBuy] = useState([]);

  return (
    <div className="App">
      <shopContext.Provider
        value={{
          user,
          setUser,
          setLogin,
          login,
          product,
          cart,
          setCart,
          productList,
          setProductList,
          setProduct,
          buy,
          setBuy,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dog" element={<Dog />} />
            <Route path="/cat" element={<Cat />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/category/:slug" element={<ProductCategory />} />
            <Route path="/view/:id" element={<ViewProduct />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/user-dashbord" element={<UserDashbord />} />
          </Routes>
        </BrowserRouter>
      </shopContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
