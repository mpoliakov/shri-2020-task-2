/*
{
    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
    "error": "Тексты в блоке warning должны быть одного размера",
    "location": {
        "start": {
            "column": 1,
            "line": 1
        },
        "end": {
            "column": 2,
            "line": 22
        }
    }
}
*/

import { AstLocation } from 'json-to-ast';

interface LinterProblemPosition {
    column: number;
    line: number;
}

interface LinterProblemLocation {
    start: LinterProblemPosition;
    end: LinterProblemPosition
}

export class LinterProblem {
    readonly code: string;
    readonly error: string;
    readonly location: LinterProblemLocation;

    constructor(code: string,
                error: string,
                location: AstLocation) {
        this.code = code;
        this.error = error;
        this.location = {
            start: {
                column: location.start.column,
                line: location.start.line
            },
            end: {
                column: location.end.column,
                line: location.end.line
            }
        };
    }

    toPlainObj() {
        return Object.assign({}, this);
    }
}

