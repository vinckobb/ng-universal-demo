(self as any).MonacoEnvironment = 
{
    getWorkerUrl: function(_moduleId, label)
    {
        if (label === 'json')
        {
            return 'dist/json.worker.js';
        }
        if (label === 'css')
        {
            return 'dist/css.worker.js';
        }
        if (label === 'html')
        {
            return 'dist/html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript')
        {
            return 'dist/ts.worker.js';
        }
        return 'dist/editor.worker.js';
    }
}