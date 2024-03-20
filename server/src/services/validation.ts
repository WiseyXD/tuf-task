import { z } from "zod";

// Define an enum schema for the code languages
const LanguageEnum = z.enum(["CPlusPlus", "Java", "JavaScript", "Python"]);

// Define a Zod schema for the CodeSnippet model
const CodeSnippetSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    codeLanguage: LanguageEnum,
    stdin: z.string().optional(),
    sourceCode: z.string(),
    timestamp: z.date(),
});

export { CodeSnippetSchema, LanguageEnum };
