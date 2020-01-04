import jsonToAst from "json-to-ast";
import BemBlock from "./bem-block";
import BemBlockArray from "./bem-block-array";
import AstObjectHelper from './ast-object-helper';

export default (json: string) : BemBlock | BemBlockArray | undefined => {
    // TODO: refactor traverse

    const traverseBlock = (node: jsonToAst.AstObject, bemItem: BemBlock) => {
        bemItem.block = AstObjectHelper.getBlockName(node);
        bemItem.mods = AstObjectHelper.getMods(node);

        const contentAst = AstObjectHelper.getAstContent(node);
        if (contentAst) {
            bemItem.content = new BemBlockArray();
            traverseArray(contentAst, bemItem.content);
        }

        bemItem.location = AstObjectHelper.getLocation(node);
    };

    const traverseArray = (nodeArr: jsonToAst.AstArray, bemBlockArr: BemBlockArray) => {
        nodeArr.children.forEach((n) => {
            let arrayItem = new BemBlock();
            traverseBlock(n as jsonToAst.AstObject, arrayItem);
            bemBlockArr.blocks.push(arrayItem);
        });
        bemBlockArr.location = AstObjectHelper.getLocation((nodeArr));
    };

    const ast = jsonToAst(json);

    switch (ast.type) {
        case 'Object':
            let bemBlock = new BemBlock();
            traverseBlock(ast, bemBlock);
            return bemBlock;

        case 'Array':
            let bemBlockArray = new BemBlockArray();
            traverseArray(ast, bemBlockArray);
            return bemBlockArray;
    }
}