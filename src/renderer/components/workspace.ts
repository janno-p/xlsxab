import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import sanitize from "sanitize-filename";
import tmp from "tmp";
import Vue from "vue";

import {
    Component,
    Prop,
    Watch
} from "vue-property-decorator";

import {
    State
} from "vuex-class";

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
    @State private dataDefinition: DataDefinition;
    @State private templateFiles: string[];

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
            this.saveFilesToFolder(directory);
        });
    }

    private refresh() {
        const data = this.dataDefinition;
        data.loadData();
        Vue.set(this, "languages", Object.keys(data.languages || {}).sort());
    }

    get templates() {
        return (this.templateFiles || []).map((f) => ({
            basename: path.basename(f),
            filepath: f
        }));
    }

    @Watch("activeLanguage")
    @Watch("activeTemplate")
    private changeTemplate() {
        const language = !!this.activeLanguage
            ? this.dataDefinition.languages[this.activeLanguage]
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

        const data = this.buildData(this.activeLanguage, this.activeMarket);
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

        const x = this.templateInst(data);
        const f = tmp.tmpNameSync({ postfix: ".htm" });
        fs.writeFileSync(f, x);
        this.previewFile = "file:" + f;
    }

    private buildData(languageCode: string, marketCode: string) {
        const language = this.dataDefinition.languages[languageCode] as ILanguage;
        const text = language.text as any;

        const data = {} as IHasFlights;
        for (const key in text) {
            if (text.hasOwnProperty(key)) {
                data["t" + (Number(key) + 1)] = text[key];
            }
        }

        if (!!marketCode) {
            const market = language.markets[marketCode] as IMarket;
            (data as IHasFlights).flights = market.flights;
            market.flights.forEach((element, i) => {
                data[`flight${i + 1}`] = element;
            });
        }

        return data;
    }

    private saveFilesToFolder(folder: string) {
        this.templates.forEach((template) => {
            const templateContent = fs.readFileSync(template.filepath, "utf8");
            const templateInstance = handlebars.compile(templateContent);

            this.languages.forEach((languageCode) => {
                const language = this.dataDefinition.languages[languageCode] as ILanguage;
                const markets = Object.keys(!!language ? language.markets || {} : {}).sort();
                markets.forEach((marketCode) => {
                    const data = this.buildData(languageCode, marketCode);

                    const renderedContent = templateInstance(data);
                    const file = path.join(folder, this.getFileName(template.basename, languageCode, marketCode));

                    fs.writeFileSync(file, renderedContent);
                });
            });
        });
    }

    private getFileName(templateName: string, languageCode: string, marketCode: string) {
        const extensionIndex = templateName.lastIndexOf(".");
        const name = templateName.substring(0, extensionIndex);
        const extension = templateName.substring(extensionIndex + 1);

        return sanitize(`${name}_${languageCode}_${marketCode}.${extension}`, {
            replacement: "-"
        }).replace(/\s+/g, "-");
    }
}
