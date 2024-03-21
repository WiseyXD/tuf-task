import { useState } from "react";
import { useSelector } from "react-redux";
import { usePostSubmissionMutation } from "@/app/api/judge0api";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Submission } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgrammingLanguage } from "@/lib/types";
import { findLanguageId } from "@/lib/utils/index";

export default function CodeExecutioner() {
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [stdError, setStdError] = useState(null);
    const currentCode = useSelector(
        (state: RootState) => state.currentCode.submission
    );

    const [createSubmission] = usePostSubmissionMutation();

    async function handlePost(currentCode: Submission) {
        if (!currentCode) return null;
        setIsLoading(true);
        const {
            // @ts-ignore
            data: executedOutput,
            // @ts-ignore
            isFetching: executingCode,
            // @ts-ignore
            isError,
        } = await createSubmission({
            code: currentCode.sourceCode,
            languageId: findLanguageId(currentCode.codeLanguage),
        });
        if (executingCode) return <>Executing Code</>;
        if (isError) {
            console.log(isError);
            setIsLoading(false);
            return;
        }
        console.log(executedOutput);
        //     setOutput(executedOutput.stdout);
        // setStdError(executedOutput.stderr);
        setIsLoading(false);
    }

    if (!currentCode) {
        return (
            <p className="pb-2 underline">
                Select a Submission from the above table to execute it.
            </p>
        );
    }
    return (
        <div className=" h-[35vh] mb-2">
            <ResizablePanelGroup
                direction="horizontal"
                className=" rounded-lg border "
            >
                <ResizablePanel defaultSize={60}>
                    <ScrollArea className="flex flex-col p-2">
                        <div className="flex justify-between">
                            <span className="font-semibold text-neutral-500">
                                Source Code
                            </span>
                            <p className="text-neutral-500 text-base">
                                {currentCode?.codeLanguage}
                            </p>
                        </div>
                        <p>{currentCode.sourceCode}</p>
                    </ScrollArea>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full flex-col p-2">
                                <p className="ont-semibold text-neutral-500">
                                    Standard Input
                                </p>
                                <ScrollArea className="">
                                    {!currentCode.stdin ? (
                                        <>No stdin provided</>
                                    ) : (
                                        currentCode.stdin
                                    )}
                                </ScrollArea>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full flex-col p-2">
                                <p className="ont-semibold text-neutral-500">
                                    Output Terminal
                                </p>

                                <ScrollArea className="">
                                    {!output ? (
                                        !stdError ? (
                                            <>Click the run button</>
                                        ) : (
                                            stdError
                                        )
                                    ) : (
                                        output
                                    )}
                                </ScrollArea>
                                <Button
                                    onClick={() => handlePost(currentCode)}
                                    disabled={isLoading}
                                >
                                    Run
                                </Button>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
