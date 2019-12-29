import { Location } from "./utils";
import AstLocation = JsonToAst.AstLocation;
export declare class BemBlock {
    block: string;
    content?: BemBlockArray;
    mods?: object;
    elem?: BemBlock;
    elemMods?: object;
    mix?: BemBlockArray;
    location: Location;
    constructor(loc: AstLocation);
}
export declare class BemBlockArray {
    blocks: BemBlock[];
    location: Location;
    constructor(loc: AstLocation);
}
export declare const jsonToBem: (json: string) => BemBlock | BemBlockArray | null;
