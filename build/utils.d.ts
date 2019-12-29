import { AstArray, AstObject } from 'json-to-ast';
import AstJsonEntity = JsonToAst.AstJsonEntity;
export interface Position {
    line: number;
    column: number;
}
export interface Location {
    start: Position;
    end: Position;
}
export declare enum TextSize {
    S = "s",
    M = "m",
    L = "l",
    XL = "xl",
    XXL = "xxl"
}
export declare class AstObjectHelper {
    static getBlockName(node: AstObject): string;
    static getContentAst(node: AstObject): AstArray | null;
    static getMods(node: AstObject): object;
    static getLocation(node: AstJsonEntity): Location;
}
