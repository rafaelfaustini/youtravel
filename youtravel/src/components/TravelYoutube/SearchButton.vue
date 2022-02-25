<template>
	<div>
		<button
			:disabled="!isValid"
			v-on:keyup.enter="onSearch"
			:class="{
				'btn btn-lg btn-block mt-2': true,
				'btn-dark': dark,
				'btn-primary': !dark,
			}"
			@click="onSearch"
		>
			Search
		</button>
	</div>
</template>

<script>
export default {
	name: "SearchButton",
	props: {
		idField: String,
		search: Function,
		isValid: Boolean,
		dark: Boolean,
	},
	methods: {
		onSearch() {
			if (!this.isValid) {
				return;
			}
			this.search();
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-dark {
	background-color: #303134;
}
</style>
