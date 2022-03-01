import axios from "axios";

export default axios.create({
	baseURL: process.env.publicPath,
	headers: {
		"Content-type": "application/json",
	},
});
