import jsonToAst from "json-to-ast";
import BemBlock from "./bem-block";
import BemBlockArray from "./bem-block-array";
import AstObjectHelper from './ast-object-helper';

export default (json: string) : BemBlock | BemBlockArray | undefined => {
    // TODO: let depth: number = 0;

    const traverse = (ast: jsonToAst.AstJsonEntity | undefined) : BemBlock | BemBlockArray | undefined => {
        if (!ast) {
            return;
        }

        switch (ast.type) {
            case 'Object':
                const bemBlock = new BemBlock();
                bemBlock.block = AstObjectHelper.getBlock(ast);
                bemBlock.mods = AstObjectHelper.getMods(ast);
                bemBlock.elem = AstObjectHelper.getElem(ast);
                bemBlock.elemMods = AstObjectHelper.getElemMods(ast);
                bemBlock.content = traverse(AstObjectHelper.getAstContent(ast)) as BemBlockArray;
                bemBlock.mix = traverse(AstObjectHelper.getAstMix(ast)) as BemBlockArray;
                bemBlock.location = AstObjectHelper.getLocation(ast);
                return bemBlock;

            case 'Array':
                const bemBlockArr = new BemBlockArray();
                ast.children?.forEach((astObject) => {
                    bemBlockArr?.blocks.push(traverse(astObject) as BemBlock);
                });
                bemBlockArr.location = AstObjectHelper.getLocation((ast));
                return bemBlockArr;
        }

        return;
    };

    try {
        const ast = jsonToAst(json);
        return traverse(ast);
    }
    catch {
        return;
    }
}