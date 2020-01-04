import jsonToAst from 'json-to-ast';
import Location from "./location";
export default class AstObjectHelper {
    static getBlockName(node: jsonToAst.AstObject): string;
    static getAstContent(node: jsonToAst.AstObject): jsonToAst.AstArray | null;
    static getMods(node: jsonToAst.AstObject): Map<string, string | number | boolean | null> | undefined;
    static getLocation(node: jsonToAst.AstJsonEntity): Location;
}
