
# 一、实际问题汇总

## 1、HTTP 请求方法
- 1、OPTIONS 返回服务器针对特定资源所支持的HTTP请求方法，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性
- 2、HEAD 向服务器索与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。
- 3、GET 向特定的资源发出请求。注意：GET方法不应当被用于产生“副作用”的操作中，例如在Web Application中，其中一个原因是GET可能会被网络蜘蛛等随意访问。Loadrunner中对应get请求函数：web_link和web_url
- 4、POST 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。 Loadrunner中对应POST请求函数：web_submit_data,web_submit_form
- 5、PUT 向指定资源位置上传其最新内容
- 6、DELETE 请求服务器删除Request-URL所标识的资源
- 7、TRACE 回显服务器收到的请求，主要用于测试或诊断
- 8、CONNECT HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
## 2、option请求是什么，有什么作用
- 在前后台分离的项目中，经常会遇到浏览器向服务端发送一个post/patch请求,实际上产生了两个请求，一个是Option,另一个才是真实的Post/Patch请求, 而get请求则不会产生Options请求。

- 造成此种问题的原因是浏览器处理跨域的机制，下面来掰扯一下为什么会出现Option请求。
- Options请求出现的情况有两种：

  - 1、获取后台服务器支持的HTTP的通信方式

  - 2、对跨域请求进行preflight request(预检请求)。

预检请求首先需要向另外一个域名的资源发送一个Http Options的请求头，以检测实际发送的请求是否是安全的。options请求是浏览器自发起的preflight request(预检请求)，是浏览器的主动行为。


- preflight request请求报文中有两个需要关注的首部字段：

  - （1）Access-Control-Request-Method：告知服务器实际请求所使用的HTTP方法；

  - （2）Access-Control-Request-Headers：告知服务器实际请求所携带的自定义首部字段。

同时服务器也会添加origin header,告知服务器实际请求的客户端的地址。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

服务器所返回的Access-Control-Allow-Methods首部字段将所有允许的请求方法告知客户端，返回将所有Access-Control-Request-Headers首部字段将所有允许的自定义首部字段告知客户端。此外，服务器端可返回Access-Control-Max-Age首部字段，允许浏览器在指定时间内，无需再发送预检请求，直接用本次结果即可。

在我们开发过程中出现的浏览器自发起的options请求就是上面的第二种情况。实际上，跨域请求中的”复杂请求”发出前会进行一次方法是options的preflight request。

#### 当跨域请求是简单请求时不会进行preflight request,只有复杂请求才会进行preflight request。

- 跨域请求分两种：简单请求、复杂请求；

- 符合以下任一情况的就是复杂请求：

  - 1.使用方法put/delete/patch/post;

  - 2.发送json格式的数据（content-type: application/json）

  - 3.请求中带有自定义头部；

其他情况则可理解为是简单请求。

**为什么跨域的复杂请求需要preflight request（预检请求）？**

复杂请求可能对服务器数据产生副作用。例如delete或者put,都会对服务器数据进行修改,所以在请求之前都要先询问服务器，当前网页所在域名是否在服务器的许可名单中，服务器允许后，浏览器才会发出正式的请求，否则不发送正式请求。
## 3、HTTP跨域
### 解决跨域的方法：
1. 添加header请求头去解决（后端解决问题）
2. jsonp解决跨域问题，只支持get请求，不支持post请求
3. nginx的反向代理解决跨域
## 4、css居中方法
### 4.1 行内元素居中 
  - 水平居中：`text-align:center方式`
  - 垂直居中：把height和line-height的值设置成一样的即可。
### 4.2 块级元素居中
  - 定位
  - margin-left/margin-top
  - 弹性盒子

```css
div{
  display:flex;/*将其定义为弹性容器*/
  align-items: center;/*垂直居中对齐*/
  justify-content: center;/*水平居中对齐*/
}
```
  - display:tabel-cell;
```css
.father{
  display:table-cell;
  vertical-align: middle; // (垂直居中)
}
.son{
  margin:0 auto; //(水平居中)
}
 
```
## 5、能改变数组的方法
- push、pop、shift、unshift、splice、sort、reverse
## 6、call/apply/bind的使用区别
### 6.1. apply
- 两个参数，第一个是this的指向，第二个是函数接受的参数，以数组的形式传入，当第一个参数为null、undefined时，默认指向window
- 使用apply改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
- 可用于求数组中最大值：
```js
var arr =[1, 10, 5, 8, 3]
console.log(Math.max.apply(null, arr)); // 10
```
### 6.2. call
- 第一个参数是this指向，后面传入的是一个参数列表，当一个参数为null或undefined时候，表示指向window
- call改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
```js
var arr =[1, 10, 5, 8, 3]
console.log(Math.max.call(null, arr[0], arr[1],arr[2],arr[3],arr[4])); // 10
```
### 6.3. bind
- 第一个参数也是this的指向，后面传入的也是一个参数列表，但是参数列表可分多次传入，call则必须一次性传入所有参数
- bind改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
```js
var arr =[1, 10, 5, 8, 13]
var max = Math.max.bind(null, arr[0], arr[1],arr[2],arr[3])
console.log(max(arr[4]) //  13
```
### 6.4. apply\call\bind三者区别总结
- 三者都可以改变函数的this指向
- 三者第一个参数都是this指向，如果没有第一个参数或第一个参数为null/undefined，则默认指向全局window
- 三者都可以传参，但是apply是数组，call是参数列表，且apply和call是一次性传入参数，而bind可以分多次传入
- bind是返回绑定this之后的函数，便于稍后调用，apply和call是直接执行函数


## 7、手写getValue方法以及数组随机重排

### 7.1、根据路径获取对应的值，实现一个getValue方法
```js
function getValue(target, str) {
    // let res = target
    // for(let i of str) {
    //     if(i !== '.') res = res[i]
    // }
    // return res
    const arr = str.split('.')
    let res = target
    while(arr.length) {
        res = res[arr.shift()]
    }
    return res
}
let objs = {
  a:{
    b:{
      c:{
        d:1
      }
    }
  }
} 
let res1 = getValue(objs, 'a.b.c')  // { d: 1}
let res2 = getValue(objs, 'a.b.c.d') // 1
```

### 7.2、将一个给定数组进行随机排序
```js
let arr = [1, 2, 3, 4]
let arr2 = ['a', 'd', 'i']
function  getSort(params) { 
  return params.sort(() => Math.random() > 0.5 ? -1 : 1)
}
console.log(getSort(arr));
console.log(getSort(arr2));
```

## 8、git数据流


# 其余
# 1、动态创建script标签并插入到页面上，说执行时机
- 因为浏览器对动态插入的script标签，默认设置的是async。（各浏览器有区别）
- 我们知道async作用的js脚本时没有顺序的，异步加载，加载后执行。

 - 因此特性，所以还有个defer，defer是异步加载，按script在文档中的顺序执行。
 - 创建script标签时把他设置为false,即使test2比test1先加载完，也会等待test1执行完在执行了~
```js
var editorJs = document.createElement("script")
editorJs.src = "./test1.js"
editorJs.async = false
document.body.appendChild(editorJs)

var editorJs2 = document.createElement("script")
editorJs2.src = "./test2.js"
editorJs2.onload = getReadyForEditor
editorJs2.async = false
document.body.appendChild(editorJs2) 
```
# 写一个curry，要求 add(1)(2)(3)(4) 打印10
## 函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。 
- 使用函数柯里化和闭包的特性
```js
function add (...args) {
	return args.reduce((a, b) => a + b)
}

function currying (fn) {
	let args = []
	return function _c (...newArgs) {
    // 判断：如果后续还有参数，则继续执行
		if (newArgs.length) {
			args = [
				...args,
				...newArgs
			]
			return _c
		} else {
      // 没参数则执行add进行计算
			return fn.apply(this, args)
		}
	}
}

let addCurry = currying(add)
// 注意调用方式的变化
console.log(addCurry(1)(2)(3)(4, 5)()) 
```
- 其他方法
```js

function adds(x) {
    var sum = x;
    var tmp = function (y) {
        sum = sum + y;
        return tmp;
    };
    tmp.toString = function () {
      console.log(sum);
        return sum;
    };
    return tmp;
}
console.log(adds(1)(2)(3));  //6
console.log(adds(1)(2)(3)(4));   //10
```



# loader和plugin的区别是什么？
- 同：两者都是为了扩展webpack的功能。
- 异：
  - loader它只专注于转化文件（transform）这一个领域，完成压缩，打包，语言翻译; 而plugin不仅只局限在打包，资源的加载上，还可以打包优化和压缩，重新定义环境变量等
  - loader运行在打包文件之前（loader为在模块加载时的预处理文件）；plugins在整个编译周期都起作用
  - 一个loader的职责是单一的，只需要完成一种转换。一个loader其实就是一个Node.js模块。当需要调用多个loader去转换一个文件时，每个loader会链式的顺序执行
  - 在webpack运行的生命周期中会广播出许多事件，plugin会监听这些事件，在合适的时机通过webpack提供的API改变输出结果

# webpack打包优化
### 1、路由懒加载
### 2、启用gzip压缩和关闭sourcemap
### 3、生产环境去掉console代码，减少代码体积，使用uglifyjs压缩代码
### 4、图片优化
- 尽量减少图片的使用
- 使用css3来代替图片效果
- 小图片通过一定的工具合成雪碧图或者转成base64。
### 5、引用的库尽量按需加载。 
### 6、抽离公共代码块 splitChunkPlugin

### js事件循环机制(Event Loop)
- javascript 是一门单线程的、非阻塞的脚本语言，单线程意味着，javascript代码在执行的任何时候，都只有一个主线程来处理所有的任务，非阻塞靠的就是 event loop（事件循环），本文就讲解下事件循环。

- event loop它最主要是分三部分：主线程、宏队列（macrotask）、微队列（microtask）
js的任务队列分为同步任务和异步任务，所有的同步任务都是在主线程里执行的，异步任务可能会在macrotask或者microtask里面
- 主线程
  - 就是访问到的script标签里面包含的内容，或者是直接访问某一个js文件的时候，里面的可以在当前作用域直接执行的所有内容（执行的方法，new出来的对象等）

- 宏队列（macrotask）
  - setTimeout、setInterval、setImmediate、I/O、UI rendering

- 微队列（microtask）
  - promise.then、process.nextTick

#### 执行顺序
- 1、先执行主线程

- 2、遇到宏队列（macrotask）放到宏队列（macrotask）

- 3、遇到微队列（microtask）放到微队列（microtask）

- 4、主线程执行完毕

- 5、执行微队列（microtask），微队列（microtask）执行完毕

- 6、执行一次宏队列（macrotask）中的一个任务，执行完毕

- 7、执行微队列（microtask），执行完毕

- 8、依次循环。。。
##### Promise和async中的立即执行
- Promise中的异步体现在then和catch中，所以写在Promise中的代码是被当做同步任务立即执行的。而在async/await中，在出现await出现之前，其中的代码也是立即执行的
- await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。


# link标签和import标签的区别
- link属于html标签，而@import是css提供的

- 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。

- link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。

- link方式样式的权重高于@import的。
- 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。
- 链入方式上有区别。

  - link导入方式：
```html
<link rel="stylesheet" type="text/css" href="index.css">  
```
  - @import导入的方式：
<style type="text/css">   
@import url('index.css');   
</style>  

# animation 和 transition 的区别
- animation 
  - name 设置动画的名称
  - duration 设置动画完成的周期
  - timing-function 设置动画的速度曲线
  - delay 设置动画什么时候开始
  - iteration-count 设置动画播放的次数
  - direction 规定下一个周期是否逆向的播放
  - play-state 动画是否正在进行或者暂停
  - fill-mode 设置动画停了之后位置什么状态

- transition 
  - 用 property 去设置过渡效果的属性名称
  - duration 设置过渡效果的周期
  - timing-function 规定速度效果的速度曲线
  - delay 设定过渡效果什么时候开始

### 区别：
- 1、transition 是过渡，是样式值的变化的过程，只有开始和结束；animation 其实也叫关键帧，通过和 keyframe 结合可以设置中间帧的一个状态；

- 2、animation 配合 @keyframe 可以不触发时间就触发这个过程，而 transition 需要通过 hover 或者 js 事件来配合触发；

- 3、animation 可以设置很多的属性，比如循环次数，动画结束的状态等等，transition 只能触发一次；

- 4、animation 可以结合 keyframe 设置每一帧，但是 transition 只有两帧；

- 5、在性能方面：浏览器有一个主线程和排版线程；主线程一般是对 js 运行的、页面布局、生成位图等等，然后把生成好的位图传递给排版线程，而排版线程会通过 GPU 将位图绘制到页面上，也会向主线程请求位图等等；我们在用使用 aniamtion 的时候这样就可以改变很多属性，像我们改变了 width、height、postion 等等这些改变文档流的属性的时候就会引起，页面的回流和重绘，对性能影响就比较大，但是我们用 transition 的时候一般会结合 tansfrom 来进行旋转和缩放等不会生成新的位图，当然也就不会引起页面的重排了；

# 手写一个new实现
```js
function create() {
  // 创建一个空对象
  var obj = new Object()
  // 获得构造函数，arguments中去除第一个参数
  Con = [].shift.call(arguments)
  // 链接到原型，obj可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype
  // 绑定this实现继承，obj可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments)
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj
}

function Person() {
  console.log('123');
}
// 使用手写的new，及create
var person = create(Person, '44')
```



 
# 实现一个函数toSafeObject(obj)，实现以下功能
1. 传入任意对象，返回一个Proxy对象
2. 传入非对象值，返回原值
3. 返回的Proxy对象满足以下条件：
  - 访问Proxy上原对象存在的属性，返回原属性的值
  - 访问Proxy上原对象不存在的属性，返回一个新的Proxy对象
  - 调用Proxy上原对象存在的方法，调用原方法
  - 调用Proxy上原对象不存在的方法，返回undefined

```js
const obj = {
  foo:1,
  bar:{
    a: ()=>{
      return "WOW"
    },
    b: Symbol('b')
  }
}

function toSafeObject(obj) {
  if(Object.prototype.toString.call(obj) !== '[object Object]') return obj
  let handler = {
    get: function (obj, name) {
      if(obj.hasOwnProperty(name)) {
        return obj[name]
      }else{
        return new Proxy({}, handler)
      }
    },
    apply(target, obj, args) {
      console.log();
      return target.apply(obj, args)
    }
  }
  return new Proxy(obj, handler)  
} 
const safObj = toSafeObject(obj)
// console.log(safObj);
console.log(safObj.foo);  // 1
console.log(safObj.c);   // Proxy {}
console.log(safObj.bar.b, toSafeObject(obj.bar.b));// Symbol(b) Symbol(b)
console.log(toSafeObject(obj.bar.a())); //WOW
console.log(toSafeObject(obj.bar.c));  // undefined
```



# Ajax解决浏览器缓存问题
- 1.浏览器缓存的表现：
  - 在项目中一般提交请求都会通过ajax来提交，但是发现，每次提交后得到的数据都是一样的，每次清除缓存后，就又可以得到一个新的数据。

- 2.浏览器缓存原因：
 - ajax能提高页面载入的速度主要的原因是ajax能实现局部刷新，通过局部刷新机制减少了重复数据的载入，也就是说在载入数据的同时将数据缓存到内存中，一旦数据被加载其中，只要没有刷新页面，这些数据就会一直被缓存在内存中，当我们提交 的URL与历史的URL一致时，就不需要提交给服务器，也就是不需要从服务器上面去获取数据。那么，我们得到还是最开始缓存在浏览器中的数据。虽然降低了服务器的负载提高了用户的体验，但是我们不能获取最新的数据。为了保证我们读取的信息都是最新的，我们就需要禁止他的缓存功能。

- 3.解决方法：
  - （1）在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
  原理：If-Modified-Since:0 故意让缓存过期

  - （2）在ajax发送请求前加上anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。 
  原理：直接禁用缓存机制

  - （3）在URL后面加上一个随机数： "fresh=" + Math.random();。 
  原理：强行让每次的请求地址不同

  - （4）在URL后面加上时间搓："nowtime=" + new Date().getTime();。
  原理：强行让每次的请求地址不同

  - （5）如果是使用jQuery，直接这样就可以了$.ajaxSetup({cache:false})。
  原理：不设置ajax缓存 





# ajax、axios、fetch之间的详细区别以及优缺点
1. jQuery ajax 
优缺点：
- 本身是针对MVC的编程,不符合现在前端MVVM的浪潮
- 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
- JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）

2. axios
优缺点：
- 从 node.js 创建 http 请求
- 支持 Promise API
- 客户端支持防止CSRF
- 提供了一些并发请求的接口（重要，方便了很多的操作）

3.fetch
优缺点：
- 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
- 更好更方便的写法
- 更加底层，提供的API丰富（request, response）
- 脱离了XHR，是ES规范里新的实现方式
  - 1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
  - 2）fetch默认不会带cookie，需要添加配置项
  - 3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
  - 4）fetch没有办法原生监测请求的进度，而XHR可以 