import jsonToAst from 'json-to-ast';
import Location from "./location";
export default class AstObjectHelper {
    static getBlock(node: jsonToAst.AstObject): string;
    static getAstContent(node: jsonToAst.AstObject): jsonToAst.AstArray | undefined;
    static getMods(node: jsonToAst.AstObject): Map<string, string | number | boolean | null> | undefined;
    static getElem(node: jsonToAst.AstObject): string | undefined;
    static getElemMods(node: jsonToAst.AstObject): Map<string, string | number | boolean | null> | undefined;
    static getAstMix(node: jsonToAst.AstObject): jsonToAst.AstArray | undefined;
    static getLocation(node: jsonToAst.AstJsonEntity): Location | undefined;
}
