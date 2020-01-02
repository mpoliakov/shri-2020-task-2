import { NodeLinterRule } from "../../linter-rule";
import { LinterProblem} from "../../linter-problem";
import { BemBlock } from "../../bem-block";
import { BlockSize } from "../../utils";

export default class InvalidPlaceholderSize extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock): LinterProblem[] {
        if (bem.block !== "warning")
            return [];

        if (bem.content && bem.content.blocks.length) {
            const placeholderBlocks = bem.content.blocks.filter((b) => b.block === 'placeholder');

            if (!placeholderBlocks.length)
                return [];

            const etalonSizes: string[] = [BlockSize.S, BlockSize.M, BlockSize.L];

            let result: LinterProblem[] = [];

            for (let block of placeholderBlocks) {
                const sizeModValue: string = (block.mods as any)['size'] as string;
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
