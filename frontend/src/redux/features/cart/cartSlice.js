import { createSlice } from "@reduxjs/toolkit";

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
                if (window.showToast) {
                    window.showToast('addCart', 'Product Added to the Cart');
                }
            } else {
                if (window.showToast) {
                    window.showToast('addCart', 'Already Added to the Cart');
                }
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
            if (window.showToast) {
                window.showToast('removeCart', 'Removed from Cart');
            }
        },
        clearCart: (state) => {
            state.cartItems = []
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1;
                if (window.showToast) {
                    window.showToast('updateCart', 'Quantity updated in Cart');
                }
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                if (window.showToast) {
                    window.showToast('updateCart', 'Quantity updated in Cart');
                }
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item._id === id);
            if (item) {
                item.quantity = Math.max(1, quantity);
                if (window.showToast) {
                    window.showToast('updateCart', 'Quantity updated in Cart');
                }
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