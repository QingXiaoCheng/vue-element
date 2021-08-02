

import Mock from 'mockjs'
import menu from './menu.json'
import tableList from './tablelist.json'
import artical from './artical.js'

function regValue(key) {  
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  return reg;
}
 

Mock.mock("/mock/menu", 'get', menu)   //请求左侧导航栏信息
Mock.mock("/mock/login", "post", Mock.Random.date('T'))  // 登陆请求
Mock.mock( RegExp('/mock/tablelist' + ".*"), 'get', (options)=>{  // 获取对应文章列表数据
  let body = options.url.split('?')[1] 
  let out = body.match(regValue('out'));
  let inKey = body.match(regValue('in'))
  out = out !== null ? out[2] : null
  inKey = inKey !== null ? inKey[2] :null 
  let res = tableList[out][inKey]
  return Mock.mock(res)
})
Mock.mock(RegExp('/mock/look' + '.*'), 'get', (options)=>{
  let body = options.url.split('?')[1] 
  let articalId = body.match(regValue('articalId'))
  articalId = articalId !== null ? articalId[2] : null;
  return artical[articalId]
})

