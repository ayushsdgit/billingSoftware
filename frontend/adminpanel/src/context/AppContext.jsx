import { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../Service/CategoryService";
import React from 'react';
import { toast } from "react-hot-toast";
import { fetchItems } from "../Service/ItemService";
// import { fetchUsers } from "../Service/UserService";
// import { fetchItems } from "../Service/ItemService";
// // import { fetchOrders } from "../Service/OrderService";
// import { fetchDashboardData } from "../Service/DashboardService";
// import { fetchAuth } from "../Service/AuthService";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";


export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({token: null, user: null});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.itemId === item.itemId);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => 
                cartItem.name === item.name 
                ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };


    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => 
            item.itemId === itemId
            ? { ...item, quantity: newQuantity }
            : item
        ));
    };

    useEffect(() => {
        async function loadData() {
            if(localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(localStorage.getItem("token"),
                            localStorage.getItem("role"));
            }
            const response = await fetchCategories();
            const itemsResponse = await fetchItems();
            setCategories(response.data);
            setItemsData(itemsResponse.data);
        }
        loadData();
    }, []);
    
   const setAuthData = (token, user) => {
        setAuth({token, user});
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        categories,
        setCategories,
        itemsData,
        setItemsData,
        auth,
        setAuthData,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );


    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};
