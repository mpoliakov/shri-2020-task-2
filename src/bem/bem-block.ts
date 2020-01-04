import Location from './location';
import BemBlockArray from "./bem-block-array";

export default class BemBlock {
    block: string;
    content?: BemBlockArray;
    mods?: Map<string, string | number | boolean | null>;
    elem?: BemBlock;
    elemMods?: Map<string, string | number | boolean | null>;
    mix?: BemBlockArray;
    location?: Location;
    depth?: number;

    constructor() {
        this.block = '';
    }
}


