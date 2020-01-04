import { readFileSync } from 'fs';
import { BemBlock, jsonToBem } from '../../src/bem/bem-block';
import * as LinterRules from '../../src/linter/rules/linter-rules';
//import { LinterProblem } from '../src/linter-problem';

describe('WARNING', () => {
    describe('TEXT_SIZES_SHOULD_BE_EQUAL', () => {
        test('valid', () => {
            const linterRule = new LinterRules.WarningTextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/samples/warning/text_sizes_should_be_equal.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        // TODO: add deep object comparison

        test('invalid', () => {
            const linterRule = new LinterRules.WarningTextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/samples/warning/text_sizes_should_be_equal.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL');
            expect(result[0].error).toEqual('Все тексты (блоки text) в блоке warning должны быть одного размера ("size": "l").');
            expect(result[0].location.start.column).toEqual(1);
            expect(result[0].location.start.line).toEqual(1);
            expect(result[0].location.end.column).toEqual(2);
            expect(result[0].location.end.line).toEqual(17);
        });
    });

    describe('INVALID_BUTTON_SIZE', () => {
        test('valid', () => {
            const linterRule = new LinterRules.WarningInvalidButtonSize('WARNING', 'INVALID_BUTTON_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        // TODO: add deep object comparison

        test('invalid', () => {
            const linterRule = new LinterRules.WarningInvalidButtonSize('WARNING', 'INVALID_BUTTON_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('WARNING.INVALID_BUTTON_SIZE');
            expect(result[0].error).toEqual('Размер кнопки блока warning должен быть на 1 шаг больше эталонного ("size": "xl").');
            expect(result[0].location.start.column).toEqual(5);
            expect(result[0].location.start.line).toEqual(10);
            expect(result[0].location.end.column).toEqual(6);
            expect(result[0].location.end.line).toEqual(15);
        });
    });

    describe('INVALID_BUTTON_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.WarningInvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        // TODO: add deep object comparison

        test('invalid', () => {
            const linterRule = new LinterRules.WarningInvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('WARNING.INVALID_BUTTON_POSITION');
            expect(result[0].error).toEqual('Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.');
            expect(result[0].location.start.column).toEqual(5);
            expect(result[0].location.start.line).toEqual(4);
            expect(result[0].location.end.column).toEqual(6);
            expect(result[0].location.end.line).toEqual(9);
        });
    });

    describe('INVALID_PLACEHOLDER_SIZE', () => {
        test('valid', () => {
            const linterRule = new LinterRules.WarningInvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_placeholder_size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.WarningInvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_placeholder_size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO:  expect(result[0]).toBeInstanceOf(typeof LinterProblem);
            expect(result[0].code).toEqual('WARNING.INVALID_PLACEHOLDER_SIZE');
            expect(result[0].error).toEqual('Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.');
            expect(result[0].location.start.column).toEqual(5);
            expect(result[0].location.start.line).toEqual(4);
            expect(result[0].location.end.column).toEqual(6);
            expect(result[0].location.end.line).toEqual(9);
        });
    });
});
