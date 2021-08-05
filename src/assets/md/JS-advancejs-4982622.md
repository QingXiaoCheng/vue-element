# JS中call、apply和bind
## 1. apply
- 两个参数，第一个是this的指向，第二个是函数接受的参数，以数组的形式传入，当第一个参数为null、undefined时，默认指向window
- 使用apply改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
- 可用于求数组中最大值：
```js
var arr =[1, 10, 5, 8, 3]
console.log(Math.max.apply(null, arr)); // 10
```
## 2. call
- 第一个参数是this指向，后面传入的是一个参数列表，当一个参数为null或undefined时候，表示指向window
- call改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次
```js
var arr =[1, 10, 5, 8, 3]
console.log(Math.max.call(null, arr[0], arr[1],arr[2],arr[3],arr[4])); // 10
```
## 3. bind
- 第一个参数也是this的指向，后面传入的也是一个参数列表，但是参数列表可分多次传入，call则必须一次性传入所有参数
- bind改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
```js
var arr =[1, 10, 5, 8, 13]
var max = Math.max.bind(null, arr[0], arr[1],arr[2],arr[3])
console.log(max(arr[4]) //  13
```
## 4. apply\call\bind三者区别总结
- 三者都可以改变函数的this指向
- 三者第一个参数都是this指向，如果没有第一个参数或第一个参数为null/undefined，则默认指向全局window
- 三者都可以传参，但是apply是数组，call是参数列表，且apply和call是一次性传入参数，而bind可以分多次传入
- bind是返回绑定this之后的函数，便于稍后调用，apply和call是直接执行函数

## apply、call、bind的使用场景
### 1. 合并数组
```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
// 4

vegetables;
// ['parsnip', 'potato', 'celery', 'beetroot']
```
- 问题：一个函数能够接受的参数个数是有限制的。不同的引擎有不同的限制，JS核心限制在 65535，有些引擎会抛出异常，有些不抛出异常但丢失多余参数。因此`moreVegs`数组太大时不要使用这个方法来合并
- 解决办法：参数数组切块后循环传入
```js
function concatOfArray(arr1, arr2) {
    var QUANTUM = 32768;
    for (var i = 0, len = arr2.length; i < len; i += QUANTUM) {
        Array.prototype.push.apply(
            arr1, 
            arr2.slice(i, Math.min(i + QUANTUM, len) )
        );
    }
    return arr1;
}

// 验证代码
var arr1 = [-3, -2, -1];
var arr2 = [];
for(var i = 0; i < 1000000; i++) {
    arr2.push(i);
}

Array.prototype.push.apply(arr1, arr2);
// Uncaught RangeError: Maximum call stack size exceeded

concatOfArray(arr1, arr2);
// (1000003) [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...]
```

### 2. 获取数组中的最大值和最小值
```js
var numbers = [5, 458 , 120 , -215 ]; 
Math.max.apply(Math, numbers);   //458    
Math.max.call(Math, 5, 458 , 120 , -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```
### 3. 验证是否是数组
```js
function isArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]); // true
```
### 4. 类数组对象（Array-like Object）使用数组方法
- 类数组特性：
	- 具有：指向对象元素的数字索引下标和length属性
	- 不属于：数组对象具有的方法如：`push`、`shift`、`forEach`等
```js
var domNodes = document.getElementsByTagName("*");
domNodes.unshift("h1");
// TypeError: domNodes.unshift is not a function

var domNodeArrays = Array.prototype.slice.call(domNodes);
domNodeArrays.unshift("h1"); // 505 不同环境下数据不同
// (505) ["h1", html.gr__hujiang_com, head, meta, ...] 
```
## 类数组对象转数组的方法
- `Array.prototype.slice.call(domNodes)`
- `var arr = [].slice.call(arguments)；`
- `let arr = Array.from(arguments);`
- `let arr = [...arguments];`


## 数组去重的方法
1、set 与解构赋值去重
```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return [...new Set(arr)]
}

```

2、Array.from与set去重
```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return Array.from(new Set(arr))
}

```

3、使用filter
```js
var array=[1,2,3,2,2,4];

var newArray=array.filter((value,index,arr)=>{
     return arr.indexOf(value)==index

})
```