import React from 'react'
import './CartItems.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';


const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(AppContext);

  return (
    <div className="p-3 h-100 overflow-y-auto">
      {cartItems.length === 0 ? (
        <p className="text-light">
          No items in the cart.
        </p>
      ) :(
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item mb-3 p-3 bg-dark rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="text-light mb-0">{item.name}</h6>
                <p className="text-light fw-bold mb-0">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">

                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-sm btn-danger" 
                       disabled={item.quantity === 1}
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                       >  
                       <i className="bi bi-dash"></i>
                    </button>
                    <span className="text-light fw-bold">{item.quantity}</span>
                    <button className="btn btn-sm btn-primary" 
                       onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <button className="btn btn-danger btn-sm" style={{width: "auto"}}
                    onClick={() => removeFromCart(item.itemId)}
                  >

                    <i className="bi bi-trash"></i>
                  </button>
              </div>
            </div>
          ))}
        </div>
      ) }
    </div>
  )
}

export default CartItems
