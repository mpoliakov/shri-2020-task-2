import * as fs from 'fs';
//import * as path from 'path';
import * as jsonToAst from 'json-to-ast';
import * as LinterRules from '../src/linter-rules/linter-rules';

test('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {
    const linterRule = new LinterRules.Warning_TextSizesShouldBeEqual("WARNING", "TEXT_SIZES_SHOULD_BE_EQUAL");

    //it('correct', () => {
        //const json = fs.readFileSync(path.join(__dirname, './samples/WARNING.TEXT_SIZES_SHOULD_BE_EQUAL.correct.json'));
        const json = fs.readFileSync('./samples/WARNING.TEXT_SIZES_SHOULD_BE_EQUAL.correct.json');

        console.log(json);

        const ast = jsonToAst(json);

        console.log(ast);

        expect(linterRule.lint(ast)).toEqual([]);
    //});
})
