<template>
	<div
		:class="{
			'md-input': true,
			'theme-dark': dark,
			'theme-light': !dark,
		}"
	>
		<input
			v-on:keyup.enter="enter"
			:id="idField"
			v-model="inputVal"
			:autofocus="autofocus"
			ref="searchInput"
			required
		/>
		<label @click="onLabelClick">{{ label }}</label>
	</div>
</template>

<script>
export default {
	name: "MaterialInput",
	props: {
		idField: String,
		label: String,
		value: String,
		enter: Function,
		dark: Boolean,
		autofocus: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onLabelClick() {
			this.$refs.searchInput.focus();
		},
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
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/_variables.scss";

.md-input {
	position: relative !important;
	display: block !important;
	margin-top: 1.5rem !important;
	margin-bottom: 1.5rem !important;
}
.md-input label {
	font-weight: 300 !important;
	position: absolute !important;
	display: block !important;
	top: 5px !important;
	font-size: 1.2rem !important;
	transition: 0.3s ease-in-out !important;
}
.md-input input {
	display: block;
	width: 100%;
	font-size: 1rem;
	height: calc(2rem + 2px);
	border: 0;
	-webkit-appearance: none !important;
	box-shadow: none !important;
	outline: none !important;
}

.md-input.theme-light input {
	color: $text-color !important;
	border-bottom: rgba(43, 42, 42, 0.75) solid 2px !important;
	caret-color: rgb(19, 117, 228);
	background-color: transparent !important;
	transition: all 0.5s ease-in;
}
.md-input.theme-dark input {
	color: $dark-text-color !important;
	border-bottom: rgba(255, 255, 255, 0.75) solid 2px !important;
	caret-color: rgb(19, 117, 228);
	background-color: transparent !important;
	transition: all 0.5s ease-in;
}
.md-input input:focus {
	border-bottom: rgb(19, 117, 228) solid 2px !important;
}

input:valid + label,
input:focus + label {
	top: -12px !important;
	pointer-events: none !important;
	font-size: 0.85rem !important;
}

input:focus + label {
	color: rgb(19, 117, 228) !important;
}
</style>
