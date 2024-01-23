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

//delete categories
const handleDelete = async(id)=>{
  try {
    const data = await axios.delete(`http://127.0.0.1:4000/api/admin/delete-category/${id}`,
    {name: updatedName});
    if(data.status === 200){
      toast.success(`category is deleted`);
      
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
      <div       style={{
    flex: "1",
    backgroundColor: "#3c0747",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height:"100vh"
    
  }}>
        <h3 style={{color:'white',marginLeft:"25%"}} className="p-3 mt-5">Manage Category</h3>
        <div className= "w-50">
          <CategoryForm 
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
            
          />
        </div>
        <div className="d-flex flex-column p-3 w-50 " >
          <table className="table" style={{marginLeft:"25%",marginRight:"25%"}} >
            <thead >
              <tr  className="text-center">
                <th scope="col">Name</th>
                <th scope="col">Update</th>
                <th scope="col">Remove</th>
                
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr  className="text-center">
                    <td key={c.id} >{c.name}</td>
                    <td  className="text-center">
                      <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); 
                      setUpdatedName(c.name);
                      setSelected(c);
                      }}>Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
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
