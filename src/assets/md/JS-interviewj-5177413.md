# JS 高级高频面试题

[参考链接](https://juejin.cn/post/6934500357091360781?utm_campaign=sembaidu&utm_medium=sem_baidu_jj_pc_dc01&utm_source=bdpcjj00217#heading-15)
## 1. 问：0.1+0.2 === 0.3 ？
答：`console.log(0.1+0.2) // 0.30000000000000004`
- 在两数相加的时候，会先转换成二进制，0.1和0.2转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS引擎对二进制进行截断，所以造成精度丢失。  
- 总结：精度丢失可能出现在进制转换和对阶运算中。 
- 对阶运算：对阶是指将两个进行运算的浮点数的阶码对齐的操作。对阶的目的是为使两个浮点数的尾数能够进行加减运算。
## 2. JS数据类型
- 基本类型： `Number、Boolean、String、null、undefined、symbol` 
- 引用类型： `Object、Array、Function `

## 3. JS 能支持的最大数字是多少
答：`Math.pow(2, 53)`
原因：JS是通过64位来表示一个数字的
- 1 符号位：0-正数， 1-负数
- 11 指数位（e）
- 52 尾数，小数部分，即有效数字
- JS提供的有效数字最长为53个二进制位，64位浮点的后52位+被省略的1位
## 克隆

### 浅拷贝
- 拷贝的对象属性为基本类型时，拷贝的是基本类型的值，两变量互不影响
- 拷贝的对象属性为引用类型时，拷贝的是引用地址，会互相影响
### 浅拷贝方法
1. `Object.assign()`:将所有可枚举属性的值从一个或多个源对象复制到目标对象，会返回目标对象
2. 展开语法`...`
3. `Object.prototype.slice()`
```js
let a = [0, "1", [2, 3]];
let b = a.slice(0);
console.log(b);  // [0, "1", [2, 3]];
a[0] = 98
a[2][1] = '66'. 
console.log(a);  // [98, "1", [2, '66']];
console.log(b);  // [0, "1", [2, '66']];
```
4. 浅拷贝函数
```js
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }

    return target;
}
```
### 深拷贝
- 拷贝前后两个对象互不影响
### 深拷贝的方法
1. `JSON.parse(JSON.stringify(object))`
- 存在问题：
	- 会忽略`undefined、symbol`
	- 不能序列化函数
	- 不能解决循环引用的对象
	- 不能处理正则
	- 不能正确处理`new Date()`
		- 解决方法转成字符串或者时间戳就好了。

## 如何实现一个深拷贝
### 最简单版本
- 存在的问题：
	- 没有对参数的检验
	- 判断是否对象的方法不够严谨
	- 没有考虑数组的兼容性
	- 递归当数据层次很深会栈溢出
```js
function clone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === 'object') {
                target[i] = clone(source[i]); // 注意这里
            } else {
                target[i] = source[i];
            }
        }
    }

    return target;
}
```

### 改良版本1
- 添加参数类型判断
```js
function clone(source) {
     var target = Array.isArray(source) ? [] : {}
    let isObj = Object.prototype.toString.call(source) === '[object Object]'
    if(!isObj) return source
    for(var i in source) {
      if(source.hasOwnProperty(i)) {
        if(typeof source[i] === 'object') {
          target[i] = clone(source[i])
        }else{
          target[i] = source[i]
        }
      }
    }
    return target
  }

var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123
}
var b = clone(a);

a.name = "高级前端进阶";
a.book.price = "55";

b.name = 'nnnnnnn'
b.book.price = '99'
console.log(b);
```

### 改良 解决循环引用造成的栈溢出问题 使用Map数据结构
```js
function clonemap(source, map = new Map()) {
   let isObj = Object.prototype.toString.call(source) === '[object Object]'
   if(!isObj) return source
   let target = Array.isArray(source) ? []:{}
   if(map.get(source)) return map.get(source)
   map.set(source, target)
   for(const key in source) {
     target[key] = clonemap(source[key], map)
   }
   return target
 }
```
### 改良 使用WeakMap代替map
```js
function clone(target, map = new WeakMap()) {
    //内容同上
};
```
- WeakMap对象是一组键值对的集合，其中的键是弱引用的，其键必须是对象，值可以是任意的
- 弱引用：不能确保其引用的对象不会被垃圾回收器回收的引用，一个对象若是只被弱引用所引用，则被认为是不可访问的，并可能在任何时候被回收
- 创建一个对象`const obj ={}`就默认创建了一个强引用的对象，只有手动使`obj=null`，它才会被垃圾回收机制回收
- 使用map
```js
let obj = { name : 'ConardLi'}
const target = new Map();
target.set(obj,'code秘密花园');
obj = null;

// 虽然手动将obj释放，但是target对obj仍然存在强引用关系所以这部分内存还是没办法释放
```
- 使用WeakMap
```js
let obj = { name : 'ConardLi'}
const target = new WeakMap();
target.set(obj,'code秘密花园');
obj = null;
// 如果是WeakMap的话，target和obj存在的就是弱引用关系，
当下一次垃圾回收机制执行时，这块内存就会被释放掉。
```
### 改良 考虑function和null两种情况
```js
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}


function isObject(target) {
    const type = Object.prototype.toString.call(target)
    return target !== '[object Null]' && (type === 
'[object Object]'|| type === '[object Function]');
}

function clone(source) {
    if (!isObject(source)) return source;
    var target = Array.isArray(source) ? [] : {}

    for(var i in source) {
      if(source.hasOwnProperty(i)) {
        if(typeof source[i] === 'object') {
          target[i] = clone(source[i])
        }else{
          target[i] = source[i]
        }
      }
    }
    return target
}
```

## 问：事件流：网页元素接收事件的顺序
- [参考：JavaScript事件三部曲](https://zhuanlan.zhihu.com/p/73091706)
- [JavaScript三部曲](https://zhuanlan.zhihu.com/p/73778890)
- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

### 嵌套元素事件流-容器元素和嵌套元素
- 点击容器元素：父元素捕获-父元素冒泡
- 点击嵌套元素：父元素捕获-子元素捕获-子元素冒泡-父元素冒泡

### 常见的DOM事件
- DOM 0级事件，直接html元素上绑定，如onclick，同一个事件只能有一个事件处理程序，后面的会覆盖前面的
- DOM 2级事件，通过addEventListener注册事件，通过reoveEventListener删除事件，一个事件可以有多个事件处理程序，按顺序执行
- DOM 3级事件，增加了事件类型，如焦点事件，鼠标事件

### new构造一个函数new干了什么
- 创造一个新对象
- 将新对象的原型绑定到构造函数.prototype指向的对象
- 构造函数的this指向新对象
- 如果函数没有返回其他对象，则返回这个新对象


### new一个构造函数，如果函数分别返回{}、null、1、true会发生什么
- 如果函数返回一个对象，那么new这个函数调用返回这个函数的返回对象，否则返回new创建的新对象

### 手写一个new实现
```js
function create(){
	let obj = new Object() // 创建一个新对象
	let Gen = [].shift.call(arguments) // 取出构造函数
	obj.__proto__ = Gen.prototype // 新对象的原型指向构造函数的prototype
	Gen.apply(obj, arguments) // 将构造函数的this指向新对象
	return obj // 返回新对象
}



使用：
function Person(firstName, lastName){
	this.firstName = firstName
	this.lastName = lastName
}

let person1 = create(Person, 'jack','nancy')

```

解析：
- 用new Object() 的方式新建了一个对象obj
- 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
- 将 obj 的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性、
- 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
- 返回 obj

 
### symbol有什么用处
- 可以用来表示一个独一无二的变量，防止命名冲突
- 可以用来模拟私有变量，symbol不会被常规的方法遍历到（除Object.getOwnPropertySymbols外）
- 使用 Symbol 定义常量，这样就可以保证这一组常量的值都不相等
- 如果要读取到一个对象的 Symbol 属性，可以通过 Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 取到。
- Symbol.for()
	- 使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。
- Symbol.keyFor()
 	- Symbol.keyFor() 返回一个已登记的 Symbol 类型值的 key ，用来检测该字符串参数作为名称的 Symbol 值是否已被登记。
```js
let yellow1 = Symbol.for("Yellow");
Symbol.keyFor(yellow1);    // "Yellow"
```

## 了解this么
### 全局上下文中：
- 非严格模式，this指向全局对象（浏览器中是window，node中是global），严格模式下this指向undefined
### 函数上下文中：



