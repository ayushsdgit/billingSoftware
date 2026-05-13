import React from 'react'; 
import { useState } from 'react';
import toast from 'react-hot-toast';
import { addUser } from '../../Service/UserService';


const UserForm = ({ setUsers }) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",  
        email: "",
        password: "",
        role: "ROLE_USER"
    })

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate API call
            const response = await addUser(data);
            setUsers((users) => [...users, response.data]);
            toast.success("User added successfully!");
            setData({
                name: "",
                email: "",
                password: "",
                role: "ROLE_USER"
            });
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to add user");
        } finally {
            setLoading(false);
        }
           
    }


    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                     <div className="card-body   ">
                        <form onSubmit={onSubmitHandler}>
                            
                            <div className="mb-3  ">
                            
                                <label htmlFor="name" className="form-label text-start d-block mx-3"> Name</label>
                                
                                <input style={{ width: "350px" }}  
                                        type="text" 
                                        name="name"
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Enter name"
                                        onChange={onChangeHandler}
                                        value={data.name}/>
                            </div>
                            <div className="mb-3">
                                
                                <label htmlFor="email" className="form-label text-start d-block mx-3 ">email</label>
                                
                                <input style={{ width: "350px" }} type="email" 
                                 className="form-control"
                                 name="email" 
                                 id="email"
                                 placeholder="yourname@gmail.com"
                                 onChange={onChangeHandler}
                                 value={data.email}/>
                            </div>

                            <div className="mb-3 ">
                                
                                <label htmlFor="password" className="form-label text-start d-block mx-3 " >Password</label>
                                <input style={{ width: "350px" }} type="password"
                                 className="form-control "
                                 name="password" 
                                 id="password"
                                 placeholder="************"
                                 onChange={onChangeHandler}
                                 value={data.password}/>
                            </div>
                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                            
                            <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                                {loading ? "Loading..." : "Save"}
                            </button>
    
    
    
                        </form>
                     </div>
                </div>
            </div>
        </div>
      )
}
 
export default UserForm;   