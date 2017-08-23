import fetch from 'node-fetch';

const config = process.env

export const authorize = async (ctx: any) => {
    ctx.body = JSON.stringify({
        url: `${config.OUTLOOK_LOGIN_URL}/authorize?` +
        `client_id=${config.OUTLOOK_CLIENT_ID}` +
        `&response_type=${config.OUTLOOK_RESPONSE_TYPE}` +
        `&redirect_uri=${encodeURIComponent(config.OUTLOOK_REDIRECT_URL)}` +
        `&scope=${config.OUTLOOK_SCOPES}&response_mode=fragment`,
    })
}

export const token = async (ctx: any) => {

    const { code } = ctx.params

    const body = {
        client_id: config.OUTLOOK_CLIENT_ID,
        client_secret: config.OUTLOOK_CLIENT_SECRET,
        grant_type: config.OUTLOOK_GRANT_TYPE,
        redirect_url: config.OUTLOOK_REDIRECT_URL,
        code,
    }

    const opts: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors',
        cache: 'default',
        body: urlencode(body),
    }

    console.log('PERFORM OUTLOOK FETCH\n', body, opts)
    const res: any = await fetch(`${config.OUTLOOK_LOGIN_URL}/token`, opts)
    const json: any = await res.json()

    console.log('RECEIVE API RESPONSE', json)
    ctx.status = res.status
    ctx.body = JSON.stringify(json)
}

const urlencode = (obj: { [refId: string]: any }) => {
    const keys = Object.keys(obj)

    return keys.reduce(
        (acc: any, curr: string, idx: number) => {
            console.log('REDUCE CURRENT', acc, curr)
            return `${obj[curr]}${keys.length === idx ? '' : '&'}`
        },
        '',
    )
}