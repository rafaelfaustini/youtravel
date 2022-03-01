process.env.VUE_APP_PUBLIC_PATH =
	process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
		? "/youtravel/"
		: "./";

module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/youtravel/" : "./",
};
