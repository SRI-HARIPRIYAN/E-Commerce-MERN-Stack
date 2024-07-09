import nodemailer from "nodemailer";

const sendMail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,

		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});
	const mailOptions = {
		from: "Sri Hari S <phen.4801@gmail.com",
		to: options.email,
		subject: options.subject,
		text: options.message,
		//html: "<div>hi {user.name}</div>",
		//html: to display custom message contents
	};
	await transporter.sendMail(mailOptions);
};
export default sendMail;
