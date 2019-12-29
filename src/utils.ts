import { AstArray, AstObject, AstProperty, AstLiteral } from 'json-to-ast';
import AstJsonEntity = JsonToAst.AstJsonEntity;

export interface Position {
    line: number;
    column: number;
}

export interface Location {
    start: Position;
    end: Position
}

// size enum
// https://www.npmjs.com/package/es6-enum
// https://github.com/rauschma/enumify
export enum TextSize {
    S = 's',
    M = 'm',
    L = 'l',
    XL = 'xl',
    XXL = 'xxl'
}

export class AstObjectHelper {
    static getBlockName(node: AstObject): string {
        if (node.type !== 'Object') {
            return '';
        }

        const property = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === "block") as AstProperty;

        if (property) {
            return (property.value as AstLiteral).value as string;
        }

        return '';
    }

    static getContentAst(node: AstObject): AstArray | null {
        const content = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === 'content');

        if (content) {
            return (content.value as AstArray);
        }

        return null
    }

    static getMods(node: AstObject) : object {
        const mods = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === 'mods');

        if (mods) {
            const result: any = {};

            (mods.value as AstObject).children.forEach((i) => {
                const modName = i.key.value;
                const modValue = (i.value as AstLiteral).value;
                result[modName] = modValue;
            }) ;

            return result;
        }

        return {};
    }

    static getLocation(node: AstJsonEntity): Location {
        return {
            start: {
                line: node.loc.start.line,
                column: node.loc.start.column
            },
            end: {
                line: node.loc.end.line,
                column: node.loc.end.column
            }
        };
    }
}