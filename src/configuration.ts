import LinterRules from './linter/rules/rules';

export default {
    WARNING: {
        TEXT_SIZES_SHOULD_BE_EQUAL: LinterRules.Warning.TextSizesShouldBeEqual,
        INVALID_BUTTON_SIZE: LinterRules.Warning.InvalidButtonSize,
        INVALID_BUTTON_POSITION: LinterRules.Warning.InvalidButtonPosition,
        INVALID_PLACEHOLDER_SIZE: LinterRules.Warning.InvalidPlaceholderSize
    },
    TEXT: {
        SEVERAL_H1: LinterRules.Text.SeveralH1,
        INVALID_H2_POSITION: LinterRules.Text.InvalidH2Position,
        INVALID_H3_POSITION: LinterRules.Text.InvalidH3Position
    },
    GRID: {
        TOO_MUCH_MARKETING_BLOCKS: LinterRules.Grid.TooMuchMarketingBlocks
    }
}