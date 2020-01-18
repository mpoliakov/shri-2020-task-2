import { NodeLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';

export default class InvalidPlaceholderSize extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bemBlock: BemBlock): LinterProblem[] {
        if (bemBlock.block !== 'warning') {
            return [];
        }

        if (!bemBlock.content || bemBlock.content.blocks.length === 0) {
            return [];
        }

        const placeholderBlocks = bemBlock.findNestedBlocks(['placeholder']);
        if (placeholderBlocks.length === 0) {
            return [];
        }

        let result: LinterProblem[] = [];
        const etalonSizes: string[] = ['s', 'm', 'l'];

        for (const block of placeholderBlocks) {
            const sizeModValue: string = block.mods?.get('size') as string;
            if (etalonSizes.indexOf(sizeModValue) === -1) {
                result = [...result, {
                    code: this.code,
                    error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.',
                    location: block.location
                } as LinterProblem];
            }
        }

        return result;
    }
}
