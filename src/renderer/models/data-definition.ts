import xlsx from "xlsx";

interface IMarket {
    flights: any[];
}

interface ILanguage {
    [index: number]: string;
    markets: {};
}

interface ILanguageList {
    [code: string]: ILanguage;
}

export default class DataDefinition {
    private _fileName: string;
    private _languagesSheet: string;
    private _marketsSheet: string;
    private _languages: ILanguageList;

    get languages() {
        return this._languages;
    }

    public constructor(fileName: string, marketsSheet: string, languagesSheet: string) {
        this._fileName = fileName;
        this._marketsSheet = marketsSheet;
        this._languagesSheet = languagesSheet;
    }

    public loadData() {
        const workbook = xlsx.readFile(this._fileName);
        this.loadLanguages(workbook.Sheets[this._languagesSheet]);
        this.loadMarkets(workbook.Sheets[this._marketsSheet]);
        console.log(this._languages);
    }

    private loadLanguages(worksheet: xlsx.IWorkSheet) {
        const range = xlsx.utils.decode_range(worksheet["!ref"]);
        this._languages = {};
        for (let col = range.s.c; col <= range.e.c; col++) {
            const language = { markets: {} } as ILanguage;
            const getName = () => {
                if (col === 0) {
                    return "default";
                } else {
                    const cellref = xlsx.utils.encode_cell({ c: col, r: 0 });
                    const cell: xlsx.IWorkSheetCell = worksheet[cellref];
                    return !!cell.v ? String(cell.v) : undefined;
                }
            };
            this._languages[getName().toUpperCase()] = language;
            for (let row = range.s.r + 1; row <= range.e.r; row++) {
                const cellref = xlsx.utils.encode_cell({ c: col, r: row });
                const cell: xlsx.IWorkSheetCell = worksheet[cellref];
                if (!!cell && !!cell.v) {
                    language[row] = String(cell.v);
                }
            }
        }
    }

    private loadMarkets(worksheet: xlsx.IWorkSheet) {
        const range = xlsx.utils.decode_range(worksheet["!ref"]);
        let activeMarket: IMarket = null;
        for (let row = range.s.r + 2; row <= range.e.r; row += 4) {
            const cellref = xlsx.utils.encode_cell({ c: 0, r: row });
            const cell: xlsx.IWorkSheetCell = worksheet[cellref];
            const originCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 3, r: row })];
            if ((!activeMarket && !cell) || !originCell) {
                continue;
            }
            const name = String(cell.v);
            const languageCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 1, r: row })];
            const language = this._languages[String(languageCell.v).toUpperCase()];
            activeMarket = (language.markets[name] || (language.markets[name] = {}));
        }
        console.log(worksheet);
    }
}
