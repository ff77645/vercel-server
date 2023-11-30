import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import {verify} from 'hono/jwt'

export default function jwt(options) {
  return createMiddleware(async (ctx,next)=>{
    const token = ctx.req.header('Authorization')
    if(!token) {
      const res = new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': `Bearer realm="${ctx.req.url}",error="invalid_request",error_description="no authorization included in request"`,
        },
      })
      throw new HTTPException(401, { res })
    }
    let payload
    let msg = ''
    try {
      payload = await verify(token, options.secret, options.alg || 'HS256')
    } catch (e) {
      msg = `${e}`
    }
    if (!payload) {
      const res = new Response('Unauthorized', {
        status: 401,
        statusText: msg,
        headers: {
          'WWW-Authenticate': `Bearer realm="${ctx.req.url}",error="invalid_token",error_description="token verification failure"`,
        },
      })
      throw new HTTPException(401, { res })
    }
  
    ctx.set('jwtPayload', payload)
    await next()
  })
}