import {CsvReader} from "../../services/ReadCsvService";

describe("Test Read CSV", () => {
    const Reader = new CsvReader();

    //SUCCESS
    it('Should read csv and return data in a object', async () => {
        const csv = await Reader.readCSV("movielist.csv");
        expect(typeof csv).toBe("object")
    })

    //FAIL
    it('Should get Error if path do not exists', async () => {
        try {
            await Reader.readCSV("xyz.csv");
            fail('File not found');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    })
})