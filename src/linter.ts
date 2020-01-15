import config from './linter-configuration';
import LinterStrategy from './linter-strategy';
import LinterProblem from './linter-problem'

const lint = (json: string): LinterProblem[] => {
    const strategy = LinterStrategy.getInstance(config);
    return strategy.lint(json);
};

(global as any).lint = lint;

export { lint }
