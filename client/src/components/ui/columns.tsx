"use client";
import moment from "moment";
import { Submission } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Submission>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "codeLanguage",
        header: "Code Language",
    },
    {
        accessorKey: "stdin",
        header: "Standard input",
    },
    {
        accessorKey: "timestamp",
        header: "Submitted at",
        cell: ({ row }) => {
            const time = new Date(row.getValue("timestamp"));
            const formattedDate = moment(time).format(
                "MMMM Do YYYY, h:mm:ss a"
            );
            return <>{formattedDate}</>;
        },
    },
    {
        accessorKey: "sourceCode",
        header: "Code",
        cell: ({ row }) => {
            const sourceCode: string = row.getValue("sourceCode");
            const maxCodeLength = sourceCode.substring(0, 100);
            return <>{maxCodeLength}</>;
        },
    },
];
