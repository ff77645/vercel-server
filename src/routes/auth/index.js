import { Hono } from "hono";
import {sql} from '@vercel/postgres'

const auth = new Hono();

auth.get('/login',c=>c.text('login'))


auth.post('/login',async ({req,text})=>{
  const json = await req.json()
  const body = await req.parseBody()
  console.log({
    json,
    body,
  });
  return text('ok')
})

auth.post('/register',c=>{

})

export default auth