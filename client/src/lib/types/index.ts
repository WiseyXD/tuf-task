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
