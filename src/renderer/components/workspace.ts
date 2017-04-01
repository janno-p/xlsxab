import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Workspace extends Vue {
    indicator = "";
    previewHeight = this.$electron.remote.getCurrentWindow().getContentBounds().height / 2;

    mounted() {
        var wv = this.$refs.webview as HTMLElement;
        wv.addEventListener("did-start-loading", () => this.indicator = "Loading ...");
        wv.addEventListener("did-stop-loading", () => this.indicator = "");
        this.$electron.remote.getCurrentWindow().on("resize",
            (e: any) => {
                this.previewHeight = (<Electron.BrowserWindow>e.sender).getContentBounds().height / 2;
            });
    }
}
