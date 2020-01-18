import { DocumentLinterRule } from '../linter-rule';
import LinterProblem from '../../linter-problem';
import BemBlock from '../../bem/bem-block';

export default class InvalidH2Position extends DocumentLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    check(bemBlock: BemBlock): boolean {
        return bemBlock && bemBlock.block === 'text' && (bemBlock.mods?.get('type') === 'h1' || bemBlock.mods?.get('type') === 'h2');
    }

    lint(bemBlocks: BemBlock[]): LinterProblem[] {
        const hBlocks = bemBlocks.filter(i => i.block === 'text' && (i.mods?.get('type') === 'h1') || i.mods?.get('type') === 'h2');
        const h1Blocks = hBlocks.filter(i => i.mods?.get('type') === 'h1');

        if (h1Blocks.length === 0) {
            return [];
        }

        const lastH1Block = h1Blocks[h1Blocks.length - 1];
        const lastH1Index = hBlocks.lastIndexOf(lastH1Block);

        let result: LinterProblem[] = [];

        const h2BlocksBeforeH1 = hBlocks.slice(0, lastH1Index).filter(i => i.mods?.get('type') === 'h2');
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
