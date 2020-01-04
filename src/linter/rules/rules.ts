// TODO: Add namespaces Warning, Text, Grid

import TooMuchMarketingBlocks from './grid/too-much-marketing-blocks';
import SeveralH1 from './text/several-h1';
import InvalidH2Position from './text/invalid-h2-position';
import InvalidH3Position from './text/invalid-h3-position';
import TextSizesShouldBeEqual from './warning/text-sizes-should-be-equal';
import InvalidButtonSize from './warning/invalid-button-size';
import InvalidButtonPosition from './warning/invalid-button-position';
import InvalidPlaceholderSize from './warning/invalid-placeholder-size';

export default {
    Grid: {
        TooMuchMarketingBlocks
    },
    Text: {
        SeveralH1,
        InvalidH2Position,
        InvalidH3Position
    },
    Warning: {
        TextSizesShouldBeEqual,
        InvalidButtonSize,
        InvalidButtonPosition,
        InvalidPlaceholderSize
    }
}


