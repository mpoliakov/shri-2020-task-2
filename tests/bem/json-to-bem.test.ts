import { readFileSync } from 'fs';
import jsonToBem from '../../src/bem/json-to-bem';
import BemBlock from "../../src/bem/bem-block";
import BemBlockArray from "../../src/bem/bem-block-array";

describe('Convert json-to-bem', () => {
    test('Grid block', () => {
        const json = readFileSync('./tests/bem/bem.grid-block.json', 'utf8');
        const bem = jsonToBem(json) as BemBlock;

        expect(bem.block).toEqual('grid');
        expect(bem.location?.start.column).toEqual(1);
        expect(bem.location?.start.line).toEqual(1);
        expect(bem.location?.end.column).toEqual(2);
        expect(bem.location?.end.line).toEqual(41);

        expect(bem.mods?.get('m-columns')).toEqual(10);

        expect(bem.mix?.blocks[0].block).toEqual('theme');
        expect(bem.mix?.blocks[0].mods?.get('color')).toEqual('default');
        expect(bem.mix?.blocks[0].mods?.get('inverse')).toEqual(true);

        expect(bem.content?.blocks[0].block).toEqual('grid');
        expect(bem.content?.blocks[0].elem).toEqual('fraction');
        expect(bem.content?.blocks[0].elemMods?.get('m-col')).toEqual(8);
        expect(bem.content?.blocks[0].location?.start.column).toEqual(5);
        expect(bem.content?.blocks[0].location?.start.line).toEqual(16);
        expect(bem.content?.blocks[0].location?.end.column).toEqual(6);
        expect(bem.content?.blocks[0].location?.end.line).toEqual(27);

        expect(bem.content?.blocks[0].content?.blocks[0].block).toEqual('payment');
        expect(bem.content?.blocks[0].content?.blocks[0].location?.start.column).toEqual(9);
        expect(bem.content?.blocks[0].content?.blocks[0].location?.start.line).toEqual(23);
        expect(bem.content?.blocks[0].content?.blocks[0].location?.end.column).toEqual(10);
        expect(bem.content?.blocks[0].content?.blocks[0].location?.end.line).toEqual(25);
    });

    test('Text blocks', () => {
        const json = readFileSync('./tests/bem/bem.text-blocks.json', 'utf8');
        const bem = jsonToBem(json) as BemBlockArray;

        expect(bem.blocks.length).toEqual(2);
        expect(bem.location?.start.column).toEqual(1);
        expect(bem.location?.start.line).toEqual(1);
        expect(bem.location?.end.column).toEqual(2);
        expect(bem.location?.end.line).toEqual(14);

        expect(bem.blocks[0].block).toEqual('text');
        expect(bem.blocks[0].mods?.get('type')).toEqual('h1');
        expect(bem.blocks[0].location?.start.column).toEqual(3);
        expect(bem.blocks[0].location?.start.line).toEqual(2);
        expect(bem.blocks[0].location?.end.column).toEqual(4);
        expect(bem.blocks[0].location?.end.line).toEqual(7);
    });
});