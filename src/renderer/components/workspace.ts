import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import tmp from "tmp";
import Vue from "vue";

import {
    Component,
    Prop,
    Watch
} from "vue-property-decorator";

import DataDefinition, {
    IFlight,
    ILanguage,
    IMarket
} from "../models/data-definition";

interface IHasFlights {
    flights: IFlight[];
}

@Component
export default class Workspace extends Vue {
    private indicator = "";
    private previewHeight = this.$electron.remote.getCurrentWindow().getContentBounds().height / 2;
    private activeLanguage = "DEFAULT";
    private activeMarket = "";
    private activeTemplate = "";
    private languages = new Array<string>();
    private markets = new Array<string>();
    private templateInst: HandlebarsTemplateDelegate;
    private previewFile: string = "";

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

        this.$electron.ipcRenderer.send("enable-menus");

        this.$electron.ipcRenderer.on("reload-files", () => {
            this.refresh();
            this.changeTemplate();
        });

        this.$electron.ipcRenderer.on("export-files", (e, directory) => {
            console.log("Exporting files to directory: " + directory);
        });
    }

    private refresh() {
        const data = this.$store.state.dataDefinition;
        data.loadData();
        Vue.set(this, "languages", Object.keys(data.languages || {}).sort());
    }

    get templates() {
        return (this.$store.state.templateFiles as string[] || []).map((f) => ({
            basename: path.basename(f),
            filepath: f
        }));
    }

    @Watch("activeLanguage")
    @Watch("activeTemplate")
    private changeTemplate() {
        const language = !!this.activeLanguage
            ? this.$store.state.dataDefinition.languages[this.activeLanguage]
            : null;

        this.fillMarketSelection(language);

        this.reloadTemplate();
    }

    @Watch("activeMarket")
    private changeMarket() {
        this.reloadTemplate();
    }

    private fillMarketSelection(language: ILanguage) {
        const markets = Object.keys(!!language ? language.markets || {} : {}).sort();
        Vue.set(this, "markets", markets);
        if (markets.length === 0) {
            this.activeMarket = "";
            return;
        }
        const indexOfLanguage = markets.indexOf(this.activeLanguage);
        this.activeMarket = markets[indexOfLanguage >= 0 ? indexOfLanguage : 0];
    }

    private reloadTemplate() {
        if (!this.activeTemplate) {
            return;
        }

        const c = fs.readFileSync((this.activeTemplate as any).filepath, "utf8");
        this.templateInst = handlebars.compile(c);

        const l = this.$store.state.dataDefinition.languages[this.activeLanguage] as ILanguage;
        const t = l.text as any;
        const d = {} as IHasFlights;
        for (const k in t) {
            if (t.hasOwnProperty(k)) {
                d["t" + (Number(k) + 1)] = t[k];
            }
        }

        if (!!this.activeMarket) {
            const m = l.markets[this.activeMarket] as IMarket;
            (d as IHasFlights).flights = m.flights;
            m.flights.forEach((element, i) => {
                d[`flight${i + 1}`] = element;
            });
        }

        const wv = this.$refs.webview as Electron.WebViewElement;

        const registerListener = (pos: number) => {
            const listener = () => {
                wv.removeEventListener("did-stop-loading", listener);
                wv.executeJavaScript(`document.body.scrollTop = ${pos}`);
            };
            wv.addEventListener("did-stop-loading", listener);
        };

        (wv as Electron.WebViewElement).executeJavaScript("document.body.scrollTop;",
            false,
            (r) => registerListener(Number(r)));

        const x = this.templateInst(d);
        const f = tmp.tmpNameSync({ postfix: ".htm" });
        fs.writeFileSync(f, x);
        this.previewFile = "file:" + f;
    }
}
