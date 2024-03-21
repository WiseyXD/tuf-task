import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Judge0 API slice
export const judge0Api = createApi({
    reducerPath: "judge0Api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_JUDGE0 }),
    endpoints: (builder) => ({
        postSubmission: builder.mutation({
            query: ({ code, languageId, stdin }) => ({
                url: "submissions?base64_encoded=false&wait=true&fields=*",
                method: "POST",
                headers: {
                    "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
                    "X-RapidAPI-Host": import.meta.env.VITE_JUDGE0_HOST,
                    "content-type": "application/json",
                    "Content-Type": "application/json",
                },
                body: {
                    source_code: code,
                    language_id: languageId,
                    stdin: stdin || "",
                },
            }),
        }),
    }),
});

// Export hook for usage in components
export const { usePostSubmissionMutation } = judge0Api;
