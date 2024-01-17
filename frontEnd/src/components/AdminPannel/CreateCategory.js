import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import axios from "axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  //get all categories
  useEffect(() => {
    const allCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/admin/category/get-category"
        );
        console.log(response);
        if (response.status === 200) {
          setCategories(response.data.data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong in getting category");
      }
    };

    allCategories();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="">
        <h1>Manage Category</h1>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr>
                    <td key={c.id}>{c.name}</td>
                    <td>
                      <button className="btn btn-primary">edit</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
