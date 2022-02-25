<template>
	<div>
		<b-form-group v-slot="{ ariaDescribedby }">
			<b-form-checkbox-group
				id="btn-radios-2"
				v-model="inputVal"
				:options="options"
				:aria-describedby="ariaDescribedby"
				:button-variant="darkMode"
				size="lg"
				name="radio-btn-outline"
				buttons
			></b-form-checkbox-group>
		</b-form-group>
	</div>
</template>

<script>
export default {
	name: "EngineSelect",
	props: {
		idField: String,
		value: Array,
		dark: Boolean,
	},
	data() {
		return {
			options: [
				{ text: "Google", value: "1" },
				{ text: "Duck Duck Go", value: "2" },
				{ text: "Yandex", value: "3" },
				{ text: "Searx", value: "4" },
			],
		};
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
		darkMode() {
			if (!this.dark) {
				return "outline-info";
			}
			return "outline-dark";
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
