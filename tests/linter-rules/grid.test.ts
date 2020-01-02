import { readFileSync } from 'fs';
import { BemBlock, jsonToBem } from '../../src/bem-block';
import * as LinterRules from '../../src/linter-rules/linter-rules';

describe('GRID', () => {
    describe('TOO_MUCH_MARKETING_BLOCKS', () => {
        test('valid', () => {
            const linterRule = new LinterRules.GridTooMuchMarketingBlocks('GRID', 'TOO_MUCH_MARKETING_BLOCKS');
            const json = readFileSync('./tests/linter-rules/samples/grid/too_much_marketing_blocks.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.GridTooMuchMarketingBlocks('GRID', 'TOO_MUCH_MARKETING_BLOCKS');
            const json = readFileSync('./tests/linter-rules/samples/grid/too_much_marketing_blocks.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('GRID.TOO_MUCH_MARKETING_BLOCKS');
            expect(result[0].error).toEqual('Маркетинговые блоки (commercial, offer) занимают не больше половины от всех колонок блока grid.');
            expect(result[0].location.start.column).toEqual(1);
            expect(result[0].location.start.line).toEqual(1);
            expect(result[0].location.end.column).toEqual(2);
            expect(result[0].location.end.line).toEqual(32);
        });
    });
});