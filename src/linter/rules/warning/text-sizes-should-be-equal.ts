import { NodeLinterRule } from "../../linter-rule";
import LinterProblem from "../../linter-problem";
import BemBlock from "../../../bem/bem-block";

export default class TextSizesShouldBeEqual extends NodeLinterRule {
    constructor(category: string, code: string) {
        super(category, code);
    }

    lint(bemBlock: BemBlock): LinterProblem[] {
        // TODO: case insensitive check
        if (bemBlock.block !== 'warning')
            return [];

        if (bemBlock.content && bemBlock.content.blocks.length) {
            const textBlocks = bemBlock.content.blocks.filter((b) => b.block === 'text');
            if (textBlocks.length > 1 && textBlocks[0].mods) {
                const etalonSize = textBlocks[0].mods?.get('size');

                for (let i=1; i<textBlocks.length; i++) {
                    if (etalonSize !== textBlocks[i].mods?.get('size')) {
                        return [{
                            code: this.code,
                            error: `Все тексты (блоки text) в блоке warning должны быть одного размера ("size": "${etalonSize}").`,
                            location: bemBlock.location
                        } as LinterProblem];
                    }
                }
            }
        }

        return [];
    }
}
