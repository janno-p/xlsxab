declare module "electron-devtools-installer" {
    interface ExtensionReference {
        id: string;
        electron: string;
    }
    export const VUEJS_DEVTOOLS: ExtensionReference;
    export default function (extensionReference: ExtensionReference): Promise<{}>;
}
