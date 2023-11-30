
/* 
200	请求成功
201	已创建
202	已接受
204	无内容
206	部分内容
301	永久重定向
302	临时重定向
304	未修改
307	临时重定向
400	错误请求
401	未授权
403	禁止访问
404	未找到
405	方法不允许
406	不可接受
408	请求超时
409	冲突
410	已删除
413	请求实体过大
414	请求URI过长
415	不支持的媒体类型
429	请求过多
500	服务器内部错误
501	未实现
502	错误网关
503	服务不可用
504	网关超时
*/
class Result {
  constructor(success, code, msg) {
    this.success = success
    this.code = code
    this.msg = msg
  }
}

export class Ok extends Result {
  constructor(value,msg='ok',code=200) {
    super(true,code,msg)
    this.value = value;
  }
}

export class Err extends Result {
  constructor(msg='error',code=404) {
    super(false,code,msg)
  }
}