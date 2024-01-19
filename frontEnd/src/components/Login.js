import React, {  useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import Brand from "../components/Category/img/Color logo - no background.png";
import axios from "axios";

const Login = () => {
  // const { user, setLogin } = useContext(shopContext);
  const navigate = useNavigate();
  const loginName = useRef();
  const loginPass = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    const newLoginName = loginName.current.value;
    const newLoginPass = loginPass.current.value;
    try {
      const data = {
        name: newLoginName,
        password: newLoginPass,
      };
      await axios
        .post("http://127.0.0.1:4000/api/users/login", data)
        .then((res) => {
          const storeToken = res.data.token;
          const userId = res.data.user._id
          const username  =res.data.user.name
          toast.success("login successfully");
          console.log(res.data.user);
          navigate("/all");
          localStorage.setItem("token", storeToken);
          localStorage.setItem("userId",userId)
          localStorage.setItem("username",username)
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container fluid style={{ backgroundColor: "#3c0747" }}>
        <h1 className="d-flex align-items-center justify-content-center font-weight-bold">
          <img
            src={Brand}
            alt="logo"
            style={{ width: "200px" }}
            onClick={() => navigate("/")}
          />
        </h1>
        <div className="d-flex align-items-center justify-content-center">
          <span
            className="border border-gray "
            style={{ marginBottom: "5px", borderRadius: "10px" }}
          >
            <Form
              className="align-items-center mt-5 p-3"
              style={{ color: "white" }}
            >
              <h3>Log in</h3>

              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{ marginBottom: "20px" }}
              >
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  ref={loginName}
                />
                <Form.Text className="text-light">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                style={{ marginBottom: "20px" }}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={loginPass}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>

              <Button
                onClick={() => navigate("/signup")}
                variant="outline-white bg-primary mx-1"
                type="submit"
                style={{ background: "black", border: "none" }}
              >
                Create account
              </Button>
            </Form>
          </span>
        </div>
      </Container>

      <MDBFooter
        className="text-center text-white mt-2"
        style={{ backgroundColor: "#3c0747" }}
      >
        <MDBContainer className="p-4"></MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <span className="text-white" href="https://mdbootstrap.com/">
            PetFoods
          </span>
        </div>
      </MDBFooter>
    </>
  );
};

export default Login;
