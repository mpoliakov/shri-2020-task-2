import { NodeLinterRule } from "../../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../../bem/bem-block";

export default class TooMuchMarketingBlocks extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bem: BemBlock): LinterProblem[] {
        if (bem?.block !== 'grid') {
            return [];
        }

        const mColumns = bem.mods?.get('m-columns') as number;

        if (!mColumns) {
            return [];
        }

        let result: LinterProblem[] = [];

        const marketingBlockNames = ['offer', 'commercial'];

        if (!bem.content?.blocks || bem.content?.blocks.length === 0) {
            return []
        }

        for (let contentBlock of bem.content.blocks) {
            if (contentBlock.block !== 'grid' || contentBlock.elem !== 'fraction') {
                continue;
            }

            const marketingBlock = contentBlock.content?.blocks.find(i => marketingBlockNames.indexOf(i.block) > -1);
            if (!marketingBlock) {
                continue;
            }

            const mCol = contentBlock.elemMods?.get('m-col') as number;

            if (mCol > (mColumns / 2)) {
                result = [...result, {
                    code: this.code,
                    error: 'Маркетинговые блоки (commercial, offer) занимают не больше половины от всех колонок блока grid.',
                    location: bem.location
                } as LinterProblem];
            }
        }

        return result;
    }
}
