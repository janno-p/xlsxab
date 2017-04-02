interface IHotModule {
    accept(module?: string | string[], cb?: () => void): void;
}

interface NodeModule {
    hot: IHotModule;
}
