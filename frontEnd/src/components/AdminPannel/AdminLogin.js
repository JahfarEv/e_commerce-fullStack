import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import Brand from "../Category/img/Color logo - no background.png";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const adminName = useRef();
  const adminPass = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    const newName = adminName.current.value;
    const newPass = adminPass.current.value;

    try {
      const data = {
        username: newName,
        password: newPass,
      };
      await axios
        .post("http://127.0.0.1:4000/api/admin/login", data)
        .then((res) => {
          console.log(res);
          toast.success("login successfull");
          navigate("/dashbord");
          console.log(res.data.token);
          localStorage.setItem("adminToken", res.data.token);
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container fluid style={{ backgroundColor: "#3c0747" }}>
        <h1 className="d-flex align-items-center justify-content-center font-weight-bold">
          <img src={Brand} alt="logo" style={{ width: "200px" }} />
        </h1>
        <div className="d-flex align-items-center justify-content-center">
          <span
            class="border border-gray "
            style={{ marginBottom: "5px", borderRadius: "10px" }}
          >
            <h1
              style={{ marginTop: "20px", color: "white", textAlign: "center" }}
            >
              Admin Login
            </h1>

            <Form
              className="align-items-center mt-2 p-3"
              style={{ color: "white" }}
            >
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{ marginBottom: "20px" }}
              >
                <Form.Label>Email id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  ref={adminName}
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
                  ref={adminPass}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
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
          <a className="text-white" href="https://mdbootstrap.com/">
            PetFoods
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default AdminLogin;
