import { NodeLinterRule } from "../../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../../bem/bem-block";
import { SizeMod } from '../../../bem/size-mod'

export default class InvalidPlaceholderSize extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bemBlock: BemBlock): LinterProblem[] {
        if (bemBlock.block !== "warning")
            return [];

        if (bemBlock.content && bemBlock.content.blocks.length) {
            const placeholderBlocks = bemBlock.content.blocks.filter((b) => b.block === 'placeholder');

            if (!placeholderBlocks.length)
                return [];

            const etalonSizes: string[] = [SizeMod.S, SizeMod.M, SizeMod.L];

            let result: LinterProblem[] = [];

            for (let block of placeholderBlocks) {
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

        return [];
    }
}
