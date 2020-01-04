import jsonToAst from 'json-to-ast';
import Location from "./location";

export default class AstObjectHelper {
    static getBlockName(node: jsonToAst.AstObject): string {
        if (node.type !== 'Object') {
            return '';
        }

        const property = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === "block") as jsonToAst.AstProperty;

        if (property) {
            return (property.value as jsonToAst.AstLiteral).value as string;
        }

        return '';
    }

    static getAstContent(node: jsonToAst.AstObject): jsonToAst.AstArray | null {
        const content = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === 'content');

        if (content) {
            return (content.value as jsonToAst.AstArray);
        }

        return null
    }

    static getMods(node: jsonToAst.AstObject) : Map<string, string | number | boolean | null> | undefined {
        const mods = node.children.find((i) => i.key.type === 'Identifier' && i.key.value === 'mods');

        if (mods) {
            const result = new Map<string, string | number | boolean | null>();

            (mods.value as jsonToAst.AstObject).children.forEach((i) => {
                const modName = i.key.value;
                const modValue = (i.value as jsonToAst.AstLiteral).value;
                result.set(modName, modValue);
            }) ;

            return result;
        }

        return undefined;
    }

    static getLocation(node: jsonToAst.AstJsonEntity): Location {
        return {
            start: {
                column: node.loc.start.column,
                line: node.loc.start.line
            },
            end: {
                column: node.loc.end.column,
                line: node.loc.end.line
            }
        };
    }
}