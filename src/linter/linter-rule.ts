import BemBlock from "../bem/bem-block";
import LinterProblem from "./linter-problem";

enum LinterRuleType {
    DOCUMENT,
    NODE
}

export abstract class LinterRule {
    readonly code: string;
    readonly type: LinterRuleType;
    error = '';

    protected constructor(category: string, code: string, type: LinterRuleType) {
        this.code = `${category}.${code}`;
        this.type = type;
    }
}

export abstract class NodeLinterRule extends LinterRule {
    protected constructor(category: string, code: string) {
        super(category, code, LinterRuleType.NODE);
    }

    abstract lint(bemBlock: BemBlock): LinterProblem[];
}

export abstract class DocumentLinterRule extends LinterRule {
    protected constructor(category: string, code: string) {
        super(category, code, LinterRuleType.DOCUMENT);
    }

    abstract check(bemBlock: BemBlock): boolean;
    abstract lint(bemBlocks: BemBlock[]): LinterProblem[];
}

