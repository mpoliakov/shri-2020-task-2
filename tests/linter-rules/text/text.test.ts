import { readFileSync } from 'fs';
import jsonToBem from '../../../src/bem/json-to-bem';
import LinterRules from '../../../src/linter-rules/linter-rules';
import BemBlockArray from "../../../src/bem/bem-block-array";
import LinterStrategy from "../../../src/linter-strategy";

describe('TEXT', () => {
    const linterStrategy = LinterStrategy.getInstance({
        TEXT: {
            SEVERAL_H1: LinterRules.Text.SeveralH1,
            INVALID_H2_POSITION: LinterRules.Text.InvalidH2Position,
            INVALID_H3_POSITION: LinterRules.Text.InvalidH3Position
        },
    });

    describe('SEVERAL_H1', () => {
        const linterRule = new LinterRules.Text.SeveralH1('TEXT', 'SEVERAL_H1');

        test('valid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/several-h1.valid-1.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/several-h1.valid-2.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('invalid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/several-h1.invalid-1.json', 'utf8');
            const result = linterStrategy.lint(json);

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

        test('invalid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/several-h1.invalid-2.json', 'utf8');
            const result = linterStrategy.lint(json);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.SEVERAL_H1',
                error: 'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.',
                location: {
                    start: {
                        column: 7,
                        line: 11
                    },
                    end: {
                        column: 8,
                        line: 16
                    }
                }
            }));
        });
    });

    describe('INVALID_H2_POSITION', () => {
        test('valid-0', () => {
            const json = `{
                "block": "text",
                "mods": {
                    "type": "h2"
                }
            }`;
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.valid-1.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.valid-2.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-3', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.valid-3.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('invalid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.invalid-1.json', 'utf8');
            const result = linterStrategy.lint(json);

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

        test('invalid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.invalid-2.json', 'utf8');
            const result = linterStrategy.lint(json);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(2);

            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.INVALID_H2_POSITION',
                error: 'Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности.',
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

            expect(result[1].code).toEqual('TEXT.SEVERAL_H1');
        });

        test('invalid-3', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h2-position.invalid-3.json', 'utf8');
            const result = linterStrategy.lint(json);

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
        test('valid-0', () => {
            const json = `{
                "block": "text",
                "mods": {
                    "type": "h3"
                }
            }`;
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.valid-1.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.valid-2.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('valid-3', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.valid-3.json', 'utf8');
            expect(linterStrategy.lint(json)).toEqual([]);
        });

        test('invalid-1', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.invalid-1.json', 'utf8');
            const result = linterStrategy.lint(json);

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

        test('invalid-2', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.invalid-2.json', 'utf8');
            const result = linterStrategy.lint(json);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.INVALID_H3_POSITION',
                error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.',
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

        test('invalid-3', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.invalid-3.json', 'utf8');
            const result = linterStrategy.lint(json);

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

        test('invalid-4', () => {
            const json = readFileSync('./tests/linter-rules/text/invalid-h3-position.invalid-4.json', 'utf8');
            const result = linterStrategy.lint(json);

            expect(result instanceof Array).toBeTruthy();
            expect(result.length).toEqual(1);
            expect(JSON.stringify(result[0])).toEqual(JSON.stringify({
                code: 'TEXT.INVALID_H3_POSITION',
                error: 'Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности.',
                location: {
                    start: {
                        column: 7,
                        line: 5
                    },
                    end: {
                        column: 8,
                        line: 10
                    }
                }
            }));
        });
    });
});