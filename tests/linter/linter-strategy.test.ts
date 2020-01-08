import {readFileSync} from "fs";
import LinterRules from "../../src/linter/rules/rules";
import LinterStrategy from "../../src/linter/linter-strategy";

describe('Linter strategy', () => {
    test('Lint using 3 rules', () => {
        const json = readFileSync('./tests/linter/linter-strategy.sample.json', 'utf8');

        const linterStrategy = LinterStrategy.getInstance({
            WARNING: {
                TEXT_SIZES_SHOULD_BE_EQUAL: LinterRules.Warning.TextSizesShouldBeEqual,
                INVALID_PLACEHOLDER_SIZE: LinterRules.Warning.InvalidPlaceholderSize
            },
            TEXT: {
                SEVERAL_H1: LinterRules.Text.SeveralH1
            }
        });

        const result = linterStrategy.lint(json);

        expect(result instanceof Array).toBeTruthy();
        expect(result.length).toEqual(3);
        expect(result[0].code).toEqual('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL');
        expect(result[1].code).toEqual('WARNING.INVALID_PLACEHOLDER_SIZE');
        expect(result[2].code).toEqual('TEXT.SEVERAL_H1');
    });
});