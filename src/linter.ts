import * as jsonToAst from 'json-to-ast';
//import configuration from "./configuration";
//import LinterStrategy from "./linter-strategy";

const lint = (json: string) => {
   // const strategy = new LinterStrategy(configuration);

    const ast = jsonToAst(json);
    traverse(ast);

    console.log(ast);

    return [];
};

const traverse = (node: jsonToAst.AstJsonEntity) => {
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
}