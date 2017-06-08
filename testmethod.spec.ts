import {dummy} from './testmethod';

var xxx = "hovadina";

/* globals describe, it, expect, dummy */
describe('Checking that everything is hooked up nicely', function()
{
    console.log("volam toto");
    it('Simple function', function()
    {
        expect(dummy.aboveFive(2)).toEqual(false);
    });
});