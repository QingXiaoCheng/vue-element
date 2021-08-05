# 了解 JS 常见的内存泄漏

## 内存泄漏：
1. 概念：对于持续运行的服务进程，必须及时释放不再用到的内存，否则内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。对于不再用到的内存，没有及时释放就叫做内存泄漏。
## 内存泄漏的识别方法
1. 浏览器方法：
- 打开开发者工具，选择Memory
- 在右侧的Select profiling type字段里面勾选timeline
- 点击左上角的录制按钮
- 在页面上进行各种操作，模拟用户的使用情况
- 一段时间后，点击左上角的stop按钮，面板上就会显示这段时间的内存占用情况
2. 命令行方法
- 使用Node提供的`process.memoryUsage`方法，判断内存泄漏，以`heapUsed`字段为准
```js
console.log(process.memoryUsage())

输出
{
    rss: 27709440, // 所有内存占用，包括指令区和堆栈
    heapTotal: 5685248, // 堆占用的内存，包括用到的和没用到的
    heapUsed: 3449392, // 用到的堆的部分
    external: 8772  // V8引擎内部的C++对象占用的内存
}
```

## WeakMap
ES6新出的两种数据结构：`WeakSet`和`WeakMap`，表示这是弱引用，他们对于值的引用都是不计入垃圾回收机制的。
```js
const wm = new WeakMap()
const element = document.getElementById('example')

wm.set(element, 'some infomation')
wm.get(element) // some infomation 
// 这时，WeakMap里面对element的引用就是弱引用，不会被记入垃圾回收机制
```
## 四种常见的内存泄漏
1. 意外的全局变量
- 未定义的变量会在全局对象创建一个新变量
```js
function foo(arg){
	bar = '123' // bar 挂在全局对象上的
}
```
- 由this创建的变量
```js
functiong foo(){
	this.bar = '333'
}

foo(). //foo调用自己，this指向了全局window
```
解决办法：（1）在JavaScript文件头部加上`use strict`，使用严格模式避免意外的全局变量，此时上例中this时undefined；（2）如果必须是要全局变量存储大量数据时，确保用完以后把它设置为null或者重新定义。

2. 被遗忘的计时器或回调函数
 解决办法：清除定时器


3. 脱离DOM的引用
如果把DOM存成字典（JSON键值对）或者数组，此时同样的DOM元素存在两个引用：一个在DOM树中，另一个在字典中，那么两个都要清除。

4. 闭包：匿名函数可以访问父级作用域的变量
解决办法：函数最后使可访问的变量设置为null
```js
function a(){
    let el = $("#el");
    let id = el.id;
    el.click(function(){
        alert(id)
    })
    // 清空dom,释放内存
    el = null;
}

```
