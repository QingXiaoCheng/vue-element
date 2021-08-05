# 了解数组有哪些方法
## 1、修改器方法：会修改数组对象自身的方法
- push、pop、shift、unshift、splice、sort、reverse
### 1.1 栈方法 后入先出 push、pop
1. push(). 向数组的末尾添加新内容

- 参数：要添加的项。传递多个用逗号隔开，任何数据类型都可以

- 返回值：新增后数组的长度

- 是否改变原数组：改变

```js
let ary = [12,34,26];
let add = ary1.push(100); 
console.log(add). //  4  返回一个新的长度 
console.log(ary). // [12, 34, 26, 100] 改变原数组
```

2. pop(). 删除数组的最后一项

- 参数：无

- 返回值：被删除的项

- 是否改变原数组：改变

```js
let ary = [108,112,39,10];
let del = ary.pop();  
console.log(del)  // 10   返回被删除的项
console.log(ary2);  //[108, 112, 39] 改变原数组
```

### 1.2 队列方法：先入先出 unshift、shift
1. shift(). 删除数组的第一项
- 参数：无
- 返回值：被删除的项
- 是否改变原数组：改变
```js
let ary = [0,108,112,39];
let del = ary.shift();    
console.log(del).     // 0 返回被删除的项
console.log(ary)     //[108, 112, 39]
```
2. unshift() 向数组首位添加新内容

- 参数：要添加的项，多项用','隔开

- 返回值：新数组的长度

- 是否改变原数组：改变

```js
let ary = ['c','d'];
let add = ary.unshift('a','b')
console.log(add).   // 4 返回新数组的长度
console.log(ary)     //["a", "b", "c", "d"]
```
### 1.3 增加和删除方法：splice
- 1. splice()  对数组进行增删改

增加：ary.splice(n,0,m)从索引n开始删除0项，把m或者更多的内容插入到索引n的前面

返回空数组

修改：ary.splice(n,x,m)从索引n开始删除x个，m替换删除的部分

把原有内容删除掉，然后用新内容替换掉

删除：ary.splice(n,m) 从索引n开始删除m个内容

（如果第二个参数省略，则从n删除到末尾）

返回删除的新数组，原有数组改变
```js
//增加
let ary6_z = [33,44,55,66,77,88];
ary6_z.splice(2,0,'a','b')
console.log(ary6_z);// [33, 44, "a", "b", 55, 66, 77, 88]
//修改
let ary6_x = [33,44,55,66,77,88];
ary6_x.splice(1,2,'x','y')
console.log(ary6_x);// [33, "x", "y", 66, 77, 88]
//删除
let ary6_s = [33,44,55,66,77,88];
//console.log(ary6.splice(3,2))//[66, 77]
console.log(ary6_s.splice(3));//[66, 77, 88]
```

### 1.4 排序方法：sort
1. sort()

对数组的元素进行排序（默认是从小到大来排序 并且是根据字符串来排序的）

参数：可选(函数) 规定排序规则 默认排序顺序为按字母升序

返回值：排序后新数组

是否改变原数组：改变

sort在不传递参数情况下，只能处理10以内（个位数）数字排序
```
let ary11 = [32,44,23,54,90,12,9]; 
ary11.sort((a,b)=>{ return a-b })
console.log(ary11);
```
### 1.5 反转方法：reverse
1. reverse()

把数组倒过来排列

参数：无

返回值：倒序后新数组

是否改变原数组：改变

```js
let ary12 = [6,8,10,12]; 
console.log(ary12.reverse());//[12, 10, 8, 6]
```

## 2. 访问方法，不会修改原数组的值，只会返回一个新的数组或者返回一个其它的期望值
- slice、concat、join、indexOf、lastIndexOf、includes
### 2.1 截取方法：slice
1. slice()  按照条件查找出其中的部分内容

参数：

array.slice(n, m)，从索引n开始查找到m处（不包含m）

array.slice(n) 第二个参数省略，则一直查找到末尾

array.slice(0)  原样输出内容，可以实现**数组克隆**

array.slice(-n,-m) slice支持负参数，从最后一项开始算起，-1为最后一项，-2为倒数第二项

返回值：返回一个新数组

是否改变原数组：不改变

```js
let arr = [9, 2, 4, 0, 1, 7, 33, 7]
let arr1 = arr.slice(0, 1)  // [9]
let arr2 = arr.slice(5)  //  [ 7, 33, 7]
let arr3 = arr.slice(0);  //[9, 2, 4, 0, 1, 7, 33, 7]
let arr4 = arr.slice(-3, -1)  // [7, 33]
console.log(arr1, arr2, arr3, arr4, arr);
```
### 2.2 连接方法：concat
1. concat()

用于连接两个或多个数组

参数：参数可以是具体的值，也可以是数组对象。可以是任意多个

返回值：返回连接后的新数组

是否改变原数组：不改变

```js
let ary11 = [32,44,23,54,90,12,9]; 
arr2= '好'
arr3= [0, '3', null]
let ament = ary11.concat(arr2, arr3)
console.log(ament);  // [9, 12, 23, 32, 44, 54, 90, "好", 0, "3", null]
```
### 2.3 转成字符串方法：join
1. join()

用指定的分隔符将数组每一项拼接为字符串

参数：指定的分隔符（如果省略该参数，则使用逗号作为分隔符）

返回值：拼接好的字符串

是否改变原数组：不改变

```js

let ary7 = [1,2,3];

console.log(ary7.join('、'));//1、2、3
```
### 2.4 是否包含某个值：indexOf、lastIndexOf、includes
1. indexOf()

检测当前值在数组中第一次出现的位置索引

参数：array.indexOf(item,start) item:查找的元素 start:字符串中开始检索的位置

返回值：第一次查到的索引，未找到返回-1

是否改变原数组：不改变

```

let ary9 = ['a','b','c','d','e','a','f'];   

console.log(ary9.indexOf('c'));//2

console.log(ary9.indexOf('a',3))//5
```

2. lastIndexOf()

检测当前值在数组中最后一次出现的位置索引

参数：array.lastIndexOf(item,start) item:查找的元素 start:字符串中开始检索的位置

返回值：第一次查到的索引，未找到返回-1

是否改变原数组：不改变

```js

let ary10 = ['a','b','c','d','e','a','f'];   

console.log(ary10.lastIndexOf('c'));//2

console.log(ary10.lastIndexOf('f',1))//-1
```
3. includes()

判断一个数组是否包含一个指定的值

参数：指定的内容

返回值：布尔值

是否改变原数组：不改变
```js

let ary13 = ['a','b','c','d']; 

console.log(ary13.includes('c'));//true

console.log(ary13.includes(2));//false
```
## 3. 迭代方法
1. forEach()

循环遍历数组每一项

参数：函数 ary.forEach(function(item,index,ary){}) item:每一项 index:索引 ary:当前数组

返回值：无

是否改变原数组：不改变

forEach中不能使用continue和break，forEach中不能跳出，只能跳过(return跳过)

```js
let ary14 = ['a','b','c','d']; 

let item = ary14.forEach(function(item,index,ary){

       console.log(item,index,ary);

  })
```
2. map 对数组每一项运行给定函数，返回每次函数调用返回结果组成的数组，映射
参数：item（当前每一项），index（索引值），arr（原数组）

返回值：返回与原数组长度一样的数组

是否改变原数组：不改变

```js
var data = [1, 2, 3, 4];

var arrayOfSquares = data.map(function (item) {
  return item * item;
});

console.log(arrayOfSquares); // 1, 4, 9, 16
```


3. filter 对数组中每一项运行给定函数，返回该函数会返回true的项组成的数组
- 参数：item、index、arr
- 返回值：返回该函数返回true的项组成的数组
- 不会改变原数组

4. reduce
reduce() 方法在每个数组元素上运行函数，以生成（减少它）单个值。

reduce() 方法在数组中从左到右工作。另请参阅 reduceRight()。

reduce() 方法不会减少原始数组。
```js
reduce(fn(total,item,index,array){ return ... },initValue)
1.fn返回的值会作为第一个参数传递给下一项
2.initValue做为归并基础的初始值
```

5. every 对数组中每一项运行给定函数，如果函数对每一项都返回true,则返回true
语法：` arr.every(fn(item,index,array){return ...},[this])`       
6. some 对数组中每一项运行给定函数，如果函数对任一项都返回true,则返回true
- 某一项为true结果返回true
语法：` arr.some(fn(item,index,array){return ...},[this])`  
 
7. find 返回满足条件的的第一个数组元素的值。
语法：` arr.find(fn(item,index,array){return ...},[this])`  
7. findIndex 返回满足条件的的第一个数组元素的索引。
语法：` arr.findIndex(fn(item,index,array){return ...},[this])`  
 