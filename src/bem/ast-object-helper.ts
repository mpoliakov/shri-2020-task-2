import jsonToAst from 'json-to-ast';
import Location from './location';

export default class AstObjectHelper {
    static getBlock(ast: jsonToAst.AstObject): string {
        const block = ast.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'block') as jsonToAst.AstProperty;

        if (block) {
            return (block.value as jsonToAst.AstLiteral).value as string;
        }

        return '';
    }

    static getAstContent(ast: jsonToAst.AstObject): jsonToAst.AstArray | undefined {
        const content = ast.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'content');

        if (content) {
            return (content.value as jsonToAst.AstArray);
        }

        return;
    }

    private static getModsMap(ast: jsonToAst.AstObject, modsProperty = 'mods'): Map<string, string | number | boolean | null> | undefined {
        const mods = ast.children?.find((i) => i.key.type === 'Identifier' && i.key.value === modsProperty);

        if (!mods) {
            return;
        }

        const result = new Map<string, string | number | boolean | null>();

        (mods.value as jsonToAst.AstObject).children?.forEach((i) => {
            const modName = i.key.value;
            const modValue = (i.value as jsonToAst.AstLiteral).value;

            if (modValue === 'true') {
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

    static getMods(ast: jsonToAst.AstObject): Map<string, string | number | boolean | null> | undefined {
        return this.getModsMap(ast);
    }

    static getElem(ast: jsonToAst.AstObject): string | undefined {
        const elem = ast.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'elem') as jsonToAst.AstProperty;

        if (elem) {
            return (elem.value as jsonToAst.AstLiteral).value as string;
        }

        return;
    }

    static getElemMods(ast: jsonToAst.AstObject): Map<string, string | number | boolean | null> | undefined {
        return this.getModsMap(ast, 'elemMods');
    }

    static getAstMix(ast: jsonToAst.AstObject): jsonToAst.AstArray | undefined {
        const mix = ast.children?.find((i) => i.key.type === 'Identifier' && i.key.value === 'mix');

        if (mix) {
            return (mix.value as jsonToAst.AstArray);
        }

        return;
    }

    static getLocation(node: jsonToAst.AstJsonEntity): Location | undefined {
        if (!node.loc) {
            return;
        }

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