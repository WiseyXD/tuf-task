require("dotenv").config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import { CodeSnippetType } from "./services/types";
import { CodeSnippetSchema } from "./services/validation";

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
            const submissions = await prisma.submittedCode.findMany();
            res.status(200).send({ submissions });
        } catch (error: any) {
            const message = error.message;
            res.status(500).send({ message });
        }
    }
);

app.post(
    "/create",
    async (
        req: Request<
            { params: string },
            {},
            CodeSnippetType,
            { query: string }
        >,
        res: Response
    ) => {
        try {
            const submission = req.body;
            console.log(submission);
            const rightInput = CodeSnippetSchema.safeParse(submission);
            if (!rightInput.success)
                throw Error("Invalid Inputs " + rightInput.error);
            const savedSubmission = await prisma.submittedCode.create({
                data: submission,
            });

            res.status(201).send(savedSubmission);
        } catch (error: any) {
            const message = error.message;
            console.log(message);
            res.status(500).json({ message });
        }
    }
);

app.listen(PORT, () => {
    console.log("Server is Listening at port " + PORT);
});
