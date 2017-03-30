import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface IState {
    dataFile: string;
    templateFile: string;
}

export const store = new Vuex.Store<IState>({
    state: {
        dataFile: null,
        templateFile: null
    }
});
