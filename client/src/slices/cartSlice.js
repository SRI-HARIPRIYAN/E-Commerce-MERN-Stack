import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";
const initialState = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: { cartItems: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const isExistItem = state.cartItems.find((i) => i._id === item._id);
			if (isExistItem) {
				state.cartItems = state.cartItems.map((i) =>
					i._id === isExistItem._id ? item : i
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			const id = action.payload;
			state.cartItems = state.cartItems.filter((item) => item._id !== id);
			return updateCart(state);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
