import { DocumentLinterRule } from "../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../bem/bem-block";
export default class InvalidH2Position extends DocumentLinterRule {
    constructor(category: string, code: string);
    lint(bem: BemBlock): LinterProblem[];
}
