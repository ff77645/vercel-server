import { Hono } from "hono";
import {sql} from '@vercel/postgres'
import { Err,Ok } from "../../helper/result.js";

const auth = new Hono();

// 登录
auth.post('/login',async c =>{
  const data = await c.req.json()
  const {email,password} = data
  if(!email ||!password) {
    return c.json(new Err('email or password is required'))
  }
  const {rows} = await sql`select * from users where email = ${email}`
  if(!rows.length || rows[0].password!== password){
    return c.json(new Err('email or password is wrong'))
  }
  rows[0].password = undefined
  return c.json(new Ok(rows[0],'登录成功'))
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