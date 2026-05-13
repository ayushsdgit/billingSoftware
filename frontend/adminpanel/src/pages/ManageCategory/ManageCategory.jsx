import React from 'react'
import './ManageCategory.css'
import CategoryForm from '../../components/CategoryForm/CategoryForm'
import CategoryList from '../../components/CategoryList/CategoryList'

const ManageCategory = () => {
  return (
    <div className='category-container'>
      <div className='left-Col'>
        <CategoryForm />
      </div>

      <div className='right-Col'>
        <CategoryList />
      </div>
    
    </div>
   
  )
}

export default ManageCategory
