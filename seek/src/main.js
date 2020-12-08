import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'animate.css';
import 'fullpage-vue/src/fullpage.css';
import VueFullpage from 'fullpage-vue';

Vue.config.productionTip = false;

Vue.use(VueFullpage);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
