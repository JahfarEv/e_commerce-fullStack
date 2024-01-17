import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../Form/CategoryForm";
import {} from 'antd'
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")

  //handle form

  const handleSubmit = async(e)=>{
e.preventDefault()
try {
  const data = await axios.post('http://127.0.0.1:4000/api/admin/category/create',{name})
if(data.status === 201 ){
  allCategories()
  toast.success(`${name}is created`)
  console.log(data);
  
  
}

} catch (error) {
  console.log(error);
  toast.error('somthing went wrong')
}
  }

  //get all categories
  
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
    useEffect(() => {
    allCategories();
  }, []);
//update category
const handleUpdate = async(e)=>{
e.preventDefault()
try {
  const data = await axios.put(`http://127.0.0.1:4000/api/admin/update-category/${selected._id}`,
  {name: updatedName});
  if(data.status === 200){
    toast.success(`${updatedName} is updated`);
    setSelected(null);
    setUpdatedName("");
    setVisible(false);
    allCategories()
  }
  else{
    toast.error(data.message);
  }
} catch (error) {
  console.log(error);
  toast.error('somthing went wrong')
}
}
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", textAlign: "center" }}>
        <h1>Manage Category</h1>
        <div className="p-3 w-50">
          <CategoryForm 
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr>
                    <td key={c.id}>{c.name}</td>
                    <td>
                      <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); 
                      setUpdatedName(c.name);
                      setSelected(c);
                      }}>Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger ms-2">Delete</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
      </Modal>
    </div>
  );
};

export default CreateCategory;
