import React from 'react';
import { CategoryContext } from "../../providers/CategoryProvider";

const DeleteCategory = (props) =>{
    const {getCategoryById, deleteCategory} = React.useContext(CategoryContext);
    const [category, setCategory] = React.useState({
        name: null
    })
    const onClickDelete = async () =>{
        await deleteCategory(props.match.params.id)
        props.history.push("/category")
    }

    React.useEffect(()=>{
           getCategoryById(props.match.params.id)
        .then(setCategory); 
    }, [])
    return (
        <>
       {category.name !== null ? 
       <>
       <h1>Delete Category</h1>
       <h3>Category: {category.name}</h3> 
       <button className="btn btn-danger m-1" onClick={onClickDelete}>Delete</button>
       <button className="btn btn-primary" onClick={()=> props.history.push("/category")}>Cancel</button>
       </>
                        : 
       
       <div>Error No Record Found</div> }
       </>
    )
}
export default DeleteCategory;