import { NodeLinterRule } from "../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../bem/bem-block";
export default class InvalidButtonPosition extends NodeLinterRule {
    constructor(category: string, code: string);
    lint(bem: BemBlock): LinterProblem[];
}
