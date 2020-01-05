import { readFileSync } from 'fs';
import BemBlock from '../../src/bem/bem-block';
import jsonToBem from '../../src/bem/json-to-bem';
import LinterRules from '../../src/linter/rules/rules';

describe('WARNING', () => {
    describe('TEXT_SIZES_SHOULD_BE_EQUAL', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Warning.TextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/samples/warning/text_sizes_should_be_equal.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.TextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/samples/warning/text_sizes_should_be_equal.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);

            // TODO: use such comparison everywhere
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
                error: 'Все тексты (блоки text) в блоке warning должны быть одного размера ("size": "l").',
                location: {
                    start: {
                        column: 1,
                        line: 1
                    },
                    end: {
                        column: 2,
                        line: 17
                    }
                }
            }));
        });
    });

    describe('INVALID_BUTTON_SIZE', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonSize('WARNING', 'INVALID_BUTTON_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonSize('WARNING', 'INVALID_BUTTON_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
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
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_button_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
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
            const linterRule = new LinterRules.Warning.InvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_placeholder_size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.InvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/samples/warning/invalid_placeholder_size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(result[0].code).toEqual('WARNING.INVALID_PLACEHOLDER_SIZE');
            expect(result[0].error).toEqual('Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.');
            expect(result[0].location.start.column).toEqual(5);
            expect(result[0].location.start.line).toEqual(4);
            expect(result[0].location.end.column).toEqual(6);
            expect(result[0].location.end.line).toEqual(9);
        });
    });
});
