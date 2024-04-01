import {App} from "../../app";
import request from "supertest";
import {PrismaClient} from "@prisma/client";

describe("Test Server Runing", () => {

    const app = new App().app;

    it('Should return "ok" when the project start', async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual({ok: true})
    })
})
