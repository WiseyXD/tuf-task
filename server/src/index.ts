require("dotenv").config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.LOCALPORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.get(
    "/",
    async (
        req: Request<
            { params: string },
            {},
            { body: string },
            { query: string }
        >,
        res: Response
    ) => {
        try {
            const name = "Aryan";
            const submissions = await prisma.submittedCode.findMany();
            res.status(200).send({ name, submissions });
        } catch (error: any) {
            const message = error.message;
            res.status(500).send({ message });
        }
    }
);

app.listen(PORT, () => {
    console.log("Server is Listening at port " + PORT);
});
