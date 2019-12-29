import { LinterRule } from "./linter-rule";
import { BemBlock, BemBlockArray, jsonToBem } from "./bem-block";

export default class LinterStrategy {
    private static instance: LinterStrategy;

    public static getInstance(configuration: object) : LinterStrategy {
        if (!this.instance) {
            this.instance = new LinterStrategy(configuration);
        }

        return this.instance;
    }

    private readonly rules: LinterRule[];

    private constructor(configuration: object) {
        this.rules = [];

        for (let category in configuration) {
            const codes: object = (configuration as any)[category];

            for(let code in codes) {
                const ruleClass = (codes as any)[code];

                try {
                    const ruleInstance = ruleClass.prototype.constructor(category, code);
                    if (ruleInstance instanceof LinterRule) {
                        this.rules = [...this.rules, ruleInstance];
                    }
                }
                catch {
                }
            }
        }
    }

    lint(json: string) {
        console.log('Start linting...');
        const bem = jsonToBem(json);
        console.log('End linting.');
    }
}


