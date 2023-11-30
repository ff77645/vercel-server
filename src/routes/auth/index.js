import { Hono } from "hono";
import {sql} from '@vercel/postgres'
import { Err,Ok } from "../../helper/result.js";
import {sign} from 'hono/jwt'

const auth = new Hono();

// 登录
auth.post('/login',async c =>{
  const data = await c.req.json()
  const {email,password} = data
  if(!email ||!password) {
    return c.json(new Err('email or password is required'))
  }
  const {rows} = await sql`select * from users where email = ${email}`
  const user = rows[0]
  if(!user || user.password!== password){
    return c.json(new Err('email or password is wrong'))
  }
  user.password = undefined
  const res = new Ok(user,'登录成功')
  const payload = {
    email:user.email,
    id:user.id,
  }
  res.token = await sign(payload,process.env.JWT_SECRET)
  return c.json(res)
})

// 注册
auth.post('/register',async c =>{
  const data = await c.req.json()
  const {email,password} = data
  if(!email || !password) {
    return c.json(new Err('email or password is required'))
  }
  const {rows} = await sql`select * from users where email = ${email}`  
  if(rows.length){
    return c.json(new Err('email is already in use'))
  }
  const created_at = new Date().toUTCString()
  await sql`insert into users (email,password,created_at,updated_at) values (${email},${password},${created_at},${created_at})`
  return c.json(new Ok('','注册成功'))
})

export default auth