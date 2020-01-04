import configuration from './configuration';
import LinterStrategy from './linter/linter-strategy';
import LinterProblem from './linter/linter-problem'

(global as any).lint = (json: string): LinterProblem[] => {
    const strategy = LinterStrategy.getInstance(configuration);
    return strategy.lint(json);
};

/*((() => {
    const json = `{
        "block": "warning",
        "content": [
            {
                "block": "text",
                "mods": {
                    "size": "l"
                }
            },
            {
                "block": "text",
                "mods": {
                    "size": "m"
                }
            },
            {
              "block": "placeholder",
              "mods": {
                "size": "xl"
              }
            }
        ]
    }`;

    const errors = (global as any).lint(json);

    for (let err of errors) {
        console.log(`${err.code}: ${err.error}`);
        console.log(JSON.stringify(err));
    }
})());*/

