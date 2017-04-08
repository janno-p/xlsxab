import Electron from "electron";
import Vue from "vue";

import { Component } from "vue-property-decorator";

import StartUp from "./start-up.vue";
import Workspace from "./workspace.vue";

@Component({
    components: {
        StartUp,
        Workspace,
    },
})
export default class App extends Vue {
    get componentName() {
        return this.$store.state.hasWorkspace ? "workspace" : "start-up";
    }
}
