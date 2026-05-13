import React from 'react'
import { useState } from 'react';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import {useContext} from 'react';
import { AppContext } from '../../context/AppContext';
import { addCategory } from '../../Service/CategoryService';
import { toast } from 'react-hot-toast';



const CategoryForm = () => {


    const { setCategories,categories} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        bgcolor: '#b85e5e'
    });

    useEffect(() => {
        console.log('Data updated:', data);
        
    }, [data]);

   const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({
            ...data,
            [name]: value
        }));
    }

        const onSubmitHandler = async (e) => {
            e.preventDefault();
            setLoading(true);
            if(!image){
                toast.error("Select image for category");
                setLoading(false);
                return;
            }
            
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("bgColor", data.bgcolor);
            formData.append("image", image);

    try {
        const response = await addCategory(formData);

        setCategories([...categories, response.data]);
        toast.success('Category added successfully!');

        setData({
            name: '',
            description: '',
            bgcolor: '#2c2c2c'
        });
        setImage(false);
                
            }catch (error) { 
                console.error('Error adding category:', error);
                toast.error('An error occurred while adding the category. Please try again.');     
            }finally{
                setLoading(false);
            }
            
    }


  return (
    <div className="mx-2 mt-8 ">
        <div className="row">
            <div className="card col-md-12 form-container">
                 <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3 d-flex" >
                            <label htmlFor="image" className="form-label">
                                <img src = {image? URL.createObjectURL(image) : assets.upload1} alt= "" width={48}/></label>
                            <input type="file" 
                            name="image" 
                            id="image" 
                            className="form-control" hidden
                            onChange={(e) => {
                               
                                setImage(e.target.files[0])
                                
                            }}/>
                        </div>
                        <div className="mb-3  ">
                            <label htmlFor="categoryName" 
                            className="form-label d-flex">Name</label>
                            <input type="text" 
                            className="form-control" 
                            id="name" 
                            name="name"
                            placeholder="Enter category name"
                            onChange={onChangeHandler}
                            value={data.name}/>
                        </div>
                        <div className="mb-3">
                            
                            <label htmlFor="description" className="form-label d-flex">Description</label>
                            <textarea 
                             rows="5"
                             className="form-control"
                             name="description" 
                             id="description"
                             placeholder="Enter category description"
                             onChange={onChangeHandler}
                             value={data.description}
                             ></textarea>
                        </div>
                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        <div className='mb-3 '>
                            
                            <label htmlFor="bgcolor" className='form-label d-flex'> Background color</label>
                            
                            <input type="color"  
                            id='bgcolor' 
                            name='bgcolor'
                            className='d-flex'
                            onChange={onChangeHandler}
                            value={data.bgcolor}
                            placeholder='#ffffff'
                            />
                        </div>
                        <button type="submit"
                                className="btn btn-warning w-100">{loading? "Loading..." : "Submit"}</button>



                    </form>
                 </div>
            </div>
        </div>
    </div>
  )
}


export default CategoryForm;
