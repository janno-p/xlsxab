import Vue from "vue";

import {
    Component,
    Prop,
} from "vue-property-decorator";

import DataDefinition from "../models/data-definition";

@Component
export default class Workspace extends Vue {
    private indicator = "";
    private previewHeight = this.$electron.remote.getCurrentWindow().getContentBounds().height / 2;

    private mounted() {
        const wv = this.$refs.webview as HTMLElement;
        wv.addEventListener("did-start-loading", () => this.indicator = "Loading ...");
        wv.addEventListener("did-stop-loading", () => this.indicator = "");
        this.$electron.remote.getCurrentWindow().on("resize",
            (e: any) => {
                const browserWindow = e.sender as Electron.BrowserWindow;
                this.previewHeight = browserWindow.getContentBounds().height / 2;
            });
    }

    get template() {
        return `${this.$store.state.templateFiles[0]}`;
    }

    private reloadData() {
        const data = this.$store.state.dataDefinition as DataDefinition;
        data.loadData();
        // console.log(data.translationData);
        // console.log(data.destinationData);
    }
}
