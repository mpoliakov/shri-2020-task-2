import jsonToBem from '../src/bem/json-to-bem';
import BemBlock from "../src/bem/bem-block";

describe('Testing jsonToBem function', () => {
    test('Convert grid', () => {
        const json = `{
           "block": "grid",
           "mods": {
               "m-columns": "10"
           },
           "mix": [
                {
                    "block": "theme",
                    "mods": {
                        "color": "default",
                        "inverse": "true"
                    }
                }
            ],
           "content": [
               {
                   "block": "grid",
                   "elem": "fraction",
                   "elemMods": {
                       "m-col": "8"
                   },
                   "content": [
                       {
                           "block": "payment"
                       }
                   ]
               },
               {
                   "block": "grid",
                   "elem": "fraction",
                   "elemMods": {
                       "m-col": "2"
                   },
                   "content": [
                       {
                           "block": "offer"
                       }
                   ]
               }
           ]
        }`;

        const bem = jsonToBem(json) as BemBlock;

        expect(bem.block).toEqual('grid');
        expect(bem.mods?.get('m-columns')).toEqual(10);
        expect(bem.mix?.blocks[0].block).toEqual('theme');
        expect(bem.mix?.blocks[0].mods?.get('color')).toEqual('default');
        expect(bem.mix?.blocks[0].mods?.get('inverse')).toEqual(true);
        expect(bem.content?.blocks[0].block).toEqual('grid');
        expect(bem.content?.blocks[0].elem).toEqual('fraction');
        expect(bem.content?.blocks[0].elemMods?.get('m-col')).toEqual(8);
        expect(bem.content?.blocks[0].content?.blocks[0].block).toEqual('payment');
    });
});