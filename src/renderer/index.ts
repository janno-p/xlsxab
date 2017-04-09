import Vue from "vue";
import Electron from "vue-electron";

Vue.use(Electron);

import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";

Vue.use(KeenUI);

import "bootstrap";

import { store } from "./vuex";

import App from "./components/app.vue";

// tslint:disable-next-line:no-unused-expression
new Vue({
    el: "#app",
    render: (h) => h(App),
    store,
});

import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
