import jsonToAst from 'json-to-ast';
import configuration from "./configuration";
import LinterStrategy from "./linter-strategy";

const lint = (json) => {
    const strategy = new LinterStrategy(configuration);

    const ast = jsonToAst(json);
    traverse(ast);

    return [];
};

const traverse = (ast) => {
    // https://medium.com/quick-code/data-structures-traversing-trees-9473f6d9f4ef
    // https://blog.bitsrc.io/a-guide-to-javascript-algorithms-search-4d653be3dca2

    // https://www.npmjs.com/package/ast-traverse
}