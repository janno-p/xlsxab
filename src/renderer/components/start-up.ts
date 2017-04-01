import Vue from "vue";
import { Component } from "vue-property-decorator"
import { OPEN_WORKSPACE } from "../vuex/mutation-types";

@Component
export default class StartUp extends Vue {
    dataFile: any = null;
    templateFile: any = null;

    setDataFile(file: any) {
        this.dataFile = file;
    }

    removeDataFile() {
        this.dataFile = null;
    }

    setTemplateFile(file: any) {
        this.templateFile = file;
    }

    removeTemplateFile() {
        this.templateFile = null;
    }

    openWorkspace() {
        this.$store.commit(OPEN_WORKSPACE, {
            dataFile: this.dataFile.raw.path,
            templateFile: this.templateFile.raw.path
        });
    }
}
