import DataDefinition from "../models/data-definition";

export const OPEN_WORKSPACE = "OPEN_WORKSPACE";

export interface IOpenWorkspace {
    dataDefinition: DataDefinition;
    templateFiles: string[];
}
