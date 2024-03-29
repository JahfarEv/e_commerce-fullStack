import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import Brand from "../components/Category/img/Color logo - no background.png";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "auto",
        position:"fixed",
        marginRight:'20px'
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="black"  style={{
      borderRadius: "10px",
      // position: "sticky",
      top: "0",
      height: "100vh"}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img src={Brand} alt="brandimg" style={{ width: "150px", height: "35px" }} />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashbord" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createCategory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bookmark">Category</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/productList" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Product</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/"
              activeClassName="activeClicked"
              onClick={() => navigate("/")}
            >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            About us
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
