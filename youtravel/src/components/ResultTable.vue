<template>
	<div
		:class="{
			'theme-dark': dark,
			'theme-light': !dark,
		}"
	>
		<table class="table table-bordered results">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Engine</th>
					<th scope="col">Language</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr
					scope="row"
					v-for="(url, index) in this.urls"
					:key="`${url.engine} - ${url.language.alpha2}`"
				>
					<td>
						{{ index + 1 }}
					</td>
					<td>{{ getEngineName(url.engine) }}</td>
					<td>{{ url.language.English }}</td>
					<td><a :href="url.url" target="_blank">Visit</a></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: "ResultTable",
	props: {
		urls: Array,
		dark: Boolean,
	},
	methods: {
		getEngineName(code) {
			switch (code) {
				case "1":
					return "Google";
				case "2":
					return "Duck Duck Go";
				case "3":
					return "Yandex";
				case "4":
					return "Searx";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/_variables.scss";
.theme-dark .table {
	color: $dark-text-color;
}
.theme-light .table {
	color: $text-color;
}
</style>
