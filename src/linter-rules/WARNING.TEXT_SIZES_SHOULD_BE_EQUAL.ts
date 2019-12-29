import { NodeLinterRule } from "../linter-rule";
import { LinterProblem} from "../linter-problem";
import { BemBlock, BemBlockArray } from "../bem-block";

export class Warning_TextSizesShouldBeEqual_Rule extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock | BemBlockArray): LinterProblem[] {
        if (bem) {
        }
        return [];
    }
}
