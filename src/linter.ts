import * as jsonToAst from 'json-to-ast';
import configuration from "./configuration";
import LinterStrategy from "./linter-strategy";

const lint = (json: string) => {
    const strategy = LinterStrategy.getInstance(configuration);

    const ast = jsonToAst(json);
    strategy.lint(ast)

    return [];
};

((() => {
    const json = '{ "block": "text" }';
    lint(json);
})());

