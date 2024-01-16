import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../../App";
import Sidebar from "../Sidebar";
import { Table } from "react-bootstrap";
import axios from "axios";

const Users = () => {
// const { user } = useContext(shopContext);
const [user,setUser] = useState([])
useEffect(()=>{
const users = async ()=>{
  try {
    const response = await axios.get('http://127.0.0.1:4000/api/admin/users');
    console.log(response.data);
    if(response.status === 200){
      setUser(response.data.data.AllUsers)
    }
  } catch (error) {
    console.log(error);
  }
}
users()
},[])

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", textalign: "center" }}>
        <Table striped bordered hover size="sm" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          {user.map((item) => (
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default Users;