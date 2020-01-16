import { readFileSync } from 'fs';
import jsonToBem from '../../../src/bem/json-to-bem';
import BemBlock from '../../../src/bem/bem-block';
import LinterRules from '../../../src/linter-rules/linter-rules';

describe('GRID', () => {
    describe('TOO_MUCH_MARKETING_BLOCKS', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Grid.TooMuchMarketingBlocks('GRID', 'TOO_MUCH_MARKETING_BLOCKS');
            const json = readFileSync('./tests/linter-rules/grid/too-much-marketing-blocks.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;

            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Grid.TooMuchMarketingBlocks('GRID', 'TOO_MUCH_MARKETING_BLOCKS');
            const json = readFileSync('./tests/linter-rules/grid/too-much-marketing-blocks.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'GRID.TOO_MUCH_MARKETING_BLOCKS',
                error: 'Маркетинговые блоки (commercial, offer) занимают не больше половины от всех колонок блока grid.',
                location: {
                    start: {
                        column: 1,
                        line: 1
                    },
                    end: {
                        column: 2,
                        line: 32
                    }
                }
            }));
        });
    });
});