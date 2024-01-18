import {useState,useEffect} from "react"
import axios from 'axios'

export default function useCategory(){
    const [categories,setCategories] = useState([])

    const getCategories =async ()=>{
try {
    const response = await axios.get('http://127.0.0.1:4000/api/admin/category/get-category')
setCategories(response.data.data.category)
// console.log(response.data.data.category);
} catch (error) {
    console.log(error);
}
    }
useEffect(()=>{
getCategories()
},[])
return categories
}