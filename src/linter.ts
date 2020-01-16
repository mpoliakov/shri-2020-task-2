import config from './linter-configuration';
import LinterStrategy from './linter-strategy';
import LinterProblem from './linter-problem'

(global as any).lint = (json: string): LinterProblem[] => {
    const strategy = LinterStrategy.getInstance(config);
    return strategy.lint(json);
};
