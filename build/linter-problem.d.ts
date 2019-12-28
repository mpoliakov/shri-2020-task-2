import { AstLocation } from 'json-to-ast';
interface LinterProblemPosition {
    column: number;
    line: number;
}
interface LinterProblemLocation {
    start: LinterProblemPosition;
    end: LinterProblemPosition;
}
export declare class LinterProblem {
    readonly code: string;
    readonly error: string;
    readonly location: LinterProblemLocation;
    constructor(code: string, error: string, location: AstLocation);
    toPlainObj(): {} & this;
}
export {};
