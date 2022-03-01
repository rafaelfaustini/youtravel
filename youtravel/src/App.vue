<template>
	<div
		id="app"
		:class="{ 'theme-dark': isDarkMode, 'theme-light': !isDarkMode }"
		v-show="isLoaded"
	>
		<div>
			<b-navbar toggleable="lg" :type="navbarType" :variant="navbarVariant">
				<b-navbar-brand href="#">YouTravel {{ version }}</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item href="#"
							><router-link to="/" class="nav-link"
								>Home</router-link
							></b-nav-item
						>
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-nav-form><DarkMode ref="darkMode"></DarkMode></b-nav-form>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
			<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item"></li>
					</ul>
				</div>
			</nav>
			<router-view :isDarkMode="isDarkMode" class="view"></router-view>
		</div>
	</div>
</template>

<script>
import DarkMode from "./components/DarkMode.vue";
import { version } from "../package";

export default {
	name: "App",
	components: { DarkMode },
	data() {
		return {
			isDarkMode: false,
			isLoaded: false,
		};
	},
	mounted() {
		this.$watch(
			() => {
				return this.$refs.darkMode?.darkMode;
			},
			(val) => {
				this.isDarkMode = val;
			}
		);
		this.$nextTick(() => {
			this.isDarkMode = this.$refs.darkMode?.darkMode;
			this.isLoaded = true;
		});
	},
	computed: {
		navbarType() {
			if (!this.isDarkMode) {
				return "light";
			}
			return "dark";
		},
		navbarVariant() {
			if (!this.isDarkMode) {
				return "info";
			}
			return "dark";
		},
		version() {
			return version;
		},
	},
	watch: {
		firstName: function (val) {
			this.fullName = val + " " + this.lastName;
		},
		lastName: function (val) {
			this.fullName = this.firstName + " " + val;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/_variables.scss";
#app {
	position: absolute;
	width: 100%;
	height: 100%;
}
.theme-light {
	background-color: $background-color;
	color: $text-color;
}
.theme-dark {
	background-color: $dark-background-color;
	color: $dark-text-color;
	transition: all 1s ease-in;
}
</style>
