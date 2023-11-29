import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { sql } from "@vercel/postgres"
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

app.get('/data',async (c)=>{
    const { rows } = await sql`SELECT * from COMPANY`;
    return c.json(rows)
  })

serve({
  fetch:app.fetch,
  port:5000
})
