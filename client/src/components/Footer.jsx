const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="w-full bg-slate-900 text-white py-3">
			<div className=" container mx-auto text-center">
				<p className="text-sm">Eco-cart &copy; {year}</p>
			</div>
		</footer>
	);
};

export default Footer;
