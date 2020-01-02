import { NodeLinterRule } from "../../linter-rule";
import { LinterProblem} from "../../linter-problem";
import { BemBlock } from "../../bem-block";
import {incrementBlockSize} from "../../utils";

export default class InvalidButtonSize extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock): LinterProblem[] {
        if (bem.block !== 'warning')
            return [];

        let result: LinterProblem[] = [];

        if (bem.content && bem.content.blocks.length) {
            const textBlocks = bem.content.blocks.filter((b) => b.block === 'text');
            if (textBlocks.length > 0 && textBlocks[0].mods) {
                const etalonSize = (textBlocks[0].mods as any)['size'];

                if (!etalonSize)
                    return [];

                const etalonButtonSize = incrementBlockSize(etalonSize);

                const buttonBlocks = bem.content.blocks.filter((b) => b.block === 'button');
                for (let btn of buttonBlocks) {
                    if ((btn.mods as any)['size'] !== etalonButtonSize) {
                        result = [...result, {
                            code: this.code,
                            error: `Размер кнопки блока warning должен быть на 1 шаг больше эталонного ("size": "${etalonButtonSize}").`,
                            location: btn.location
                        } as LinterProblem];
                    }
                }
            }
        }

        return result;
    }
}
