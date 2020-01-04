import { readFileSync } from 'fs';
import { BemBlock, jsonToBem } from '../../src/bem/bem-block';
import * as LinterRules from '../../src/linter/rules/linter-rules';

describe('TEXT', () => {
    describe('SEVERAL_H1', () => {
        test('valid', () => {
            const linterRule = new LinterRules.TextSeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter-rules/samples/text/several_h1.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.TextSeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter-rules/samples/text/several_h1.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('TEXT.SEVERAL_H1');
            expect(result[0].error).toEqual('Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.');
            expect(result[0].location.start.column).toEqual(3);
            expect(result[0].location.start.line).toEqual(6);
            expect(result[0].location.end.column).toEqual(4);
            expect(result[0].location.end.line).toEqual(11);
        });
    });

    describe('INVALID_H2_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.TextInvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h2_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.TextInvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h2_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('TEXT.INVALID_H2_POSITION');
            expect(result[0].error).toEqual('Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.');
            expect(result[0].location.start.column).toEqual(3);
            expect(result[0].location.start.line).toEqual(2);
            expect(result[0].location.end.column).toEqual(4);
            expect(result[0].location.end.line).toEqual(7);
        });
    });

    describe('INVALID_H3_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.TextInvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h3_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            expect(linterRule.lint(bem)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.TextInvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h3_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlock;
            const result = linterRule.lint(bem);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('TEXT.INVALID_H3_POSITION');
            expect(result[0].error).toEqual('Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.');
            expect(result[0].location.start.column).toEqual(3);
            expect(result[0].location.start.line).toEqual(2);
            expect(result[0].location.end.column).toEqual(4);
            expect(result[0].location.end.line).toEqual(7);
        });
    });
});