import './CartSummary.css';
import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import RecieptPopup from '../RecieptPopup/RecieptPopup';
import toast from 'react-hot-toast';
import { createOrder } from '../../Service/OrderService';
import { createRazorpayOrder, verifyPayment } from '../../Service/PaymentService';
import { AppConstants } from '../../util/constants';
import { useEffect } from 'react';


const CartSummary = ({ customerName, setCustomerName, mobileNumber, setMobileNumber }) => {

  const{ cartItems, clearCart } = useContext(AppContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);




  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01; 
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  }

  const placeOrder = async(paymentMode) => {
    window.print();
  }

  const handlePrintReciept = () => {
    window.print();
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));

      document.head.appendChild(script);
    });
  }

  const deleteOrderOnFailure = async(orderId)=>{
   if(!customerName || !mobileNumber){
    toast.error("Please enter customer details");
    return;
   }
   if(cartItems.length === 0){
    toast.error("Cart is empty");
    return;
   }
  }

   const completePayment = async(paymentMode) => {
    if(!customerName || !mobileNumber){
      toast.error("please enter customer details");
      return;
    }
      const orderData = {
        customerName,
        phoneNumber: mobileNumber,
        cartItems,
        subtotal: totalAmount,
        tax,
        grandTotal,
        paymentMethod: paymentMode.toUpperCase()   
       
  }
   setIsProcessing(true);
    try {

      
      const response = await createOrder(orderData);
      const savedData = response.data;
      if(response.status === 201 && paymentMode === "CASH") {
        toast.success("Cash recieved");
        setOrderDetails(savedData);
      }else if(response.status === 201 && paymentMode === "UPI") {
        const razorpayLoaded = await loadRazorpayScript();
        if(!razorpayLoaded) {
          toast.error("Failed to load payment gateway. Please try again.");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }
        const razorpayResponse = await createRazorpayOrder({amount: grandTotal, currency: "INR"});
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "My retail shop",
          description: "Test Transaction",
          handler: async function (response) {
            await verifyPaymentHandler(response, savedData);
          
          },
          prefill: {
            name: customerName,
            contact: mobileNumber
          },
          theme: {
            color: "#3399cc"
          },
          modal: {
            ondismiss: async function() {
              await deleteOrderOnFailure(savedData.orderId);
              
              toast.error("Payment cancelled. Deleting order...");
            }
          }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', async function (response){
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment failed. Deleting order...");
          console.error(response.error);
        });
        rzp1.open();

      }
    }
    catch(error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed. Failed to cancel order. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  }

 


  const verifyPaymentHandler = async(response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId
    };
    try {
      const paymentResponse = await verifyPayment(paymentData);
      if(paymentResponse.status === 200) {
        toast.success("Payment successful");
        setOrderDetails({...savedOrder, paymentDetails:{
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature
         }
        });
      }else {
        toast.error("Payment processing failed. Please contact support.");
      }         
      
    } catch(error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed. Please contact support.");
    }
  }


  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item:</span>
          <span className="text-light">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax (1%):</span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Grand Total:</span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success flex-grow-1" onClick={() => completePayment("CASH")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Cash"}
        </button>

        <button className="btn btn-primary flex-grow-1" onClick={() => completePayment("UPI")} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-warning flex-grow-1" onClick={placeOrder} disabled={isProcessing || !orderDetails}>
          Place Order
        </button>
      </div>
      {
        showPopup && (
          <RecieptPopup
            orderDetails={{
                ...orderDetails,
                razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
                razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,

            }}
            onClose={()=> setShowPopup(false)}
            onPrint={handlePrintReceipt}
          />

        )
      }
      
    </div>
  )
}

export default CartSummary
