import { readFileSync } from 'fs';

import * as jsonToAst from 'json-to-ast';
import { jsonToBem } from '../src/bem-block';

import * as LinterRules from '../src/linter-rules/linter-rules';

test('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {
    const linterRule = new LinterRules.Warning_TextSizesShouldBeEqual("WARNING", "TEXT_SIZES_SHOULD_BE_EQUAL");
    const json = readFileSync('./tests/samples/WARNING.TEXT_SIZES_SHOULD_BE_EQUAL.correct.json', 'utf8');

    const ast = jsonToAst(json);

    const bem = jsonToBem(json);

    expect(linterRule.lint(ast)).toEqual([]);
});
