module.exports = function(app)
{
    //METADATA
    app.useMock('GET', /api\/dynamic\/(.*?)$/, (_req, matches) =>
    {
        switch(matches[1])
        {
            case 'simple':
            {
                return 'mocks/dynamic/simple-metadata.json';
            }
            case 'node':
            {
                return 'mocks/dynamic/node-metadata.json';
            }
            default:
            {
                return 'mocks/dynamic/other-metadata.json';
            }
        }
    });

}