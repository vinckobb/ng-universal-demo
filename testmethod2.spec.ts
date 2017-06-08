import {dummy} from './testmethod';

console.log(dummy, "running 2");

/* globals describe, it, expect, dummy */
describe('Checking that everything is hooked up nicely', function()
{
    console.log("volam toto ako 2");

    it('involving the dom', function()
    {
        var el = document.createElement('span');

        dummy.setClass(el, 'foo');

        expect(el.className).toBe('foo');
    });
});