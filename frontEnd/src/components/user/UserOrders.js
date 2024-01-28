import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { useNavigate, useParams } from 'react-router-dom';

const UserOrders = () => {
    const [orders,setOrders] = useState([])
    const navigate = useNavigate()
    const{id} = useParams()

    const getOrders = async()=>{
        try {
            const {data} = await axios.get('http://127.0.0.1:4000/api/users/user-orders')
            console.log(data);
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getOrders()
    },[])
  return (
    <>
    All orders
      <MDBContainer fluid>
        {orders.map((item) => (  
        

            <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                    >
                    <MDBCardImage
                      src={item.image}
                      fluid
                      className="w-100"
                      />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{item.title} </h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    <span>310</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                    <span></span>
                    <span className="text-primary"> </span>
                    <span></span>
                    <span className="text-primary"></span>
                    <span>
                     
                      <br />
                    </span>
                  </div>
                 
                  <p className="text-truncate mb-4 mb-md-0">
                    {item.description}
                  </p>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                  >
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{item.price}</h4>
                    <span className="text-danger">
                      <s>$20.99</s>
                    </span>
                  </div>
                  <h6 className="text-success">Deliverd</h6>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn color="primary" size="sm" onClick={() =>  navigate(`/`)}>
                      Back to sho ping
                    </MDBBtn>
                    <MDBBtn outline color="primary" size="sm" className="mt-2" onClick={() => navigate(`/wishList/${id}`)}>
                      Go to wish list
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    
))}
     
    </MDBContainer>
    </>
  )
}

export default UserOrders
