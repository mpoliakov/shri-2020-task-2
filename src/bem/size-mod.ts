export enum SizeMod {
    S = 's' ,
    M = 'm',
    L = 'l',
    XL = 'xl',
    XXL = 'xxl'
}

export const incrementSizeMod = (value: string): string | undefined => {
    switch (value) {
        case 's':
            return 'm';
        case 'm':
            return 'l';
        case 'l':
            return 'xl';
        case 'xl':
            return 'xxl';
        default:
            return undefined;
    }
}
