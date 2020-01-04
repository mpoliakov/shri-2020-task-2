import { NodeLinterRule } from "../../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../../bem/bem-block";

export default class InvalidButtonPosition extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock): LinterProblem[] {
        if (bem.block !== 'warning')
            return [];

        let result: LinterProblem[] = [];

        if (bem.content && bem.content.blocks.length) {
            const blocks = bem.content.blocks.filter((b) => b.block === 'button' || b.block === 'placeholder');
            if (blocks.length > 0) {
                const placeholderPosition = blocks.findIndex((b) => b.block === 'placeholder');

                for (let i = 0; i < blocks.length; i++) {
                    if (blocks[i].block === 'button' && i < placeholderPosition) {
                        result = [...result, {
                            code: this.code,
                            error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
                            location: blocks[i].location
                        } as LinterProblem];
                    }
                }
            }
        }

        return result;
    }
}
