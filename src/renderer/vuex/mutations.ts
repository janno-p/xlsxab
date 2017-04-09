import { MutationTree } from "vuex";

import state from "./state";

import * as types from "./mutation-types";

const mutations: MutationTree<typeof state> = {
    [types.OPEN_WORKSPACE](state, { dataDefinition, templateFiles }) {
        state.dataDefinition = dataDefinition;
        state.templateFiles = templateFiles;
        state.hasWorkspace = true;
    },
};

export default mutations;
