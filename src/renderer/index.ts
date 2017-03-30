import Vue from "vue";
import Electron from "vue-electron";

Vue.use(Electron);

import { store } from "./vuex";
import App from "./components/app.vue";

new Vue({
    el: "#app",
    render: h => h(App),
    store
});
