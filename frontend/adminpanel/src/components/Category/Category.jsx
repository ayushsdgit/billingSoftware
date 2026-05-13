import React from 'react'
import './Category.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';



const Category = ({categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick}) => {
  return (
    <div className="d-flex align-items-centre p-3 rounded gap-1 position-relative category-hover" style={{backgroundColor: bgColor, cursor:'pointer'}} 
    onClick={onClick}
    >
        <div style={{position: 'relative', marginRight: '15px'}}>

            <img src={imgUrl} alt={categoryName} className="category-image" />

        </div>

        <div>
            <h5 className="text-white mb-0">{categoryName}</h5>
            <p className="text-white mb-0">{numberOfItems} Items</p>

        </div>
        {isSelected && <div className="active-category"></div>
        }
    </div >
  )
}

export default Category
