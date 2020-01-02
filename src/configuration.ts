import * as LinterRules from './linter-rules/linter-rules';

export default {
    WARNING: {
        TEXT_SIZES_SHOULD_BE_EQUAL: LinterRules.WarningTextSizesShouldBeEqual,
        INVALID_BUTTON_SIZE: LinterRules.WarningInvalidButtonSize,
        INVALID_BUTTON_POSITION: LinterRules.WarningInvalidButtonPosition,
        INVALID_PLACEHOLDER_SIZE: LinterRules.WarningInvalidPlaceholderSize
    },
    TEXT: {
        SEVERAL_H1: LinterRules.TextSeveralH1,
        INVALID_H2_POSITION: LinterRules.TextInvalidH2Position,
        INVALID_H3_POSITION: LinterRules.TextInvalidH3Position
    },
    GRID: {
        TOO_MUCH_MARKETING_BLOCKS: LinterRules.GridTooMuchMarketingBlocks
    }
}