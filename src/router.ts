import { Context } from 'koa'
import * as Router from 'koa-router'
import { authorize, token } from './outlook'

const router = new Router();

const message =
`
Welcome to the Outlook Auth API.

Valid routes are:

/authorize - retrieve a redirect url
/token/:code - authenticate a code
`

router.get('/', async (ctx: Context) => {
    ctx.body =
})

router.get('/outlook/authorize', authorize)
router.get('/outlook/token/:code', token)

export default router;
