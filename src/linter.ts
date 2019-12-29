import configuration from "./configuration";
import LinterStrategy from "./linter-strategy";

const lint = (json: string) => {
    const strategy = LinterStrategy.getInstance(configuration);
    strategy.lint(json);
    return [];
};

((() => {
    const json = '{ "block": "text" }';
    lint(json);
})());

