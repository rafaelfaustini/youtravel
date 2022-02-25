import axios from "axios";

export default axios.create({
	baseURL: process.env.environment === "development" ? "/" : "/youtravel/",
	headers: {
		"Content-type": "application/json",
	},
});
