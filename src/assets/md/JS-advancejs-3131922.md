# 实现原生ajax
## ajax基础知识
1. 创建XMLHttpReauest对象
	- 所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象
	- IE5 和 IE6 使用 ActiveX 对象：
```js
var xhq = null
if (XMLHttpRequest) {
    xhq = new XMLHttpRequest() // 创建对象
} else {
    xhq = new ActiveXObject("Microsoft.XMLHTTP") // 兼容IE5、6
}
```
2. 向服务器发送请求
- `open(method,url,async)`
	- method：请求的类型；GET 或 POST
	- url：文件在服务器上的位置
	- async：true（异步）或 false（同步）
- `send(string)`
	- string：仅用于 POST 请求
	- `setRequestHeader(header,value)`
	- header: 规定头的名称
	- value: 规定头的值
3. onreadystatechange 事件
4. readyState 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
	- 0: 请求未初始化
	- 1: 服务器连接已建立
	- 2: 请求已接收
	- 3: 请求处理中
	- 4: 请求已完成，且响应已就绪
5. status
	- 200: "OK"
	- 404: 未找到页面
6. 服务器响应
	- responseText：获得字符串形式的响应数据。
	- responseXML：获得 XML 形式的响应数据。
## get请求
```js
//步骤一:创建异步对象
var ajax = new XMLHttpRequest();
//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
ajax.open('get','getStar.php?starName='+name);
//步骤三:发送请求
ajax.send();
//步骤四:注册事件 onreadystatechange 状态改变就会调用
ajax.onreadystatechange = function () {
   if (ajax.readyState==4 &&ajax.status==200) {
    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
　　　　console.log(ajax.responseText);//输入相应的内容
  　　}
}
```
## post请求
```js
//创建异步对象  
var xhr = new XMLHttpRequest();
//设置请求的类型及url
//post请求一定要添加请求头才行不然会报错
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 xhr.open('post', '02.post.php' );
//发送请求
xhr.send('name=fox&age=18');
xhr.onreadystatechange = function () {
    // 这步为判断服务器是否正确响应
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  } 
};
```











