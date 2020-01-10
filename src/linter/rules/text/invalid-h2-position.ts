import { DocumentLinterRule } from '../../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../../bem/bem-block';

export default class InvalidH2Position extends DocumentLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    check(bemBlock: BemBlock): boolean {
        return bemBlock && bemBlock.block === 'text' && (bemBlock.mods?.get('type') === 'h1' || bemBlock.mods?.get('type') === 'h2');
    }

    lint(bemBlocks: BemBlock[]): LinterProblem[] {
        const hBlocks = bemBlocks.filter(i => i.block === 'text' && (i.mods?.get('type') === 'h1') || i.mods?.get('type') === 'h2');
        const h1Index = hBlocks?.findIndex(i => i.mods?.get('type') === 'h1');

        if (h1Index <= 0) {
            return [];
        }

        let result: LinterProblem[] = [];

        const h2BlocksBeforeH1 = bemBlocks.slice(0, h1Index).filter(i => i.mods?.get('type') === 'h2');
        for (const h2Block of h2BlocksBeforeH1) {
            result = [...result, {
                code: this.code,
                error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
                location: h2Block.location
            } as LinterProblem];
        }

        return result;
    }
}
