import { apiSlice } from "./apiSlice.js";
import { BACKEND_URL, ORDERS_URL } from "../constants.js";

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: "POST",
				body: order,
			}),
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
				method: "GET",
			}),
			keepUnusedDataFor: 5,
		}),
		getUserOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/myorders`,
				method: "GET",
			}),
			keepUnusedDataFor: 5,
		}),
		payWithStripe: builder.mutation({
			query: (orderItems) => ({
				url: `${BACKEND_URL}/create-checkout-session`,
				method: "POST",
				body: orderItems,
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	useGetUserOrdersQuery,
	usePayWithStripeMutation,
} = orderApiSlice;
