import { DocumentLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';

export default class SeveralH1 extends DocumentLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    check(bemBlock: BemBlock): boolean {
        return bemBlock && bemBlock.block === 'text' && bemBlock.mods?.get('type') === 'h1';
    }

    lint(bemBlocks: BemBlock[]): LinterProblem[] {
        const h1Blocks = bemBlocks?.filter(i => i.block === 'text' && i.mods?.get('type') === 'h1');

        let result: LinterProblem[] = [];

        if (h1Blocks.length > 1) {
            for(let i = 1; i < h1Blocks.length; i++) {
                result = [...result, {
                    code: this.code,
                    error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
                    location: h1Blocks[i].location
                } as LinterProblem]
            }
        }

        return result;
    }
}
