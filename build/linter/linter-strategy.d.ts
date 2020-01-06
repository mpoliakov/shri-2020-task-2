import LinterProblem from "./linter-problem";
export default class LinterStrategy {
    private static instance;
    static getInstance(configuration: object): LinterStrategy;
    private readonly nodeRules;
    private readonly documentRules;
    private constructor();
    lint(json: string): LinterProblem[];
}
