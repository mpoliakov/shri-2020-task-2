import { readFileSync } from 'fs';
import jsonToBem from '../../../../src/bem/json-to-bem';
import LinterRules from '../../../../src/linter/rules/rules';
import BemBlockArray from "../../../../src/bem/bem-block-array";

describe('TEXT', () => {
    describe('SEVERAL_H1', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Text.SeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter/rules/text/several-h1.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;

            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.SeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter/rules/text/several-h1.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.SEVERAL_H1',
                error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
                location: {
                    start: {
                        column: 3,
                        line: 8
                    },
                    end: {
                        column: 4,
                        line: 13
                    }
                }
            }));
        });
    });

    describe('INVALID_H2_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Text.InvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter/rules/text/invalid-h2-position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;

            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.InvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter/rules/text/invalid-h2-position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.INVALID_H2_POSITION',
                error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
                location: {
                    start: {
                        column: 3,
                        line: 2
                    },
                    end: {
                        column: 4,
                        line: 7
                    }
                }
            }));
        });
    });

    describe('INVALID_H3_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Text.InvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter/rules/text/invalid-h3-position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;

            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.InvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter/rules/text/invalid-h3-position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.INVALID_H3_POSITION',
                error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.',
                location: {
                    start: {
                        column: 3,
                        line: 2
                    },
                    end: {
                        column: 4,
                        line: 7
                    }
                }
            }));
        });
    });
});