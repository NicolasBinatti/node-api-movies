import {PrismaClient} from "@prisma/client";
import MovieInterface from "../interfaces/MovieInterface";
import movieInterface from "../interfaces/MovieInterface";
import {CsvReader} from "./ReadCsvService";


const prisma = new PrismaClient();

class MoviesService {
    public async list(): Promise<MovieInterface | any> {
        return prisma.movies.findMany();
    }

    public async find(id: number): Promise<MovieInterface | any> {
        return prisma.movies.findUnique({where: {id: id}});
    }

    public async create(body: any | movieInterface): Promise<MovieInterface> {
        return prisma.movies.create({
            data: {
                year: body.year,
                title: body.title,
                studios: body.studios,
                producers: body.producers,
                winner: body.winner,
            }
        }).then();
    }

    public async delete(id: number): Promise<MovieInterface | any> {
        const movie = prisma.movies.findUnique({where: {id: id}}).then();
    }

    public async createByCsv(path: string): Promise<Number | Error> {

        const Reader = new CsvReader();
        const csv = await Reader.readCSV(path);

        if (csv instanceof Error) {
            return csv;
        }

        let count = 0;
        for (const movie of csv) {
            await this.create(movie)
            count += 1;
        }

        return count;
    }
}

export default new MoviesService();
