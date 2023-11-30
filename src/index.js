import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import router from './routes/index.js'
import {timing} from 'hono/timing'
import {logger} from 'hono/logger'
import jwt from './middleware/jwt.js'

const isDev = process.env.NODE_ENV === 'development'
const app = new Hono()

if(isDev){
  dotenv.config({
    path:`.env.development.local`
  })
  app.use('*',timing())
  app.use('*',logger())
}

app.use('/api/jwt/*',jwt({
  secret:process.env.JWT_SECRET,
}))

app.get('/',c=>c.text('vercel servering!'))
app.get('/api/jwt/test',c=>{
  const token = c.req.header('authorization')
  const Authorization = c.req.headers.get('Authorization')
  console.log({token,Authorization});
  return c.text(token)
})

app.route('/api',router)

serve({
  fetch:app.fetch,
  port:5000
})
