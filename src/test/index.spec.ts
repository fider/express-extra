import { AnyConstraints, NumberConstraints } from "tsdv-joi-express-middleware";
import http from "http";
import { expressExtra, ExpressExtra, TReq, Res, Next, Req } from "../app/index";

const { Required } = AnyConstraints;
const { NumberSchema } = NumberConstraints;


const app = expressExtra();


class BodyA {
    @Required()
    str: string;

    @NumberSchema()
    num: number;
}
(Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol("Symbol.asyncIterator");

app.get("/test", {body: BodyA},  ok);
app.get("/test", {body: BodyA},  untyped, ok);
app.get("/test", {body: BodyA},  untyped, untyped, ok );

app.get("/test", {body: BodyA},  untyped, untyped, untyped, ok      );
app.get("/test", {body: BodyA},  untyped, untyped, ok,      untyped );
app.get("/test", {body: BodyA},  untyped, ok,      untyped, untyped );
app.get("/test", {body: BodyA},  ok,      untyped, untyped, untyped );


// app.get("/test", {body: BodyA},  untyped, untyped, ok, bad ); // THROWS


function ok(req: TReq<{body: BodyA}>, res: Res, next: Next) {
    req.body; // BodyA
}
function untyped(req: Req, res: Res, next: Next): void {
    req.body; // any
}
function bad(req: TReq<{bad: BodyA}>): void {
    req.body; // any
    req.query; // BodyA
}



describe('index', function() {

    let app: undefined | ExpressExtra;

    beforeAll(async () => {
        app = await startServer();
    });

    afterAll(async () => {
        app = undefined;
        await stopServer();
    })


    describe('ExpressExtra', function() {
        it('ok', () => {})

    });

});



let server: http.Server | undefined = undefined;

async function startServer(): Promise<ExpressExtra> {
    return new Promise( (resolve, reject) => {

        if (server) {
            reject(`startServer() already called. use stopServer() and then you will be able to call it again.`);
        }
        else {

            server = app.listen(4321, () => {
                resolve(app);
            });
        }
    });
}

async function stopServer() {
    return new Promise( (resolve, reject) => {
        if (server) {
            server.close(resolve);
            server = undefined;
        }
        else {
            reject(`stopServer() function already called. To call it again use startServer() first.`);
        }
    });
}






class MWState {
    private states = new Map<string, boolean>();

    get(name: string) {
        this.states.set(name, true);
    }
    set(name: string) {
        return this.states.get(name) || false;
    }
    reset() {
        this.states.clear();
    }
}


const state = new MWState;



function resSend(req: any, res: any) {
    setState();
    res.send('ok');
};
function func_1(req: any, res: any, next: any) {
    setState();
    next();
};
function func_2(req: any, res: any, next: any) {
    setState();
    next();
};
function func_3(req: any, res: any, next: any) {
    setState();
    next();
};


function setState() {
    state.set( getThisFunctionName(1) );
}

function getThisFunctionName(levelsHigher = 0) {
    let callerName: string = '';

    const stack = (new Error()).stack;
    if (stack) {
        callerName = stack.split('\n')[2+levelsHigher];
    }

    return callerName;
}