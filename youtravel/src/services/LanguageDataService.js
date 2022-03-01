import http from "../http-common";

class LanguageDataService {
	getAll() {
		return http.get("json/language-codes_json.json");
	}
	getTested() {
		return http.get("json/tested-langs-engines.json");
	}
}

export default new LanguageDataService();
