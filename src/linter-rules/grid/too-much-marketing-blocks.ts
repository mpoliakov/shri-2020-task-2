import { NodeLinterRule } from "../../linter-rule";
import { LinterProblem} from "../../linter-problem";
import { BemBlock } from "../../bem-block";

export default class TooMuchMarketingBlocks extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock): LinterProblem[] {
        return [];
    }
}
