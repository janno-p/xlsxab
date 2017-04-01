import Electron from "electron";

declare module "vue/types/vue" {
    interface Vue {
        $electron: typeof Electron;
    }
}