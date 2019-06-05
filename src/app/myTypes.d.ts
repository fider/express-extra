import express = require('express');


export type OmitObj<T, K> = Pick<T, Exclude<keyof T, keyof K>>;
export type ObjectOfConstructors<T> = {
    [P in keyof T]: new () => T[P];
};




export type TReq<T> =
    T &
    OmitObj<express.Request, T> & // OmitObj is required, so req.body will not be always recognized as any
    {[Symbol.asyncIterator](): AsyncIterableIterator<any>;}; // Avoid compiler error about missing property

export type Req = express.Request;
export type Res = express.Response;
export type Next = express.NextFunction;

export type ExpressExtra = express.Express & ExtraHandlers;



export interface ExtraHandlers {
    "checkout": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "copy": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "delete": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "get": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid>, res: Res, next: Next) => any >
    ) => this;
    "head": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "lock": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "merge": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "mkactivity": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "mkcol": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "move": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "m-search": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "notify": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "options": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "patch": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "post": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "purge": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "put": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "report": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "search": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "subscribe": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "trace": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "unlock": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
    "unsubscribe": <TValid>(
        this: express.Express,
        pathParam: string,
        validator: ObjectOfConstructors<TValid>,
        ...handlers: Array< (req: TReq<TValid> | Req, res: Res, next: Next) => any >
    ) => this;
}
