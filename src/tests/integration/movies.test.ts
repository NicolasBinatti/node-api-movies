import {App} from "../../app";
import request from "supertest";
import {PrismaClient} from "@prisma/client";

describe("Test create new MovieService", () => {

    const app = new App().app;
    const prisma = new PrismaClient();

    //SUCCESS
    it('Should return all Movies registered', async () => {
        const response = await request(app).get("/movies");
        expect(typeof response.body).toBe("object")
    })

    it('Should check if create a Movie', async () => {
        const response = await request(app).post("/movies").send({
            "year": 1995,
            "title": "Title Test",
            "studios": "Studio Test Creating",
            "producers": "Jest Testing",
            "winner": true
        });

        expect(response.statusCode).toBe(201)
    })

    it('Should return the last Movie registered', async () => {
        const lastMovie = await prisma.movies.findFirst({orderBy: {id: 'desc'}});
        if (lastMovie == null) return

        const response = await request(app).get(`/movies/${lastMovie.id}`);
        expect(typeof response.body).toBe("object")
        expect(response.statusCode).toBe(200)
    })


    it('Should return the last Movie registered', async () => {
        const lastMovie = await prisma.movies.findFirst({orderBy: {id: 'desc'}});
        if (lastMovie == null) return

        const response = await request(app).delete(`/movies/${lastMovie.id}`);
        expect(response.statusCode).toBe(204)
    })

    //FAIL
    it('Should return empty if the id Movie not exist', async () => {
        const lastMovie = await prisma.movies.findFirst({orderBy: {id: 'desc'}});
        if (lastMovie == null) return

        const response = await request(app).get(`/movies/${lastMovie.id + 1}`);

        expect(response.statusCode).toBe(200)
        expect(response.body).toBeNull()
    })

    it('Should return error when try to create new register without title', async () => {
        const response = await request(app).post("/movies").send({
            "year": 1995,
            "studios": "Jest Testing",
            "producers": "Jest Testing",
            "winner": true
        });

        expect(response.statusCode).toBe(400)
        expect(typeof response.body).toBe("object")
    })

    it('Should return error when try to create with winner without a bool', async () => {
        const response = await request(app).post("/movies").send({
            "year": 1995,
            "studios": "Jest Testing",
            "winner": true
        });

        expect(response.statusCode).toBe(400)
        expect(typeof response.body).toBe("object")
    })
})
