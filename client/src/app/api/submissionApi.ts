import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Submission {
    id?: number;
    username: string;
    codeLanguage: string; // Assuming codeLanguage can be any string for simplicity
    stdin?: string | null; // Optional stdin field
    sourceCode: string;
    timestamp: string; // Assuming timestamp is represented as a string for simplicity
}

interface SubmissionPayload {
    submissions: Submission[];
}

// Define a service using a base URL and expected endpoints
export const submissionApi = createApi({
    reducerPath: "submissionApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["SubmissionCodes"],
    endpoints: (builder) => ({
        getAllSubmissions: builder.query<SubmissionPayload, null>({
            query: () => ``,
            providesTags: ["SubmissionCodes"],
        }),
        createNewSubmission: builder.mutation<Submission, Submission>({
            query: (credential: Submission) => ({
                url: "create",
                method: "POST",
                body: credential,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSubmissionsQuery, useCreateNewSubmissionMutation } =
    submissionApi;
