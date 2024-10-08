import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import "../components/Nav.css";
import brand from "./Category/img/White logo - no background.png";
import { useContext } from "react";
import { shopContext } from "../App";
import Login from "../pages/users/Login";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegHeart } from "react-icons/fa";
const user = localStorage.getItem("username");
console.log(user);
function NavScroll() {
  const { login } = useContext(shopContext);
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className=" hvr shadow-lg sticky-top bg-light">
      <Container fluid>
        <Navbar.Brand
          className="a"
          onClick={() => navigate("/")}
          // style={{ color: "#F3DA99" }}
          style={{ color: "white" }}
        >
          <img
            src={brand}
            alt="brandlogo"
            width="100px"
            height="30px"
            style={{ cursor: "pointer" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              className=" a"
              style={{ color: "white" }}
              onClick={() => navigate("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className=" a "
              style={{ color: "white" }}
              onClick={() => navigate("/products")}
            >
              Products
            </Nav.Link>

            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{ background: "none", border: "none", color: "white" }}
              >
                Categories
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/products")}>
                  Products
                </Dropdown.Item>
                {categories.map((e) => (
                  <Dropdown.Item
                    onClick={() => navigate(`/category/${e.slug}`)}
                  >
                    {e.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <h5 style={{ color: "white", marginTop: "10px" }}>hi...{user}</h5>
          <Nav className="d-flex">
            <Nav.Link onClick={() => navigate("/cart")} title="cart">
              <FaShoppingCart color="black" fontSize="25px" />
            </Nav.Link>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            </Dropdown.Menu>
            <Nav.Link
              onClick={() => navigate("/signup")}
              style={{ color: "white" }}
            >
              Registration
            </Nav.Link>
            <Nav.Link variant="light" id="dropdown-basic" style={{background:"none",border:'none',color:'black'}} onClick={() => navigate("/signin")}>
                Login
              </Nav.Link>
              {login?.user?.name}
            <Dropdown>
              <Dropdown.Menu>
                Welcome
                <Dropdown.Item>LogIn</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              onClick={() => navigate("/wishlist")}
              className="mx-0"
              title="admin"
            >
              <FaRegHeart color="white" fontSize="25px" />
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/adminLogin")}
              className="mx-0"
              title="admin"
            >
              <RiAdminFill color="white" fontSize="25px" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
