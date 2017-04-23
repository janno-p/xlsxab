import Vue from "vue";
import { Component } from "vue-property-decorator";
import { OPEN_WORKSPACE } from "../vuex/mutation-types";

import DataDefinition from "../models/data-definition";
import SheetSelector from "./sheet-selector.vue";

@Component({
    components: {
        SheetSelector,
    },
})
export default class StartUp extends Vue {
    private dataDefinition: DataDefinition = null;
    private dataFile: string = null;
    private templateFiles: string[] = [];

    private changeDataFile(files: FileList) {
        this.dataFile = files[0].path;
    }

    private changeTemplateFiles(files: FileList) {
        const fileList = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
            fileList.push(files[i].path);
        }
        Vue.set(this, "templateFiles", fileList);
    }

    private openWorkspace() {
        this.$store.commit(OPEN_WORKSPACE, {
            dataDefinition: this.dataDefinition,
            templateFiles: this.templateFiles,
        });
    }

    get allowOpenWorkspace() {
        return this.templateFiles.length > 0 && !!this.dataDefinition;
    }
}
