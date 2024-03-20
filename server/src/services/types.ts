import { z } from "zod";
import { CodeSnippetSchema, LanguageEnum } from "../services/validation";

export type CodeSnippetType = z.infer<typeof CodeSnippetSchema>;
