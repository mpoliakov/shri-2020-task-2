import { NodeLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';

export default class InvalidButtonPosition extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bemBlock: BemBlock): LinterProblem[] {
        if (bemBlock.block !== 'warning') {
            return [];
        }

        const buttonAndPlaceholderBlocks = bemBlock.findNestedBlocks(['button', 'placeholder']);


        if (!buttonAndPlaceholderBlocks || buttonAndPlaceholderBlocks.length === 0) {
            return [];
        }

        const placeholderPosition = buttonAndPlaceholderBlocks.findIndex((b) => b.block === 'placeholder');
        if (placeholderPosition === -1) {
            return [];
        }

        let result: LinterProblem[] = [];

        for (let i = 0; i < placeholderPosition; i++) {
            if (buttonAndPlaceholderBlocks[i].block === 'button') {
                result = [...result, {
                    code: this.code,
                    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
                    location: buttonAndPlaceholderBlocks[i].location
                } as LinterProblem];
            }
        }

        return result;
    }
}
