import { NodeLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';
import incrementSizeMod from '../../bem/increment-size-mod';

export default class InvalidButtonSize extends NodeLinterRule {
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

        const textBlocks = bemBlock.content.blocks.filter((b) => b.block === 'text');
        if (textBlocks.length === 0 || !textBlocks[0].mods) {
            return [];
        }

        const etalonSize = textBlocks[0].mods?.get('size') as string;
        if (!etalonSize) {
            return [];
        }

        const etalonButtonSize = incrementSizeMod(etalonSize);
        const buttonBlocks = bemBlock.content.blocks.filter((b) => b.block === 'button');

        let result: LinterProblem[] = [];

        for (const btn of buttonBlocks) {
            if (btn.mods?.get('size') !== etalonButtonSize) {
                result = [...result, {
                    code: this.code,
                    error: `Размер кнопки блока warning должен быть на 1 шаг больше эталонного ("size": "${etalonButtonSize}").`,
                    location: btn.location
                } as LinterProblem];
            }
        }

        return result;
    }
}
