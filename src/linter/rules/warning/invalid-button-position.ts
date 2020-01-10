import { NodeLinterRule } from '../../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../../bem/bem-block';

export default class InvalidButtonPosition extends NodeLinterRule {
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

        const placeholderPosition = bemBlock.content.blocks.findIndex((b) => b.block === 'placeholder');
        if (placeholderPosition === -1) {
            return [];
        }

        let result: LinterProblem[] = [];

        for (let i = 0; i < bemBlock.content.blocks.length; i++) {
            if (bemBlock.content.blocks[i].block === 'button' && i < placeholderPosition) {
                result = [...result, {
                    code: this.code,
                    error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
                    location: bemBlock.content.blocks[i].location
                } as LinterProblem];
            }
        }

        return result;
    }
}
