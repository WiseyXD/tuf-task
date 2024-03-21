import { useGetAllSubmissionsQuery } from "@/app/api/submissionApi";
import React from "react";

export default function Results() {
    const { data, isFetching } = useGetAllSubmissionsQuery(null);
    if (isFetching) return <>Shimmer</>;
    console.log(data?.submissions);
    return <div>Results</div>;
}
