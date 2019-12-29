import { readFileSync } from 'fs';
import {BemBlock, jsonToBem} from '../src/bem-block';
import * as LinterRules from '../src/linter-rules/linter-rules';

describe('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {
    test('correct', () => {
        const linterRule = new LinterRules.Warning_TextSizesShouldBeEqual("WARNING", "TEXT_SIZES_SHOULD_BE_EQUAL");
        const json = readFileSync('./tests/samples/WARNING.TEXT_SIZES_SHOULD_BE_EQUAL.correct.json', 'utf8');
        const bem = jsonToBem(json) as BemBlock;
        expect(linterRule.lint(bem)).toEqual([]);
    });

    test('incorrect', () => {
        const linterRule = new LinterRules.Warning_TextSizesShouldBeEqual("WARNING", "TEXT_SIZES_SHOULD_BE_EQUAL");
        const json = readFileSync('./tests/samples/WARNING.TEXT_SIZES_SHOULD_BE_EQUAL.incorrect.json', 'utf8');
        const bem = jsonToBem(json) as BemBlock;
        expect(linterRule.lint(bem)).toEqual([]);
    });
});
