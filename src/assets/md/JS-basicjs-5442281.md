# 箭头函数和普通函数的区别
## 1、语法更加简洁
## 2、箭头函数是匿名函数，不能作为构造函数，不能使用new
## 3、箭头函数不绑定arguments，取而代之用rest参数...解决
```js
function A(a){
  console.log(arguments);
}
A(1,2,3,4,5,8);  //  [1, 2, 3, 4, 5, 8, callee: ƒ, Symbol(Symbol.iterator): ƒ]


let B = (b)=>{
  console.log(arguments);
}
B(2,92,32,32);   // Uncaught ReferenceError: arguments is not defined


let C = (...c) => {
  console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]
```
## 4、箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
## 5、箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
## 6、箭头函数没有原型属性
## 7、箭头函数不能当做Generator函数,不能使用yield关键字

# 总结
- 箭头函数的 this 永远指向其上下文的this ，任何方法都改变不了其指向，如 call() ,  bind() ,  apply() 
- 普通函数的this指向调用它的那个对象

