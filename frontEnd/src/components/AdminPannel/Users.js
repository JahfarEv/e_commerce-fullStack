import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../../App";
import Sidebar from "../Sidebar";
import { Table } from "react-bootstrap";
import axios from "axios";

const Users = () => {
  // const { user } = useContext(shopContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const users = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/admin/users"
        );
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data.data.AllUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    users();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div  style={{
    flex: "1",
    backgroundColor: "#3c0747",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height:"100vh"
    
  }}>
      <h1 style={{color:"white",marginTop:"10px",fontWeight:"bold"}}>Users Details</h1>
      <div className="d-flex flex-column w-50 " >
        <Table >
          <thead >
            <tr>
              
              <th>Name</th>
              <th className="text-center">Email</th>
            </tr>
          </thead>
          {user.map((item) => (
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td className="text-center">{item.email}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
