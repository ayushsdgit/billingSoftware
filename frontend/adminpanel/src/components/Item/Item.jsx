import React from 'react'
import './Item.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Item = ({ itemName, itemPrice, itemImage, itemId }) => {

  const{addToCart} = useContext(AppContext);
  const handleAddToCart = () => {
    addToCart({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      itemId: itemId});
  }
  return (
    <div className="p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card">
      <div style={{position: "relative", marginRight: "15px"}}>
        <img src={itemImage} alt={itemName} className="item-image" />
      </div>
      <div className="flex-grow-1 ms-2">
        <h5 className="text-light mb-1">{itemName}</h5>
        <p className="text-light fw-bold mb-0">₹{itemPrice}</p>
      </div>

      <div className="d-flex flex-column align-items-center ms-3 justify-content-center gap-2" style={{height:"100%"}}>
        <i className="bi bi-cart-plus fs-4 text-warning"></i>
        <button className="btn btn-success btn-sm" onClick={handleAddToCart}>
            <i className="bi bi-plus"></i>
        </button>

      </div>
    </div>
  )
}

export default Item
