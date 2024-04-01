import MoviesService from "../../services/MoviesService";
import {PrismaClient} from "@prisma/client";

describe("Test Read CSV and Save on DB", () => {

    const prisma = new PrismaClient();

    it('Should read csv and insert on movies db', async () => {
        const created = await MoviesService.createByCsv("movielist.csv");
        expect(typeof created).toBe("number")
    })

    it('Should get Error if path do not exists', async () => {
        try {
        const created = await MoviesService.createByCsv("qwe.csv");
            fail('File not found');
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }

    })

})