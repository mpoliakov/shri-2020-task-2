class LinterProblem {
    constructor(code, error, start, end) {
        this._code = code;
        this._error = error;
        this._start = start;
        this._end = end;
    }

    toJSON() {
        return {
          "code": this._code,
          "error": this._error,
          "location": {
              "start": this._start,
              "end": this._end
          }
        };
    }
}

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
