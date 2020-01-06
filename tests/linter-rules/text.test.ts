import { readFileSync } from 'fs';
import BemBlock from '../../src/bem/bem-block';
import jsonToBem from '../../src/bem/json-to-bem';
import LinterRules from '../../src/linter/rules/rules';
import BemBlockArray from "../../src/bem/bem-block-array";

describe('TEXT', () => {
    describe('SEVERAL_H1', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Text.SeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter-rules/samples/text/several_h1.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.SeveralH1('TEXT', 'SEVERAL_H1');
            const json = readFileSync('./tests/linter-rules/samples/text/several_h1.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);
            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            // TODO: expect(result[0] instanceof LinterProblem).toBeTruthy();
            expect(result[0].code).toEqual('TEXT.SEVERAL_H1');
            expect(result[0].error).toEqual('Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.');
            expect(result[0].location.start.column).toEqual(3);
            expect(result[0].location.start.line).toEqual(8);
            expect(result[0].location.end.column).toEqual(4);
            expect(result[0].location.end.line).toEqual(13);
        });
    });

    describe('INVALID_H2_POSITION', () => {
        test('valid', () => {
            const linterRule = new LinterRules.Text.InvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h2_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.InvalidH2Position('TEXT', 'INVALID_H2_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h2_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);
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
            const linterRule = new LinterRules.Text.InvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h3_position.valid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            expect(linterRule.lint(bem.blocks)).toEqual([]);
        });

        test('invalid', () => {
            const linterRule = new LinterRules.Text.InvalidH3Position('TEXT', 'INVALID_H3_POSITION');
            const json = readFileSync('./tests/linter-rules/samples/text/invalid_h3_position.invalid.json', 'utf8');
            const bem = jsonToBem(json) as BemBlockArray;
            const result = linterRule.lint(bem.blocks);
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