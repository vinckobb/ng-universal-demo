/* globals describe, it, expect, dummy */
describe('Checking that everything is hooked up nicely', function()
{
    console.log("volam toto");
    it('Simple function', function()
    {
        expect(dummy.aboveFive(2)).toEqual(false);
    });

    // it('involving the dom', function()
    // {
    //     var el = document.createElement('span');

    //     dummy.setClass(el, 'foo');

    //     expect(el.className).toBe('foo');
    // });
});