import App from "./App.vue";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faCircleInfo, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faCircleInfo);
library.add(faSun);
library.add(faMoon);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import VueRouter from "vue-router";

Vue.use(VueRouter);

import TravelYoutube from "./pages/TravelYoutube.vue";
const router = new VueRouter({
	mode: "history",
	base: process.env.VUE_APP_PUBLIC_PATH,
	routes: [{ path: "/", component: TravelYoutube }],
});

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
