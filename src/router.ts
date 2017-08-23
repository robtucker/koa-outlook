import { Context } from 'koa'
import * as Router from 'koa-router'
import { authorize, token } from './outlook'

const router = new Router();

const welcome =
`Welcome to the Outlook Auth API.

Valid routes are:

GET /authorize - retrieve a redirect url
GET /token/:code - retrieve an access token`

router.get('/', async (ctx: Context) => {
    ctx.body = welcome
})

router.get('/authorize', authorize)
router.get('/token/:code', token)

export default router;
