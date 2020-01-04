describe('Testing jsonToBem function', () => {
    test('Convert grid', () => {
        const json = `{
           "block": "grid",
           "mods": {
               "m-columns": "10"
           },
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


    });
});