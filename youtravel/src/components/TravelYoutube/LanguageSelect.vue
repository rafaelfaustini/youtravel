<template>
	<div>
		<label class="mt-2"
			>{{ label }}
			<span
				v-b-tooltip.hover
				title="Some languages may not be available in the selected plataform"
				><font-awesome-icon icon="fa-solid fa-circle-info" /></span
		></label>

		<multiselect
			:class="{
				'theme-dark': dark,
				'theme-light': !dark,
			}"
			v-model="inputVal"
			:options="languages"
			placeholder="Select one"
			group-label="status"
			group-values="langs"
			:group-select="true"
			label="English"
			track-by="alpha2"
			:multiple="true"
		></multiselect>
	</div>
</template>

<script>
import LanguageDataService from "@/services/LanguageDataService";
import "vue-multiselect/dist/vue-multiselect.min.css";

import Multiselect from "vue-multiselect";

export default {
	name: "LanguageSelect",
	props: {
		idField: String,
		label: String,
		value: Array,
		dark: Boolean,
		engine: Array,
	},
	components: { Multiselect },

	data: function () {
		return {
			testedLangs: [],
			langs: [],
		};
	},
	mounted() {
		LanguageDataService.getAll().then((response) => {
			if (!response.data) {
				return;
			}
			this.langs = response.data.sort((lang) => lang.English);
		});
		LanguageDataService.getTested().then((response) => {
			if (!response.data) {
				return;
			}
			this.testedLangs = response.data;
		});
	},
	computed: {
		inputVal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit("input", val);
			},
		},
		languages() {
			let mergeTested = function (a, b, prop) {
				let map = new Map(b.map((o) => [o[prop], o]));
				return a.reduce((acc, o) => {
					let match = map.get(o[prop]);
					return match ? acc.concat({ ...o, ...match }) : acc;
				}, []);
			};
			let tested = mergeTested(this.langs, this.testedLangs, "alpha2").filter(
				(lang) =>
					this.testedLangs.some(
						(testedLang) =>
							lang.alpha2 === testedLang.alpha2 &&
							lang.engines.some((e) => this.engine.includes(e))
					)
			);
			let notTested = this.langs.filter((lang) => !tested.includes(lang));
			return [
				{
					status: "Tested",
					langs: tested,
				},
				{
					status: "Untested",
					langs: notTested,
				},
			];
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.multiselect.theme-light .multiselect__tags {
	border: 1px solid #363535 !important;
	color: rgb(26, 26, 26);
	transition: all 0.5s ease-in;
}
.multiselect.theme-dark .multiselect__tags,
.multiselect.theme-dark .multiselect__tags .multiselect__input {
	background-color: transparent;
	color: white;
	transition: all 0.5s ease-in;
}
.multiselect.theme-dark .multiselect__single {
	background-color: transparent;
	color: white;
	transition: all 0.2s ease-in;
}
.multiselect__option--group {
	background-color: rgb(68, 68, 68);
	color: white;
}
</style>
