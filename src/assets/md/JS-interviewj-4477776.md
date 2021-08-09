# JS 面试题合集二
### 闭包是什么

### NaN是什么，用typeof输出什么
- NaN：not a number，表示非数字，`typeof NaN === 'number'`

### JS 隐式转换和显示转换

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

### 示例一
```js

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();


new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```
流程
- 1.首先，事件循环从宏任务(macrotask)队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务；当遇到任务源(task source)时，则会先分发任务到对应的任务队列中去。
- 2.然后我们看到首先定义了两个async函数，接着往下看，然后遇到了 console 语句，直接输出 script start。输出之后，script 任务继续往下执行，遇到 setTimeout，其作为一个宏任务源，则会先将其任务分发到对应的队列中
- 3.script 任务继续往下执行，执行了async1()函数，前面讲过async函数中在await之前的代码是立即执行的，所以会立即输出async1 start。
遇到了await时，会将await后面的表达式执行一遍，所以就紧接着输出async2，然后将await后面的代码也就是console.log(‘async1 end’)加入到microtask中的Promise队列中，接着跳出async1函数来执行后面的代码
- 4.script任务继续往下执行，遇到Promise实例。由于Promise中的函数是立即执行的，而后续的 .then 则会被分发到 microtask 的 Promise 队列中去。所以会先输出 promise1，然后执行 resolve，将 promise2 分配到对应队列
- 5.script任务继续往下执行，最后只有一句输出了 script end，至此，全局任务就执行完毕了。
根据上述，每次执行完一个宏任务之后，会去检查是否存在 Microtasks；如果有，则执行 Microtasks 直至清空 Microtask Queue。
因而在script任务执行完毕之后，开始查找清空微任务队列。此时，微任务中， Promise 队列有的两个任务async1 end和promise2，因此按先后顺序输出 async1 end，promise2。当所有的 Microtasks 执行完毕之后，表示第一轮的循环就结束了
- 6.第二轮循环依旧从宏任务队列开始。此时宏任务中只有一个 setTimeout，取出直接输出即可，至此整个流程结束
