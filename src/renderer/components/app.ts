import Vue from "vue";

import {
    Component
} from "vue-property-decorator";

import {
    State
} from "vuex-class";

import StartUp from "./start-up.vue";
import Workspace from "./workspace.vue";

@Component({
    components: {
        StartUp,
        Workspace
    }
})
export default class App extends Vue {
    @State private hasWorkspace: boolean;

    get componentName() {
        return this.hasWorkspace ? "workspace" : "start-up";
    }
}
