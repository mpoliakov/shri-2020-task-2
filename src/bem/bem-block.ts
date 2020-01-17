import Location from './location';
import BemBlockArray from './bem-block-array';

export default class BemBlock {
    block: string;
    mods?: Map<string, string | number | boolean | null>;
    elem?: string;
    elemMods?: Map<string, string | number | boolean | null>;
    content?: BemBlockArray;
    mix?: BemBlockArray;
    location?: Location;

    constructor() {
        this.block = '';
    }

    findNestedBlocks(blockNames: string[]): BemBlock[] {
        let result: BemBlock[] = [];

        const traverse = (content: BemBlockArray | undefined) => {
            if (!content || !content.blocks || content.blocks.length === 0) {
                return;
            }

            for (const block of content.blocks) {
                if (blockNames.indexOf(block.block) > -1) {
                    result = [...result, block];
                }

                traverse(block.content);
            }
        }

        traverse(this.content);

        return result;
    }
}


