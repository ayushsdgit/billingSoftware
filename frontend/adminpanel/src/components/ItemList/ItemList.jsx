import React from 'react'
import { AppContext } from '../../context/AppContext';
import { deleteItem } from '../../Service/ItemService';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import './ItemList.css';


const ItemList = () => {


  const { itemsData, setItemsData } = useContext(AppContext);
 const [searchTerm, setSearchTerm] = useState('');
 const filteredItems = itemsData.filter((item) =>
  { return item.name.toLowerCase().includes(searchTerm.toLowerCase())}
    
  ); 

  const removeItem = async (itemId) => {

    try {
      // Call the API to delete the item
      const response = await deleteItem(itemId);
      if (response.status === 204 || response.status === 200) {
        // If the deletion was successful, update the local state to remove the item from the list
        const updatedItems = itemsData.filter(item => item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success('Item deleted successfully!');
      }else {
        toast.error('Failed to delete item. Please try again.');
      }
     
    } catch (error) {
      console.error(`Error removing item with ID: ${itemId}`, error);
      toast.error('An error occurred while deleting the item. Please try again.');
    }
  };
 

  return (
    
      
      <div className="item-list-container" style={{height:'100vh', overflowY:'auto', overflowX:'hidden'}}>
      
      
      <div className="row pe-2">
              <div className="input-group mb-3">
                <input type="text" 
                 name="keyword"
                 id="keyword" 
                 className="form-control" 
                 placeholder="Search categories..." 
                 onChange={(e) => setSearchTerm(e.target.value)}
                 value={searchTerm}
                  />
                  <span className="input-group-text bg-warning">
                    <i className="bi bi-search"></i>
                  </span>
              </div>
      </div>
      <div className="row g-3 pe-2">
         {filteredItems.map((item, index) => (
          <div key={index} className="col-12 ">
            <div className="card p-3 bg-dark " >
              <div className="d-flex align-items-center ">
                <div style={{marginRight: '15px'}} />
                  <img src={item.imgUrl} alt={item.name} className="item-image"/>
                </div>

                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category: {item.description}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill bg-warning">
                    &#8377;{item.price}
                  </span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={()=> {
                    console.log("Deleting ID:", item.itemId);
                    removeItem(item.itemId)}}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          
        ))}




      </div>
    </div>
    
  )
}

export default ItemList
