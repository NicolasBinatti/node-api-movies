import express, {Application, Express} from "express"
import dotenv from 'dotenv';
import {router} from "./routes";
import MoviesService from "./services/MoviesService";
import {PrismaClient} from "@prisma/client";

class App {
    public port: String
    public host: String
    public app: Application

    constructor() {
        dotenv.config();

        this.app = express()
        this.port = process.env.PORT || '3000';
        this.host = process.env.HOST || 'http://localhost';

        this.config();
        this.fillMoviesTb()
    }

    async config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(router);
    }


    async fillMoviesTb(): Promise<boolean> {
        const prisma = new PrismaClient();
        const quantidade = await prisma.movies.count();
        if (quantidade === 0) {
            await MoviesService.createByCsv("movielist.csv");
        }
        return true;
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running: ${this.host}:${this.port}`)
        });
    }

}

export {App};