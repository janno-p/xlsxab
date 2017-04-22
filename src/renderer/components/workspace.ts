import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import tmp from "tmp";
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
    private templateInst: HandlebarsTemplateDelegate;
    private f: string = "";

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
        console.log(data);
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

    @Watch("activeLanguage")
    @Watch("activeTemplate")
    private changeTemplate() {
        if (!!this.activeTemplate) {
            const c = fs.readFileSync((this.activeTemplate as any).filepath, "utf8");
            this.templateInst = handlebars.compile(c);

            const l = this.$store.state.dataDefinition.languages[this.activeLanguage].text as object;
            const d = {};
            for (const k in Object.keys(l)) {
                if (l.hasOwnProperty(k)) {
                    d["t" + (Number(k) + 1)] = l[k];
                }
            }

            const x = this.templateInst(d);
            const f = tmp.tmpNameSync({ postfix: ".htm" });
            fs.writeFileSync(f, x);
            this.f = "file:" + f;
        }
    }
}
