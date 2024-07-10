import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
const router = createBrowserRouter(
	//using createRoutesFromElements for conditional routing
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<HomeScreen />} />
			<Route
				index={true}
				path="/products/:id"
				element={<ProductScreen />}
			/>
			<Route path="/cart" element={<CartScreen />} />
			<Route path="/login" element={<LoginScreen />} />
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
