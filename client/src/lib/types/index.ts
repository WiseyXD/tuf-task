export interface Submission {
    id?: number;
    username: string;
    codeLanguage: string;
    stdin?: string | null;
    sourceCode: string;
    timestamp?: string;
}

export interface SubmissionPayload {
    submissions: Submission[];
}

export enum ProgrammingLanguage {
    C = 54,
    CSharp = 51,
    CPlusPlus = 15,
    Java = 27,
    JavaScript = 30,
    Python = 71,
    // Add more languages as needed
}
