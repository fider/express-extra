import { extendExpressApp } from './updateApp';
import express = require('express');
import { ExpressExtra } from './myTypes';







export function expressExtra(): ExpressExtra {
    const app = express();
    extendExpressApp(app);
    return app as ExpressExtra;
}

export * from "./myTypes";
