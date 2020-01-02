import { DocumentLinterRule } from "../../linter-rule";
import { LinterProblem } from "../../linter-problem";
import { BemBlock } from "../../bem-block";
export default class InvalidH3Position extends DocumentLinterRule {
    constructor(category: string, code: string);
    lint(bem: BemBlock): LinterProblem[];
}
