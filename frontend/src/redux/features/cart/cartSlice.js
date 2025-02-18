import { createSlice } from "@reduxjs/toolkit";
import Swal  from "sweetalert2";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                Swal.fire({
                    title: "Already Added to the Cart",
                    text: "You can adjust the quantity in the cart page",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                  })
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item._id === id);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
        }
    }
})

// export the actions   
export const { 
    addToCart, 
    removeFromCart, 
    clearCart, 
    incrementQuantity, 
    decrementQuantity, 
    updateQuantity 
} = cartSlice.actions;

export default cartSlice.reducer;