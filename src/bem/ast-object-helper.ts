import jsonToAst from 'json-to-ast';
import Location from "./location";

export default class AstObjectHelper {
    static getBlock(node: jsonToAst.AstObject): string {
        const property = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'block') as jsonToAst.AstProperty;

        if (property) {
            return (property.value as jsonToAst.AstLiteral).value as string;
        }

        return '';
    }

    static getAstContent(node: jsonToAst.AstObject): jsonToAst.AstArray | undefined {
        const content = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'content');

        if (content) {
            return (content.value as jsonToAst.AstArray);
        }

        return;
    }

    static getMods(node: jsonToAst.AstObject) : Map<string, string | number | boolean | null> | undefined {
        const mods = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'mods');

        if (!mods) {
            return;
        }

        const result = new Map<string, string | number | boolean | null>();

        (mods.value as jsonToAst.AstObject).children?.forEach((i) => {
            const modName = i.key.value;
            const modValue = (i.value as jsonToAst.AstLiteral).value;

            if (modValue === "true") {
                result.set(modName, true);
            }
            else if (!isNaN(Number(modValue))) {
                result.set(modName, Number(modValue))
            }
            else {
                result.set(modName, modValue);
            }
        });

        return result;
    }

    static getElem(node: jsonToAst.AstObject) : string | undefined {
        const property = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'elem') as jsonToAst.AstProperty;

        if (property) {
            return (property.value as jsonToAst.AstLiteral).value as string;
        }

        return;
    }

    static getElemMods(node: jsonToAst.AstObject) : Map<string, string | number | boolean | null> | undefined {
        const elemMods = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'elemMods');

        if (!elemMods) {
            return;
        }

        const result = new Map<string, string | number | boolean | null>();

        (elemMods.value as jsonToAst.AstObject).children?.forEach((i) => {
            const modName = i.key.value;
            const modValue = (i.value as jsonToAst.AstLiteral).value;

            if (modValue === "true") {
                result.set(modName, true);
            }
            else if (!isNaN(Number(modValue))) {
                result.set(modName, Number(modValue))
            }
            else {
                result.set(modName, modValue);
            }
        });

        return result;
    }

    static getAstMix(node: jsonToAst.AstObject): jsonToAst.AstArray | undefined {
        const mix = node.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'mix');

        if (mix) {
            return (mix.value as jsonToAst.AstArray);
        }

        return;
    }

    static getLocation(node: jsonToAst.AstJsonEntity): Location | undefined {
        if (!node.loc)
            return;

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