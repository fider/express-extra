
let template = `    "{{method}}": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid>, res: Res, next: Next) => any >
    ) => this;`

const methods = [
    'checkout',
    'copy',
    'delete',
    'get',
    'head',
    'lock',
    'merge',
    'mkactivity',
    'mkcol',
    'move',
    'm-search',
    'notify',
    'options',
    'patch',
    'post',
    'purge',
    'put',
    'report',
    'search',
    'subscribe',
    'trace',
    'unlock',
    'unsubscribe'
];

console.log(getDefinitions(methods));



function getDefinitions(methods) {
    let results = [];
    for (let method of methods) {
        results.push( template.replace('{{method}}', method) );
    }
    return results.join('\n');
}