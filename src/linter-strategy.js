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

    addStrategy(strategy) {
        this._strategies = [...this._strategies, strategy];
    }

    getStrategy(name) {
        return this._strategies.find(strategy => strategy._name === name);
    }
}


