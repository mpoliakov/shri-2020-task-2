import { AstJsonEntity } from 'json-to-ast';
import { LinterProblem } from "./linter-problem";
declare enum LinterRuleType {
    DOCUMENT = 0,
    NODE = 1
}
export declare abstract class LinterRule {
    readonly code: string;
    readonly type: LinterRuleType;
    error: string;
    constructor(category: string, code: string, type: LinterRuleType);
    abstract lint(ast: AstJsonEntity): LinterProblem[];
}
export declare abstract class DocumentLinterRule extends LinterRule {
    constructor(category: string, code: string);
}
export declare abstract class NodeLinterRule extends LinterRule {
    constructor(category: string, code: string);
}
export {};
