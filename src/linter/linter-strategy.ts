import { LinterRule } from "./linter-rule";
import BemBlock from "../bem/bem-block";
import BemBlockArray from "../bem/bem-block-array";
import jsonToBem from '../bem/json-to-bem';
import LinterProblem from "./linter-problem";

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

    lint(json: string) : LinterProblem[] {
        let result : LinterProblem[] = [];

        const traverse = (bem: BemBlock | BemBlockArray | undefined) => {
            if (!bem)
                return [];

            // TODO: use switch
            if (bem instanceof BemBlock) {
                for(let rule of this.rules) {
                    result = [...result, ...rule.lint(bem as BemBlock)];
                }

                traverse((bem as BemBlock).content);
                traverse((bem as BemBlock).elem);
                traverse((bem as BemBlock).mix);
            }
            else if (bem instanceof BemBlockArray) {
                const bemBlocks = (bem as BemBlockArray).blocks;

                if (!bemBlocks || !bemBlocks.length)
                    return [];

                for(let block of bemBlocks) {
                    traverse(block);
                }
            }
        };

        console.log('Start linting...');

        const bem = jsonToBem(json);
        traverse(bem);

        return result;
    }
}


