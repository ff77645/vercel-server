import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { sql } from "@vercel/postgres"
import dotenv from 'dotenv'

if(process.env.NODE_ENV === 'development'){
  dotenv.config({
    path:`.env.development.local`
  })
}

const app = new Hono()

app
  .get('/', (c) => {
    return c.text('Hello world!')
  })
  .get('/data',async (c)=>{
    const { rows } = await sql`SELECT * from COMPANY`;
    return c.json(rows)
  })

serve({
  fetch:app.fetch,
  port:5000
})
