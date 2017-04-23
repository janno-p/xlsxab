import fs from "fs";
import xlsx from "xlsx";

interface IFlight {
    origin: string;
    originCode: string;
    destination: string;
    destinationCode: string;
    price: string;
    disclaimer: boolean;
}

interface IMarket {
    flights: any[];
}

export interface ILanguage {
    text: { [index: number ]: string; };
    markets: IMarket[];
}

interface ILanguageList {
    [code: string]: ILanguage;
}

interface IAirportList {
    [code: string]: string;
}

export default class DataDefinition {
    private _fileName: string;
    private _languagesSheet: string;
    private _marketsSheet: string;
    private _languages: ILanguageList;
    private _airports: IAirportList;

    get languages() {
        return this._languages;
    }

    public constructor(fileName: string, marketsSheet: string, languagesSheet: string) {
        this._fileName = fileName;
        this._marketsSheet = marketsSheet;
        this._languagesSheet = languagesSheet;
    }

    public loadData() {
        this._airports = JSON.parse(fs.readFileSync("./data/airport-codes.json", "utf8"));
        const workbook = xlsx.readFile(this._fileName);
        this.loadLanguages(workbook.Sheets[this._languagesSheet]);
        this.loadMarkets(workbook.Sheets[this._marketsSheet]);
    }

    private loadLanguages(worksheet: xlsx.IWorkSheet) {
        const range = xlsx.utils.decode_range(worksheet["!ref"]);
        this._languages = {};
        for (let col = range.s.c; col <= range.e.c; col++) {
            const language = { text: {}, markets: {} } as ILanguage;
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
                    language.text[row] = String(cell.v);
                }
            }
        }
    }

    private loadMarkets(worksheet: xlsx.IWorkSheet) {
        const range = xlsx.utils.decode_range(worksheet["!ref"]);
        let activeMarket: IMarket = null;
        for (let row = range.s.r + 2; row <= range.e.r; row++) {
            const cellref = xlsx.utils.encode_cell({ c: 0, r: row });
            const cell: xlsx.IWorkSheetCell = worksheet[cellref];
            const originCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 3, r: row })];
            if ((!activeMarket && !cell) || (!!activeMarket && !originCell)) {
                continue;
            }
            if (!!cell) {
                const name = String(cell.v);
                const languageCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 1, r: row })];
                const language = this._languages[String(languageCell.v).toUpperCase()];
                activeMarket = (language.markets[name] || (language.markets[name] = { flights: [] }));
            }
            const destinationCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 4, r: row })];
            const priceCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 5, r: row })];
            const disclaimerCell: xlsx.IWorkSheetCell = worksheet[xlsx.utils.encode_cell({ c: 6, r: row })];
            const destinationCode = String(destinationCell.v);
            const originCode = String(originCell.v);
            activeMarket.flights.push({
                destination: this._airports[destinationCode],
                destinationCode,
                disclaimer: !!disclaimerCell && String(disclaimerCell.v).trim() === "*",
                origin: this._airports[originCode],
                originCode,
                price: String(priceCell.v),
            });
        }
    }
}
