import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import state from "./state";

import * as types from "./mutation-types";

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations
});

if (module.hot) {
    module.hot.accept(["./mutations"], () => {
        const newMutations = require("./mutations").default;
        store.hotUpdate({
            mutations: newMutations
        });
    });
}

export { store };
