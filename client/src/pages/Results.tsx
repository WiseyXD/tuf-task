import { useGetAllSubmissionsQuery } from "@/app/api/submissionApi";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/ui/columns";

export default function Results() {
    const { data, isFetching } = useGetAllSubmissionsQuery(null);
    if (isFetching) return <>Shimmer</>;

    console.log(data?.submissions);
    return (
        <div>
            <h1 className="text-3xl mt-4 mb-2">All Submissions</h1>
            <div className="flex flex-col">
                <DataTable
                    columns={columns}
                    data={data ? data?.submissions : null}
                />
                <div>Code Box</div>
            </div>
        </div>
    );
}
