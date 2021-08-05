# 六种数组判断方法
## isArray  ES5新增数组方法，判断数组是不是数组。
```js
let arr = [1, 2, 3];

console.log(Array.isArray(arr))      // true
```
## instanceof运算符，主要是判断某个实例（arr）是否属于某个对象。
```js
let arr = [1, 2, 3];

console.log(arr instanceof Array); //true
```
## constructor. 判断实例（arr）的构造函数是否等于某个对象。
```js
let arr = [1,2,3];

console.log(arr.constructor == Array); //true
```
## Object.getPrototypeOf()方法返回指定对象的原型，然后和Array的原型对比。
```js
let arr = [1,2,3];

console.log(Object.getPrototypeOf(arr) == Array.prototype); //true
```
## Array原型链上的isPrototypeOf
- Array.prototype表示Array的构造函数的原型；
- isPrototypeOf()方法可以判断一个对象是否存在于另一个对象的原型链上。
```js
let arr = [1,2,3]

console.log(Array.prototype.isPrototypeOf(arr)); //true
```
## Object.prototype.toString.call(). 把对象转化成字符串和一个已知的对象进行对比。（建议使用）
```js
let arr = [1,2,3];
console.log(Object.prototype.toString.cal(arr) == '[object Array]'); //true
```


## 手写:reduce 实现 map
```js
/**
 * 用数组的reduce方法实现数组的map
 */
Array.prototype.Mmap = function (fn, thisArg) {
  const result = [];
  this.reduce((prev, curr, index, array) => {
    result[index] = fn.call(thisArg, array[index], index, array);
  }, 0);
  return result;
};
```