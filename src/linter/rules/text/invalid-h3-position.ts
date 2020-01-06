import { DocumentLinterRule } from "../../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../../bem/bem-block";

export default class InvalidH3Position extends DocumentLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    check(bemBlock: BemBlock): boolean {
        return bemBlock && bemBlock.block === 'text' && (bemBlock.mods?.get('type') === 'h2' || bemBlock.mods?.get('type') === 'h3');
    }

    lint(bemBlocks: BemBlock[]): LinterProblem[] {
        const hBlocks = bemBlocks.filter(i => i.block === 'text' && (i.mods?.get('type') === 'h2') || i.mods?.get('type') === 'h3');
        const h2Index = hBlocks?.findIndex(i => i.mods?.get('type') === 'h2');

        if (h2Index <= 0) {
            return [];
        }

        let result: LinterProblem[] = [];

        const h3BlocksBeforeH2 = bemBlocks.slice(0, h2Index).filter(i => i.mods?.get('type') === 'h3');
        for (let h3Block of h3BlocksBeforeH2) {
            result = [...result, {
                code: this.code,
                error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.',
                location: h3Block.location
            } as LinterProblem];
        }

        return result;
    }
}
