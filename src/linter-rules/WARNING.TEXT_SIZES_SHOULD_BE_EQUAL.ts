import { AstJsonEntity } from "json-to-ast";
import { NodeLinterRule } from "../linter-rule";
import { LinterProblem} from "../linter-problem";

export class Warning_TextSizesShouldBeEqual_Rule extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(ast: AstJsonEntity): LinterProblem[] {
        if (ast) {
            console.log('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL is linting...');


        }

        return [];
    }
}
