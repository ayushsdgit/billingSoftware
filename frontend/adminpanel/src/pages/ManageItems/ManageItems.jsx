import React from 'react'
import './ManageItems.css';
import ItemForm from '../../components/ItemForm/ItemForm';
import ItemList from '../../components/ItemList/ItemList';

const ManageItems = () => {
  return (
    
    <div className='manage-items'>
             <div className='left-Col'>
               <ItemForm/>  
             </div>

            <div className='right-Col'>
              <ItemList/>
            </div>
    
    </div>
  )
}

export default ManageItems
