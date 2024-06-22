import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
const App = () => {
	return (
		<div className="flex flex-col min-h-screen max-w-screen ">
			<Header />
			<main className="w-screen flex-grow flex ">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
