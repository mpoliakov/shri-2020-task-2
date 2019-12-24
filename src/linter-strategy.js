// TODO: it should be singleton

let _linterStrategy = null;

export default class LinterStrategy {
    constructor(configuration) {
        if (_linterStrategy)
            return _linterStrategy;

        for(let category in configuration) {
            let codes = configuration[category];

            for(let code in codes) {
                let Rule = codes[code];

                this._rules = [...rules, new Rule];
            }
        }
    }

    lintDocument(node) {
        // where rule type === DOCUMENT
        for(let rule in this._rules) {
            rule.lint(node);
        }
    }

    lintNode(node) {
        // where rule type === NODE
        for(let rule in this._rules) {
            rule.lint(node);
        }
    }
}


