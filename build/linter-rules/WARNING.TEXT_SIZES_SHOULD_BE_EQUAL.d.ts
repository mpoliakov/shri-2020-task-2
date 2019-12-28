import { AstJsonEntity } from "json-to-ast";
import { NodeLinterRule } from "../linter-rule";
import { LinterProblem } from "../linter-problem";
export declare class Warning_TextSizesShouldBeEqual_Rule extends NodeLinterRule {
    constructor(category: string, code: string);
    lint(ast: AstJsonEntity): LinterProblem[];
}
