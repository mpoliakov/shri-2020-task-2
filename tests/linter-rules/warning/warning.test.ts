import { readFileSync } from 'fs';
import jsonToBem from '../../../src/bem/json-to-bem';
import BemBlock from '../../../src/bem/bem-block';
import LinterRules from '../../../src/linter-rules/linter-rules';

describe('WARNING', () => {
    describe('TEXT_SIZES_SHOULD_BE_EQUAL', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Warning.TextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/warning/text-sizes-should-be-equal.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.TextSizesShouldBeEqual('WARNING', 'TEXT_SIZES_SHOULD_BE_EQUAL');
            const json = readFileSync('./tests/linter-rules/warning/text-sizes-should-be-equal.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
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
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;

            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonSize('WARNING', 'INVALID_BUTTON_SIZE');
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'WARNING.INVALID_BUTTON_SIZE',
                error: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного ("size": "xl").',
                location: {
                    start: {
                        column: 5,
                        line: 10
                    },
                    end: {
                        column: 6,
                        line: 15
                    }
                }
            }));
        });
    });

    describe('INVALID_BUTTON_POSITION', () => {
        test('valid-1', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-position.valid-1.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;

            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('valid-2', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-position.valid-2.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;

            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid-1', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-position.invalid-1.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'WARNING.INVALID_BUTTON_POSITION',
                error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
                location: {
                    start: {
                        column: 5,
                        line: 4
                    },
                    end: {
                        column: 6,
                        line: 9
                    }
                }
            }));
        });

        test('invalid-2', () => {
            const linterRule = new LinterRules.Warning.InvalidButtonPosition('WARNING', 'INVALID_BUTTON_POSITION');
            const json = readFileSync('./tests/linter-rules/warning/invalid-button-position.invalid-2.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'WARNING.INVALID_BUTTON_POSITION',
                error: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.',
                location: {
                    start: {
                        column: 9,
                        line: 7
                    },
                    end: {
                        column: 10,
                        line: 12
                    }
                }
            }));
        });
    });

    describe('INVALID_PLACEHOLDER_SIZE', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Warning.InvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/warning/invalid-placeholder-size.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;

            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Warning.InvalidPlaceholderSize('WARNING', 'INVALID_PLACEHOLDER_SIZE');
            const json = readFileSync('./tests/linter-rules/warning/invalid-placeholder-size.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'WARNING.INVALID_PLACEHOLDER_SIZE',
                error: 'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.',
                location: {
                    start: {
                        column: 5,
                        line: 4
                    },
                    end: {
                        column: 6,
                        line: 9
                    }
                }
            }));
        });
    });
});
