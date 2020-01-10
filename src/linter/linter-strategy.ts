import jsonToBem from '../bem/json-to-bem';
import BemBlock from '../bem/bem-block';
import BemBlockArray from '../bem/bem-block-array';
import {
    LinterRule,
    NodeLinterRule,
    DocumentLinterRule
} from './linter-rule';
import LinterProblem from './linter-problem';

export default class LinterStrategy {
    private static instance: LinterStrategy;

    public static getInstance(configuration: object): LinterStrategy {
        if (!this.instance) {
            this.instance = new LinterStrategy(configuration);
        }

        return this.instance;
    }

    private readonly rules: LinterRule[];

    private get nodeLinterRules(): NodeLinterRule[] {
        return this.rules.filter(i => i instanceof NodeLinterRule) as NodeLinterRule[];
    }

    private get documentLinterRules(): DocumentLinterRule[] {
        return this.rules.filter(i => i instanceof DocumentLinterRule) as DocumentLinterRule[];
    }

    private constructor(configuration: object) {
        this.rules = [];

        for (const category in configuration) {
            const codes: object = (configuration as any)[category];

            for(const code in codes) {
                const ruleClass = (codes as any)[code];

                try {
                    const ruleInstance = ruleClass.prototype.constructor(category, code);
                    this.rules = [...this.rules, ruleInstance];
                }
                catch {
                    return;
                }
            }
        }
    }

    lint(json: string): LinterProblem[] {
        let result: LinterProblem[] = [];
        const documentRuleBemMap = new Map<string, BemBlock[]>();

        const traverse = (bem: BemBlock | BemBlockArray | undefined): void => {
            if (!bem) {
                return;
            }

            if (bem instanceof BemBlock) {
                for(const rule of this.nodeLinterRules) {
                    result = [...result, ...rule.lint(bem as BemBlock)];
                }

                for(const rule of this.documentLinterRules) {
                    if (rule.check(bem)) {
                        if (!documentRuleBemMap.has(rule.code)) {
                            documentRuleBemMap.set(rule.code, []);
                        }

                        documentRuleBemMap.get(rule.code)?.push(bem);
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

                for(const block of bemBlocks) {
                    traverse(block);
                }
            }
        };

        const bem = jsonToBem(json);
        traverse(bem);

        for(const rule of this.documentLinterRules) {
            if (documentRuleBemMap.has(rule.code)) {
                const blocks = documentRuleBemMap.get(rule.code);
                if (blocks) {
                    result = [...rule.lint(blocks), ...result];
                }
            }
        }

        return result;
    }
}


