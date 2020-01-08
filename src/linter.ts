import configuration from './configuration';
import LinterStrategy from './linter/linter-strategy';
import LinterProblem from './linter/linter-problem'

(global as any).lint = (json: string): LinterProblem[] => {
    const strategy = LinterStrategy.getInstance(configuration);
    return strategy.lint(json);
};
