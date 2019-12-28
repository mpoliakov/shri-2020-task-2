import { AstJsonEntity } from 'json-to-ast';
import { LinterProblem } from "./linter-problem";

enum LinterRuleType {
    DOCUMENT,
    NODE
}

export abstract class LinterRule {
    readonly code: string;
    readonly type: LinterRuleType;
    error: string = '';

    constructor(category: string, code: string, type: LinterRuleType) {
        this.code = `${category}.${code}`;
        this.type = type;
    }

    abstract lint(ast: AstJsonEntity): LinterProblem[];
}

export abstract class DocumentLinterRule extends LinterRule {
    constructor(category: string, code: string) {
        super(category, code, LinterRuleType.DOCUMENT);
    }
}

export abstract class NodeLinterRule extends LinterRule {
    constructor(category: string, code: string) {
        super(category, code, LinterRuleType.NODE);
    }
}
