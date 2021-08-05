# this指向全面解析
## this的调用
### 全局上下文中：
- 非严格模式和严格模式中this都是指向顶层对象：浏览器中是window，nodejs中是global
### 函数上下文中：
#### 1. 独立函数调用
- 严格模式下：this指向undefined
- 非严格模式下：this指向undefined的时候自动指向全局对象（浏览器中是window）
```js
var a = 1;
var obj = {
   a:2,
   b:function(){
     function fun() {
        return this.a
     }
     console.log(fun())
   }
}
obj.b()
// fun虽然在obj.b方法中定义，但是还是普通函数直接调用
```
#### 2. 作为对象的方法：
- 函数作为obj对象的一个方法调用，this指向调用它的对象
```js
var a = 1;
var obj = {
   a:2,
   b:function(){ 
       return this.a  
   }
}
console.log(obj.b());  //2
```
- 对象方法赋值给一个新变量
```js
var a = 1;
var obj = {
  a:2,
  b:function(){ 
    return this.a  
  }
}
let t = obj.b
console.log(t());   // 1
```
- obj对的b属性存储的是该函数的一个引用地址，当赋值给t时，实际上是让t存储了指向该函数的指针地址，调用t相当于直接调用了堆中的`function fun() { return this.a }`函数
```js
var a = 1;
function fun() {  // 此函数存储在堆中
  return this.a   
}
var obj = {
  a: 2,
  b: fun // b指向fun函数
}
var t = fun // 变量t指向fun函数
console.log(t());  // 1
```
#### 3. 使用apply\call
- apply()和call()的第一个参数都是this，区别在于apply调用时实参是放到数组中的，而通过call调用时实参是逗号分隔的
#### 4. new构造函数
- this指向new出来的对象
- new做了哪些事情
	- 创建一个临时对象
	- 给临时对象绑定原型
	- 给临时对象对于属性赋值
	- 返回这个临时对象
- 手写一个new实现
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
#### 5. 箭头函数
- 箭头函数没有自己的this，会捕获其所在上下文的this值，作为自己的this值
- 如果箭头函数被非箭头函数包含，则this绑定的是最近一层非箭头函数的this，否则this的值则被设置为全局对象（浏览器中为window，node中为global）
- 箭头函数不能通过new来调用
- 箭头函数没有原型对象
- 不可以改变this的绑定

