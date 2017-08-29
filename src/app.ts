
'use strict';

import { config } from 'dotenv'
import * as cors from 'kcors'
// save the .env file in process.env
config()

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import router from './router'

const app = new Koa();

app.use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

export default app