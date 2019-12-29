import { Location, AstObjectHelper } from "./utils";
import * as jsonToAst from 'json-to-ast';

export class BemBlock {
    block: string;
    content?: BemBlockArray;
    mods?: object;
    elem?: BemBlock;
    elemMods?: object;
    mix?: BemBlockArray;
    location?: Location;

    constructor(loc: jsonToAst.AstLocation) {
        this.block = '';
        this.location = {
            start: {
                line: loc.start.line,
                column: loc.start.column
            },
            end: {
                line: loc.end.line,
                column: loc.end.column
            }
        };
    }
}

export class BemBlockArray {
    blocks: BemBlock[];
    location?: Location;

    constructor(loc: jsonToAst.AstLocation) {
        this.blocks = [];
        this.location = {
            start: {
                line: loc.start.line,
                column: loc.start.column
            },
            end: {
                line: loc.end.line,
                column: loc.end.column
            }
        };
    }
}

//export type BemEntity = BemBlock | BemBlockArray;

export const jsonToBem = (json: string) : BemBlock | BemBlockArray | null => {
    /*const traverse = (node: jsonToAst.AstJsonEntity, bemItem: BemBlock | BemBlockArray | null) => {
        switch (node.type) {
            case 'Array':
                bemItem = {} as BemBlockArray;
                bemItem.blocks = new Array<BemBlock>(node.children.length);
                bemItem.location = AstObjectHelper.getLocation(node);

                node.children.forEach((i) => {
                   // traverse(i, )
                });
                break;

            case 'Object':
                bemItem = {} as BemBlock;
                bemItem.block = AstObjectHelper.getBlockName(node);
                bemItem.location = AstObjectHelper.getLocation(node);

                node.children.forEach((property) => {
                    //traverse(property.value);
                });
                break;
        }
    }*/

    // TODO: refactor traverse

    const traverseBlock = (node: jsonToAst.AstObject, bemItem: BemBlock) => {
        bemItem.block = AstObjectHelper.getBlockName(node);
        bemItem.mods = AstObjectHelper.getMods(node);

        const contentAst = AstObjectHelper.getContentAst(node);
        if (contentAst) {
            bemItem.content = new BemBlockArray(contentAst.loc);
            traverseArray(contentAst, bemItem.content);
        }

        bemItem.location = AstObjectHelper.getLocation(node);
    };

    const traverseArray = (nodeArr: jsonToAst.AstArray, bemBlockArr: BemBlockArray) => {
        nodeArr.children.forEach((n) => {
            let arrayItem = new BemBlock(n.loc);
            traverseBlock(n as jsonToAst.AstObject, arrayItem);
            bemBlockArr.blocks.push(arrayItem);
        });
    };

    const ast = jsonToAst(json);

    switch (ast.type) {
        case 'Object':
            let bemBlock = new BemBlock(ast.loc);
            traverseBlock(ast, bemBlock);
            return bemBlock;

        case 'Array':
            let bemBlockArray = new BemBlockArray(ast.loc);
            traverseArray(ast, bemBlockArray);
            return bemBlockArray;
    }

    return null;
}

