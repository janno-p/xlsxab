import Vue from "vue";
import xlsx from "xlsx";

import {
    Component,
    Prop,
} from "vue-property-decorator";

@Component
export default class SheetSelector extends Vue {
    @Prop({ type: String })
    private file: string;

    private loading = true;
    private worksheets: string[] = [];
    private translationsSheet: string = "";
    private cityPairsSheet: string = "";

    private mounted() {
        this.$nextTick(() => {
            const workbook = xlsx.readFile(this.file);
            this.worksheets = workbook.SheetNames;
            this.loading = false;
        });
    }
}
