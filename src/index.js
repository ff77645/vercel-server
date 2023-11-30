import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import router from './routes/index.js'
import {timing} from 'hono/timing'
import {logger} from 'hono/logger'

const isDev = process.env.NODE_ENV === 'development'

const app = new Hono()

if(isDev){
  dotenv.config({
    path:`.env.development.local`
  })
  app.use('*',timing())
  app.use('*',logger())
}

app.get('/',c=>c.text('vercel servering!'))

app.route('/api',router)

serve({
  fetch:app.fetch,
  port:5000
})
