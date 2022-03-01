<template>
	<div>
		<div class="vertical-center">
			<b-container>
				<b-row>
					<b-col md="8">
						<MaterialInput
							id-field="searchBar"
							v-model="text"
							label="Search"
							:enter="onSearch"
							:dark="isDarkMode"
							:autofocus="true"
						></MaterialInput
					></b-col>
					<b-col lg="4">
						<LanguageSelect
							id-field="languageSelect"
							v-model="language"
							label="Language"
							:dark="isDarkMode"
							:engine="engine"
						></LanguageSelect
					></b-col>
				</b-row>
				<b-row>
					<b-col>
						<div class="d-flex justify-content-center my-2">
							<EngineSelect v-model="engine" :dark="isDarkMode"></EngineSelect>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<div class="d-flex justify-content-center mb-3">
							<b-col md="5">
								<SearchButton
									ref="searchbutton"
									:isValid="isValid"
									:search="search"
									:dark="isDarkMode"
								></SearchButton
							></b-col>
						</div>
					</b-col>
				</b-row>
				<b-row v-if="urls.length">
					<b-col>
						<ResultTable :dark="isDarkMode" :urls="urls"></ResultTable>
					</b-col>
				</b-row>
			</b-container>
		</div>
		<footer>
			<p class="text-center">
				We do not take responsability for undesirable results, some search
				engines might lack of accuracy and language support.
			</p>
		</footer>
	</div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import LanguageSelect from "@/components/TravelYoutube/LanguageSelect.vue";
import EngineSelect from "@/components/TravelYoutube/EngineSelect.vue";
import SearchButton from "@/components/TravelYoutube/SearchButton.vue";
import ResultTable from "../components/ResultTable.vue";
export default {
	name: "TravelYoutube",
	components: {
		MaterialInput,
		LanguageSelect,
		EngineSelect,
		SearchButton,
		ResultTable,
	},
	props: {
		isDarkMode: Boolean,
	},
	data: function () {
		return {
			text: "",
			language: [],
			engine: ["1"],
			onSearch: function () {},
			urls: [],
		};
	},
	mounted() {
		this.onSearch = this.$refs.searchbutton.onSearch;
	},
	methods: {
		google(language) {
			let searchText = new URLSearchParams(this.text).toString().slice(0, -1);
			return `https://www.google.com/search?q=inurl%3Ayoutube.com+${searchText}&lr=lang_${language}`;
		},
		duckduck(language) {
			let searchText = new URLSearchParams(this.text).toString().slice(0, -1);
			return `https://duckduckgo.com/?q=${searchText}&kl=${language}-${language}&t=h_&ia=web&iax=videos&ia=videos`;
		},
		yandex(language) {
			let searchText = new URLSearchParams(this.text).toString().slice(0, -1);
			return `https://yandex.com/search/?text=site%3Ayoutube.com+${searchText}&lang=${language}`;
		},
		searx(language) {
			let searchText = new URLSearchParams(this.text).toString().slice(0, -1);
			return `https://searx.bar/search?q=${searchText}&categories=videos&language=${language}-${language}`;
		},
		getUrl(engine, language) {
			let url = "";
			switch (engine) {
				case "1":
					url = this.google(language);
					break;
				case "2":
					url = this.duckduck(language);
					break;
				case "3":
					url = this.yandex(language);
					break;
				case "4":
					url = this.searx(language);
					break;
				default:
					return;
			}
			return url;
		},
		search() {
			this.urls = [];
			this.engine.forEach((engine) => {
				this.language.forEach((lang) => {
					let url = this.getUrl(engine, lang.alpha2);
					this.urls.push({
						url: url,
						language: lang,
						engine: engine,
					});
				});
			});

			this.text = "";
		},
	},
	computed: {
		isValid() {
			return !!(this.text && this.language.length && this.engine.length);
		},
	},
};
</script>

<style scoped>
@media screen and (min-width: 900px) {
	.vertical-center {
		min-height: 100%; /* Fallback for browsers do NOT support vh unit */
		min-height: 80vh; /* These two lines are counted as one :-)       */

		display: flex;
		align-items: center;
	}
}
.theme-dark .results {
	color: #fff;
}

.table-responsive {
	display: block;
	max-height: 40vh;
	overflow-y: scroll;
}
</style>
