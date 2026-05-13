import React from 'react'
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { addItem } from '../../Service/ItemService';
import { useEffect } from 'react';




const itemForm = () => {


    const{categories, setItemsData, itemsData, setCategories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
    });

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const formData = new FormData();
    //     formData.append("name", data.name);
    //     formData.append("description", data.description);
    //     formData.append("price", data.price);
    //     formData.append("categoryId", data.category);
    //     formData.append("image", image);
    //     try {

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);
        // const formData = new FormData();
        // formData.append("name", data.name);
        // formData.append("description", data.description);
        // formData.append("price", data.price);
        // formData.append("categoryId", data.categoryId);
        // formData.append("image", image);
    
        try {
            if (!image) {
                toast.error("Select image for item");
                
                return;
            }
            const response =await addItem(formData);
            if (response.status === 201) {
                setItemsData([...itemsData, response.data]);
                setCategories((prevCategories) => {category.categoryId === response.data.categoryId ? {...category, items: category.items + 1} : category});
                toast.success('Item added successfully!');
                setData({
                    name: '',
                    description: '',    
                    price: '',
                    categoryId: ''
                })
                setImage(false);

            } else {
                console.log(error); // 👈 ADD THIS
                console.log(error.response); // 👈 ADD THIS
                toast.error('Error adding item');

            }
        } catch (error) {
            console.log(error); // 👈 ADD THIS
            console.log(error.response); // 👈 ADD THIS
            toast.error('Error adding item');
        } finally {
            setLoading(false);
        }
    };

    
  return (
    <>
    <div  className="item-form-container" style={{height:'100vh', overflowY:'auto', overflowX:'hidden'}}>
        <div className="mx-2 my-8 ">
           <div className="row">
                <div className="card col-md-8 form-container">
                    <div className="card-body  ">
                        <form onSubmit={onSubmitHandler}>

                            <div className="mb-3">
                                <label htmlFor="itemImage" className="form-label d-flex">
                                  <img src = {image? URL.createObjectURL(image) : assets.upload1} alt= "" width={48}/>
                                </label>
                            <input type="file" name="image" id="itemImage" className="form-control" hidden onChange={(e)=> setImage(e.target.files[0])}/>
                            </div>
                       
                            <div className="mb-3  ">
                                 <label htmlFor="name" className="form-label d-flex">Name</label>
                                 <input type="text"
                                    name="name" 
                                   className="form-control" 
                                   id="name" 
                                   placeholder="Item name"
                                   onChange={onChangeHandler}
                                   value={data.name}/>
                            </div>

                            <div className="mb-3  ">
                                <label htmlFor="category" 
                                className="form-label d-flex">
                                    Category
                                </label>
                                 <select name="categoryId" type="text" className="form-control" id="category" onChange={onChangeHandler} value={data.categoryId}>
                                    <option value="">--Select category--</option>
                                        {categories.map((category, index) => (
                                    <option key={index} value={category.categoryId}>
                                        {category.name}
                                    </option>))}
                                 </select>
                            </div>

                        <div className="mb-3  ">
                            <label htmlFor="price" className="form-label d-flex">price</label>
                            <input type="number" name='price' className="form-control" id="price" placeholder="&#8377;200.00" onChange={onChangeHandler} value={data.price}/>
                        </div>


                        <div className="mb-3">
                            
                            <label htmlFor="description" className="form-label d-flex">Description</label>
                            <textarea 
                             rows="5"
                             className="form-control"
                             name="description" 
                             id="description"
                             placeholder="Write content here..." onChange={onChangeHandler} value={data.description}></textarea>
                        </div>
                        
                            <button type="submit" className="btn btn-warning w-100 " disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  

</>
  )}
export default itemForm;
