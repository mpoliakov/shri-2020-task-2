import { NodeLinterRule } from "../linter-rule";
import { LinterProblem } from "../linter-problem";
import { BemBlock, BemBlockArray } from "../bem-block";
export declare class Warning_TextSizesShouldBeEqual_Rule extends NodeLinterRule {
    constructor(category: string, code: string);
    lint(bem: BemBlock | BemBlockArray): LinterProblem[];
}
