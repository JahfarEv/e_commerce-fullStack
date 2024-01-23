import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    
    <input type="text" class="form-control" placeholder='enter new category' 
    value={value} onChange={(e)=> setValue(e.target.value)} style={{marginLeft:"25%",marginRight:"25%"}}/>
    
  </div>
 
  
  <button type="submit" className="btn btn-primary" style={{marginLeft:"25%",marginRight:"25%"}}>Submit</button>
</form>
    </>
  )
}

export default CategoryForm
