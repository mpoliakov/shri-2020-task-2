import BemBlock from "../bem/bem-block";
import LinterProblem from "../linter-problem";
declare enum LinterRuleType {
    DOCUMENT = 0,
    NODE = 1
}
export declare abstract class LinterRule {
    readonly code: string;
    readonly type: LinterRuleType;
    error: string;
    protected constructor(category: string, code: string, type: LinterRuleType);
    abstract lint(bem: BemBlock): LinterProblem[];
}
export declare abstract class NodeLinterRule extends LinterRule {
    protected constructor(category: string, code: string);
}
export declare abstract class DocumentLinterRule extends LinterRule {
    protected constructor(category: string, code: string);
}
export {};
