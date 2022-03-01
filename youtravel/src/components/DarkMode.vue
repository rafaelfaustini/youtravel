<template>
	<div class="theme-selector" v-if="isLoaded">
		<transition name="fade" mode="out-in">
			<font-awesome-icon
				icon="fa-solid fa-moon"
				size="2x"
				v-if="darkMode && isLoaded"
				@click="toggleMode"
				key="1"
			/>
			<font-awesome-icon
				icon="fa-solid fa-sun"
				size="2x"
				v-else
				@click="toggleMode"
				key="2"
			/>
		</transition>
	</div>
</template>

<script>
export default {
	name: "DarkMode",
	data() {
		return {
			darkMode: false,
			isLoaded: false,
		};
	},
	mounted() {
		if (
			(window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark").matches &&
				!localStorage.getItem("darkMode")) ||
			localStorage.getItem("darkMode") == 1
		) {
			this.$nextTick(function () {
				this.darkMode = true;
				this.isLoaded = true;
			});
			return;
		}
		this.$nextTick(function () {
			this.darkMode = false;
			this.isLoaded = true;
		});
	},
	methods: {
		toggleMode() {
			this.darkMode = !this.darkMode;
			localStorage.setItem("darkMode", +this.darkMode);
		},
	},
};
</script>

<style scoped>
.fa-sun {
	color: rgb(231, 172, 10);
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.theme-selector {
	cursor: pointer;
}
</style>
