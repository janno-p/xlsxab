import Vue from "vue";
import { Component } from "vue-property-decorator";
import { OPEN_WORKSPACE } from "../vuex/mutation-types";

@Component
export default class StartUp extends Vue {
    private dataFile: any = null;
    private templateFile: any = null;

    private setDataFile(file: any) {
        this.dataFile = file;
    }

    private removeDataFile() {
        this.dataFile = null;
    }

    private setTemplateFile(file: any) {
        this.templateFile = file;
    }

    private removeTemplateFile() {
        this.templateFile = null;
    }

    private openWorkspace() {
        this.$store.commit(OPEN_WORKSPACE, {
            dataFile: this.dataFile.raw.path,
            templateFile: this.templateFile.raw.path,
        });
    }
}
