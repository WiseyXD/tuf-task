import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNewSubmissionMutation } from "@/app/api/submissionApi";
import { useState } from "react";

const codeLanguages = [
    { value: "CPlusPlus", text: "C++" },
    { value: "Java", text: "Java" },
    { value: "JavaScript", text: "Javascript" },
    { value: "Python", text: "Python" },
];

const submissionSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    codeLanguage: z.string({
        required_error: "Please select a Language.",
    }),
    sourceCode: z.string().min(4, "Source code is required"),
    stdin: z.string().nullable().optional(),
});

export default function SubmissionForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createSubmission] = useCreateNewSubmissionMutation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof submissionSchema>>({
        resolver: zodResolver(submissionSchema),
        defaultValues: {
            username: "",
            codeLanguage: "",
            sourceCode: "",
            stdin: null,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof submissionSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        // @ts-ignore
        const { data, isFetching, isError } = await createSubmission(values);
        if (isFetching) return null;
        if (isError) {
            toast({
                title: "Failed creating a new entry",
                variant: "destructive",
            });
            setIsLoading(false);
        }
        toast({
            title: "Created a new entry",
        });
        console.log(data);
        setIsLoading(false);
        form.reset();
        navigate("/results");
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold mt-4 mb-2">
                Submit Your Code
            </h1>
            <br />
            <h2 className="text-xl mb-2">
                Q) Reverse an Array and provide your own standard Output , if
                you have.
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    <div className="grid  gird gird-cols-1 lg:grid-cols-2 gap-x-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="codeLanguage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coding Language</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Select a preffered code
                                        language"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {codeLanguages.map((lang) => {
                                                return (
                                                    <SelectItem
                                                        value={lang.value}
                                                    >
                                                        {lang.text}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can choose your preffered code
                                        language .
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                        <FormField
                            control={form.control}
                            name="sourceCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source Code</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Place your solution here"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stdin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Standard Input , if any.
                                    </FormLabel>
                                    <FormControl>
                                        {/* @ts-ignore */}
                                        <Textarea
                                            placeholder="[2,5,7,321,41,334]"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
