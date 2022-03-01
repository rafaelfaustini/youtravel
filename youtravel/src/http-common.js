import axios from "axios";

export default axios.create({
	baseURL: process.env.VUE_APP_PUBLIC_PATH,
	headers: {
		"Content-type": "application/json",
	},
});
