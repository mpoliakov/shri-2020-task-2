import { NodeLinterRule } from "../../linter-rule";
import { LinterProblem } from "../../linter-problem";
import { BemBlock } from "../../bem-block";
export default class InvalidButtonSize extends NodeLinterRule {
    constructor(category: string, code: string);
    lint(bem: BemBlock): LinterProblem[];
}
