import { NodeLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';

export default class TooMuchMarketingBlocks extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bemBlock: BemBlock): LinterProblem[] {
        if (bemBlock?.block !== 'grid') {
            return [];
        }

        const mColumns = bemBlock.mods?.get('m-columns') as number;
        if (!mColumns) {
            return [];
        }

        if (!bemBlock.content?.blocks || bemBlock.content?.blocks.length === 0) {
            return []
        }

        let result: LinterProblem[] = [];
        const marketingBlockNames = ['offer', 'commercial'];

        for (const contentBlock of bemBlock.content.blocks) {
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
                    location: bemBlock.location
                } as LinterProblem];
            }
        }

        return result;
    }
}
