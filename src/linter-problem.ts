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

import { Location } from './utils';

export interface LinterProblem {
    code: string;
    error: string;
    location: Location;
    /*toPlainObj() {
        return Object.assign({}, this);
    }*/
}

