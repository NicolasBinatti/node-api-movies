import fs from 'fs';
import {parse} from "csv-parse";
import CsvRow from "../interfaces/CsvRowInterface";

class CsvReader {
    async readCSV(path: string): Promise<CsvRow[] | Error> {


        const rows: CsvRow[] = [];
        return new Promise<CsvRow[]>((resolve, reject) => {

            const fileStream = fs.createReadStream(path);
            fileStream.on('error', (error) => {
                reject(new Error(`File not found: ${error.message}`));
            });

            const rows: CsvRow[] = [];
            fileStream.pipe(parse({delimiter: ";", from_line: 5}))
                .on("data", function (row) {
                    const csvRow: CsvRow = {
                        year: parseInt(row[0]),
                        title: row[1],
                        studios: row[2],
                        producers: row[3],
                        winner: row[4] !== "",
                    };

                    rows.push(csvRow);
                })
                .on('end', () => {
                    resolve(rows);
                })
                .on('error', (error) => {
                    console.log(error)
                    reject(error);
                });
        })
    }
}

export {CsvReader}