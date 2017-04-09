import Vue from "vue";
import xlsx from "xlsx";

import {
    Component,
    Prop,
    Watch,
} from "vue-property-decorator";

import DataDefinition from "../models/data-definition";

@Component
export default class SheetSelector extends Vue {
    @Prop({ type: String })
    private file: string;

    @Prop({ type: Object })
    private value: DataDefinition;

    private loading = true;
    private worksheets: string[] = [];
    private translations: string = "";
    private destinations: string = "";

    private mounted() {
        this.$nextTick(() => {
            const workbook = xlsx.readFile(this.file);
            this.worksheets = workbook.SheetNames;
            this.loading = false;
        });
    }

    @Watch("destinations")
    @Watch("translations")
    private updateDefinition() {
        const data = !!this.file && !!this.destinations && !!this.translations
            ? new DataDefinition(this.file, this.destinations, this.translations)
            : null;
        this.$emit("input", data);
    }
}
