import express, { Request, IRouterMatcher, RequestHandler } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { validateBody, validate, validateQuery } from 'tsdv-joi-express-middleware';
import { ObjectOfConstructors, TReq, Res, Next, ExtraHandlers } from './myTypes';
import { inspect } from 'util';



const expressHttpMethods: Array<keyof ExtraHandlers> = [
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



export function extendExpressApp(app: express.Express): void {


    for (let method of expressHttpMethods) {
        proxyMethodWithValidatorObjectHandler(app, method)
    }

}



function proxyMethodWithValidatorObjectHandler(object: express.Application, method: string) {
    let originalMethod = (<any>object)[method].bind(object);
    if ( ! originalMethod) {
        throw new Error(`[express-extra] Express Application do no have "${method}" property. Expected property to be defined function that handles spefic http request method (eg. get, post, put, ...).`);
    }

    if (typeof originalMethod !== 'function') {
        throw new Error(`[express-extra] Expected Express.Application.${method} to be function. Actual type: ${typeof originalMethod}`);
    }

    (<any>object)[method] = wrapWithTypeValidationFunction(originalMethod);
}

function wrapWithTypeValidationFunction(func: Function): Function {
    return function extraRequestHandler<TValid>(
            this: express.Express,
            varOrPathParam: string,
            validatorOrHandlers: ObjectOfConstructors<TValid> | RequestHandler | RequestHandlerParams,
            ...typedHandlers: Array< (req: TReq<TValid>, res: Res, next: Next) => any >) {


        let middlewares: any[] | undefined;
        if (typedHandlers.length &&  (typeof validatorOrHandlers === 'object')  && ( ! Array.isArray(validatorOrHandlers) ) ) {
            // Typed request handler eg. app.get('/', {body: Clazz}, ...handlers)
            const validationMiddlewares = getValidationMiddlewares(validatorOrHandlers as any);
            middlewares = [...validationMiddlewares, ...typedHandlers];
        }
        else if (validatorOrHandlers) {
            // Request handler eg. app.get('/', ...handlers)
            return func.call(this, varOrPathParam, ...validatorOrHandlers as any);
        }
        else {
            // req.get('config variable')
            middlewares = undefined;
            return func.call(this, varOrPathParam);
        }

    }
}

// TODO
// - test app.get('config') and app.set('config', 'value') -> check if not destoryed
// test with middleware as array

function getValidationMiddlewares(validator: ObjectOfConstructors<any>) {

    const validationMiddlewares: RequestHandlerParams[] = [];
    for (let [key, clazz] of Object.entries(validator)) {
        let middleware;
        switch (key) {
            case 'body':
                middleware = validateBody(clazz);
                break;
            case 'body':
                    middleware = validateQuery(clazz);
                break;
            default:
                    middleware = validate(key, clazz);
        }
        validationMiddlewares.push( middleware );
    }
    return validationMiddlewares;
}