import {LinterRule, NodeLinterRule, DocumentLinterRule} from "./linter-rule";
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

    private readonly nodeRules: NodeLinterRule[];
    private readonly documentRules: DocumentLinterRule[];
    /*
    private readonly rules: LinterRule[];

    private get nodeRules() : NodeLinterRule[] {
        return this.rules.filter(i => i instanceof NodeLinterRule);
    }

    private get documentRules() : DocumentLinterRule[] {
        return this.rules.filter(i => i instanceof DocumentLinterRule);
    }
     */

    private constructor(configuration: object) {
        //this.rules = [];
        this.nodeRules = [];
        this.documentRules = [];

        for (let category in configuration) {
            const codes: object = (configuration as any)[category];

            for(let code in codes) {
                const ruleClass = (codes as any)[code];

                try {
                    const ruleInstance = ruleClass.prototype.constructor(category, code);
                    /*if (ruleInstance instanceof LinterRule) {
                        this.rules = [...this.rules, ruleInstance];
                    }*/
                    if (ruleInstance instanceof NodeLinterRule) {
                        this.nodeRules = [...this.nodeRules, ruleInstance];
                    }
                    else if (ruleInstance instanceof DocumentLinterRule) {
                        this.documentRules = [...this.documentRules, ruleInstance];
                    }
                }
                catch {
                }
            }
        }
    }

    lint(json: string) : LinterProblem[] {
        let result: LinterProblem[] = [];
        let bemForDocumentTests: BemBlock[] = [];

        const traverse = (bem: BemBlock | BemBlockArray | undefined) => {
            if (!bem) {
                return;
            }

            if (bem instanceof BemBlock) {
                /*for(let rule of this.rules) {
                    result = [...result, ...rule.lint(bem as BemBlock)];
                }*/

                for(let rule of this.nodeRules) {
                    result = [...result, ...rule.lint(bem as BemBlock)];
                }

                for(let rule of this.documentRules) {
                    if (rule.check(bem)) {
                        bemForDocumentTests.push(bem);
                        break; // once block is added, no need to continue
                    }
                }

                traverse((bem as BemBlock).content);
                traverse((bem as BemBlock).mix);
            }
            else if (bem instanceof BemBlockArray) {
                const bemBlocks = (bem as BemBlockArray).blocks;

                if (!bemBlocks || !bemBlocks.length) {
                    return;
                }

                for(let block of bemBlocks) {
                    traverse(block);
                }
            }
        };

        const bem = jsonToBem(json);
        traverse(bem);

        for(let rule of this.documentRules) {
            result = [...result, ...rule.lint(bemForDocumentTests)];
        }

        return result;
    }
}


