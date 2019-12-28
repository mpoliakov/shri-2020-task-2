import { LinterRule, DocumentLinterRule, NodeLinterRule } from "./linter-rule";
import { AstJsonEntity } from 'json-to-ast';

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

    lint(ast: AstJsonEntity) {
        console.log('Start linting...')

        for(let rule of this.rules) {
            rule.lint(ast);
        }

        console.log('End linting.')
    }

    /*traverse = (node: jsonToAst.AstJsonEntity) => {
        // https://medium.com/quick-code/data-structures-traversing-trees-9473f6d9f4ef
        // https://blog.bitsrc.io/a-guide-to-javascript-algorithms-search-4d653be3dca2

        // https://www.npmjs.com/package/ast-traverse

        switch (node.type) {
            case 'Array':
                node.children.forEach((item) => {
                    traverse(item);
                });
                break;

            case 'Object':
                // lint

                node.children.forEach((property) => {
                    // lint
                    traverse(property.value);
                });
                break;
        }
    }*/
}


