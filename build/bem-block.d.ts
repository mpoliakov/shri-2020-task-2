import { Location } from "./utils";
import jsonToAst from 'json-to-ast';
export declare class BemBlock {
    block: string;
    content?: BemBlockArray;
    mods?: object;
    elem?: BemBlock;
    elemMods?: object;
    mix?: BemBlockArray;
    location?: Location;
    constructor(loc: jsonToAst.AstLocation);
}
export declare class BemBlockArray {
    blocks: BemBlock[];
    location?: Location;
    constructor(loc: jsonToAst.AstLocation);
}
export declare const jsonToBem: (json: string) => BemBlock | BemBlockArray | undefined;
