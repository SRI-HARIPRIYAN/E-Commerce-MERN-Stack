import React from "react";

import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="w-full flex-grow flex">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default App;
