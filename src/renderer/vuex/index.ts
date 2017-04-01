import Vue from "vue";
import Vuex from "vuex";

import * as types from "./mutation-types";

Vue.use(Vuex);

interface IState {
    dataFile: string;
    templateFile: string;
    hasWorkspace: boolean;
}

export const store = new Vuex.Store<IState>({
    state: {
        dataFile: null,
        templateFile: null,
        hasWorkspace: false
    },
    mutations: {
        [types.OPEN_WORKSPACE](state, { dataFile, templateFile }) {
            state.dataFile = dataFile;
            state.templateFile = templateFile;
            state.hasWorkspace = true;
        }
    }
});
