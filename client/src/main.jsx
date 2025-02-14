import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import store from "./store.js";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ResetPassword from "./screens/ResetPassword.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import SuccessScreen from "./screens/SuccessScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductEditScreen from "./screens/admin/ProductEditScreen.jsx";
import UserEditScreen from "./screens/admin/UserEditScreen.jsx";

const router = createBrowserRouter(
	//using createRoutesFromElements for conditional routing
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route path="/search/:keyword" element={<HomeScreen />} />
			<Route path="/page/:pageNumber" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route
				path="/reset-password/:resetToken"
				element={<ResetPassword />}
			/>
			<Route
				index={true}
				path="/products/:id"
				element={<ProductScreen />}
			/>
			<Route path="/cart" element={<CartScreen />} />

			{/* Private Routes */}

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<ShippingScreen />} />
				<Route path="/payment" element={<PaymentScreen />} />
				<Route path="/place-order" element={<PlaceOrderScreen />} />
				<Route path="/orders/:id" element={<OrderScreen />} />
				<Route path="/profile" element={<ProfileScreen />} />
				<Route path="/success-screen" element={<SuccessScreen />} />
			</Route>

			{/* Admin routes */}

			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/users" element={<UserListScreen />} />
				<Route
					path="/admin/users/:id/edit"
					element={<UserEditScreen />}
				/>
				<Route path="/admin/products" element={<ProductListScreen />} />
				<Route
					path="/admin/products/:pageNumber"
					element={<ProductListScreen />}
				/>
				<Route path="/admin/orders" element={<OrderListScreen />} />
				<Route
					path="/admin/products/:id/edit"
					element={<ProductEditScreen />}
				/>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

//Another way of implementing routes
/* const hello = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomeScreen />,
			},
			{
				path: "/products/:id",
				element: <ProductScreen />,
			},
			{
				path: "/cart",
				element: <CartScreen />,
			},
		],
	},
]); */
