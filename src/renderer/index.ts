import Vue from "vue";
import Electron from "vue-electron";

Vue.use(Electron);

import ElementUI from "element-ui";
import 'element-ui/lib/theme-default/index.css';

Vue.use(ElementUI);

import { store } from "./vuex";
import App from "./components/app.vue";

new Vue({
    el: "#app",
    render: h => h(App),
    store
});

import "font-awesome/css/font-awesome.css";
