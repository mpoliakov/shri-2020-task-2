import { readFileSync } from 'fs';
import LinterRules from '../../src/linter/rules/rules';
import LinterStrategy from '../../src/linter/linter-strategy';

describe('Linter strategy', () => {
    const linterStrategy = LinterStrategy.getInstance({
        WARNING: {
            TEXT_SIZES_SHOULD_BE_EQUAL: LinterRules.Warning.TextSizesShouldBeEqual,
            INVALID_BUTTON_SIZE: LinterRules.Warning.InvalidButtonSize,
            INVALID_BUTTON_POSITION: LinterRules.Warning.InvalidButtonPosition,
            INVALID_PLACEHOLDER_SIZE: LinterRules.Warning.InvalidPlaceholderSize
        },
        TEXT: {
            SEVERAL_H1: LinterRules.Text.SeveralH1,
            INVALID_H2_POSITION: LinterRules.Text.InvalidH2Position,
            INVALID_H3_POSITION: LinterRules.Text.InvalidH3Position
        },
        GRID: {
            TOO_MUCH_MARKETING_BLOCKS: LinterRules.Grid.TooMuchMarketingBlocks
        }
    });

    test('empty file', () => {
        const result = linterStrategy.lint('');
        expect(result).toEqual([]);
    });

    test('empty object', () => {
        const result = linterStrategy.lint('{}');
        expect(result).toEqual([]);
    });

    test('empty array', () => {
        const result = linterStrategy.lint('[]');
        expect(result).toEqual([]);
    });

    test('empty objects in array', () => {
        const result = linterStrategy.lint('[{},{}]');
        expect(result).toEqual([]);
    });

    test('invalid json', () => {
        let result = linterStrategy.lint('{abc}');
        expect(result).toEqual([]);
        result = linterStrategy.lint('{abc');
        expect(result).toEqual([]);
        result = linterStrategy.lint('{abc:"",}');
        expect(result).toEqual([]);
    });

    test('sample-1', () => {
        const json = readFileSync('./tests/linter/linter-strategy.sample-1.json', 'utf8');
        const result = linterStrategy.lint(json);

        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toEqual(4);
        expect(result[0].code).toEqual('TEXT.INVALID_H2_POSITION');
        expect(result[1].code).toEqual('TEXT.SEVERAL_H1');
        expect(result[2].code).toEqual('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL');
        expect(result[3].code).toEqual('WARNING.INVALID_PLACEHOLDER_SIZE');
    });

    test('sample-2', () => {
        const json = readFileSync('./tests/linter/linter-strategy.sample-2.json', 'utf8');
        const result = linterStrategy.lint(json);

        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toEqual(3);
        expect(result[0].code).toEqual('TEXT.INVALID_H3_POSITION');
        expect(result[1].code).toEqual('GRID.TOO_MUCH_MARKETING_BLOCKS');
        expect(result[2].code).toEqual('WARNING.INVALID_BUTTON_POSITION');
    });

    test('sample-3', () => {
        const json = readFileSync('./tests/linter/linter-strategy.sample-3.json', 'utf8');
        const result = linterStrategy.lint(json);

        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toEqual(4);
        expect(result[0].code).toEqual('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL');
        expect(result[1].code).toEqual('WARNING.INVALID_BUTTON_SIZE');
        expect(result[2].code).toEqual('WARNING.INVALID_BUTTON_POSITION');
        expect(result[3].code).toEqual('WARNING.INVALID_PLACEHOLDER_SIZE');
    });
});