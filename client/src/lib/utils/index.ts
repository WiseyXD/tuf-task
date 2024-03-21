import { ProgrammingLanguage } from "../types";

export function findLanguageId(language: string): number | undefined {
    for (const key in ProgrammingLanguage) {
        if (key === language) {
            // @ts-ignore
            return ProgrammingLanguage[key];
        }
    }
    return undefined;
}
