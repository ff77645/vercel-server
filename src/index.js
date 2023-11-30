import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import dotenv from 'dotenv'
import router from './routes/index.js'
import {timing} from 'hono/timing'
import {logger} from 'hono/logger'

if(process.env.NODE_ENV === 'development'){
  dotenv.config({
    path:`.env.development.local`
  })
}

const app = new Hono()

app.use('*',timing())
app.use('*',logger())
app.get('/',c=>c.text('vercel servering!'))

app.route('/api',router)

serve({
  fetch:app.fetch,
  port:5000
})
