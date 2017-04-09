import Vue from "vue";

import {
    Component,
    Prop,
    Watch,
} from "vue-property-decorator";

import DataDefinition from "../models/data-definition";

@Component
export default class Workspace extends Vue {
    private indicator = "";
    private previewHeight = this.$electron.remote.getCurrentWindow().getContentBounds().height / 2;
    private activeLanguage = "DEFAULT";
    private activeMarket = "";
    private activeTemplate = "";

    private mounted() {
        const wv = this.$refs.webview as HTMLElement;
        wv.addEventListener("did-start-loading", () => this.indicator = "Loading ...");
        wv.addEventListener("did-stop-loading", () => this.indicator = "");
        this.$electron.remote.getCurrentWindow().on("resize",
            (e: any) => {
                const browserWindow = e.sender as Electron.BrowserWindow;
                this.previewHeight = browserWindow.getContentBounds().height / 2;
            });
        this.$nextTick(() => {
            this.model.loadData();
        });
    }

    get templates() {
        return this.$store.state.templateFiles as string[];
    }

    get model() {
        return this.$store.state.dataDefinition as DataDefinition;
    }

    get languages() {
        return Object.keys(this.model.languages).sort();
    }

    get markets() {
        return Object.keys(this.model.languages[this.activeLanguage].markets);
    }

    private reloadData() {
        const data = this.$store.state.dataDefinition as DataDefinition;
        data.loadData();
    }

    @Watch("activeLanguage")
    private changeLanguage() {
        this.activeMarket = "";
    }
}
