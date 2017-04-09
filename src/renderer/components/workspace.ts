import path from "path";
import Vue from "vue";

import {
    Component,
    Prop,
    Watch,
} from "vue-property-decorator";

import DataDefinition, {
    ILanguage,
} from "../models/data-definition";

@Component
export default class Workspace extends Vue {
    private indicator = "";
    private previewHeight = this.$electron.remote.getCurrentWindow().getContentBounds().height / 2;
    private activeLanguage = "DEFAULT";
    private activeMarket = "";
    private activeTemplate = "";
    private languages: string[] = [];
    private markets: string[] = [];

    private mounted() {
        const wv = this.$refs.webview as HTMLElement;
        wv.addEventListener("did-start-loading", () => this.indicator = "Loading ...");
        wv.addEventListener("did-stop-loading", () => this.indicator = "");
        this.$electron.remote.getCurrentWindow().on("resize",
            (e: any) => {
                const browserWindow = e.sender as Electron.BrowserWindow;
                this.previewHeight = browserWindow.getContentBounds().height / 2;
            });
        this.refresh();
    }

    private refresh() {
        const data = this.$store.state.dataDefinition;
        data.loadData();
        Vue.set(this, "languages", Object.keys(data.languages || {}).sort());
    }

    get templates() {
        return (this.$store.state.templateFiles as string[] || []).map((f) => ({
            basename: path.basename(f),
            filepath: f,
        }));
    }

    @Watch("activeLanguage")
    private changeLanguage(selectedLanguage: string) {
        this.activeMarket = "";
        const ls = this.$store.state.dataDefinition.languages || {};
        const l: ILanguage = ls[selectedLanguage] || ({} as ILanguage);
        Vue.set(this, "markets", Object.keys(l.markets || {}).sort());
    }
}
