import { MutationTree } from "vuex";

import state from "./state";

import * as types from "./mutation-types";

const mutations: MutationTree<typeof state> = {
    [types.OPEN_WORKSPACE](state, { dataFile, templateFile }) {
        state.dataFile = dataFile;
        state.templateFile = templateFile;
        state.hasWorkspace = true;
    },
};

export default mutations;
