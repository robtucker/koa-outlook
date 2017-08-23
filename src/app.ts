
'use strict';

import { config } from 'dotenv'

// save the .env file in process.env
config()

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './router'

const app = new Koa();

app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

export default app