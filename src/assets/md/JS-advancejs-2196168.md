# 了解ES6的proxy
- 概念：proxy可以称为一个代理器，可以在访问对象之间增加了一层拦截，任何对对象的访问行为都会通过这层拦截。在拦截中，我们可以增加自定义的行为。
- 语法：`let proxy = new Proxy(target, handler)`
   - target:要包装的对象，可以是任何东西包括函数
   - handler：代理配置，是一个带有拦截操作的方法的对象
     - 比如get 捕捉器用于读取 target 的属性
     - set 捕捉器用于写入 target 的属性 
- 使用示例
```js
//我们用 get 来实现一个对象的默认值。
//我们将创建一个对不存在的数组项返回 0 的数组。
//通常，当人们尝试获取不存在的数组项时，他们会得到 undefined，
//但是我们在这将常规数组包装到代理（proxy）中，以捕获读取操作，并在没有要读取的属性的时返回 0

// 定义目标数组
let numbers = [0, 1, 2];

// 定义配置对象
let handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 0
  }
}
// 生成Proxy实例
let numbersProxy = new Proxy(numbers, handler)

// 执行结果
console.log(numbersProxy[1]); // 1
console.log(numbersProxy[123]); // 0（没有这个数组项）
```
## 注意事项：必须通过代理实例访问
如果需要配置对象的拦截行为生效，那么必须是对代理实例的属性进行访问，而不是直接对目标对象进行访问。

## Proxy实例函数及其基本使用
Proxy handle方法
1. get(target, key, receiver)：拦截 target 属性的读取
2. set(target, key, value, receiver)：拦截 target 属性的设置
3. has(target, key)：拦截 key in proxy 的操作，并返回是否存在（boolean值）
4. deleteProperty(target, key)：拦截 delete proxy[key]的操作，并返回结果（boolean值）
5. ownKeys(target)：拦截Object.getOwnPropertyName(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for ... in循环。并返回目标对象所有自身属性的属性名数组。注意：Object.keys()的返回结果数组中只包含目标对象自身的可遍历属性
6. getOwnPropertyDescriptor(target, key)：拦截 Object.getOwnPropertyDescriptor(proxy, key)，返回属性的描述对象
7. defineProperty(target, key, desc)：拦截Object.defineProperty(proxy, key, desc)、Object.defineProperties(proxy, descs)，返回一个 boolean 值
8. preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个 boolean 值
9. getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
10. isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个 boolean 值
11. setPrototypeOf(target, key)：拦截Object.setPrototypeOf(proxy, key)，返回一个 boolean 值。如果目标对象是函数，则还有两种额外操作可以被拦截
12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

## proxy 使用场景
## 读取不存在属性
- 通常，尝试读取不存在的属性会返回 undefined。
- 创建一个代理，在尝试读取不存在的属性时，该代理抛出一个错误。
- 这可以帮助及早发现编程错误。
```js
let user = {
  name: "xx"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop) {
      if (prop in target) {
        return target[prop]
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

console.log(user.name); // xx
console.log(user.age); // ReferenceError: Property doesn't exist: "age"
```

读取负索引的值
数组的索引值时从0开始依次递增的，正常情况下我们无法读取负索引的值，但是通过Proxy的get()函数可以做到这一点。
```js
let arr = [1, 2, 3, 4, 5]
arr = new Proxy(arr, {
  get(target, index) {
    if (index > 0) {
      return target[index]
    } else {
      return target[+index + target.length]
    }
  }
})
console.log(arr[1]) // 2
console.log(arr[2]) // 3
console.log(arr[-1]) // 5
console.log(arr[-2]) // 4  
```

### 禁止访问私有属性
在一些约定熟成的写法中，私有属性都会以下划线(_)开头，事实上，我们并不希望用户能访问到私有属性。
我们将需要以下捕捉器：
get 读取此类属性时抛出错误
set 写入属性时抛出错误
deleteProperty 删除属性时抛出错误
has 在使用 in 方法时排除以 _ 开头的属性
ownKeys 在使用 for..in 和像 Object.keys 这样的的方法时排除以 _ 开头的属性
 
```js
let user = {
  name: "xx",
  _age: "18"
};

user = new Proxy(user, {
  get(target, prop) { // 拦截属性读取
    if (prop.startsWith('_')) {
      throw new Error("Access denied")
    } else {
      return target[prop]
    }
  },
  set(target, prop, val) { // 拦截属性写入
    if (prop.startsWith('_')) {
      throw new Error("Access denied")
    } else {
      target[prop] = val
      return true
    }
  },
  deleteProperty(target, prop) { // 拦截属性删除
    if (prop.startsWith('_')) {
      throw new Error("Access denied")
    } else {
      delete target[prop]
      return true
    }
  },
  has(target, prop) {
    if (prop.startsWith('_')) { // 拦截 in 操作
      throw new Error("Access denied");
    } else {
      return prop in target
    }
  },
  ownKeys(target) { // 拦截读取属性列表
    return Object.keys(target).filter(key => !key.startsWith('_'))
  }
});

// "get" 不允许读取 _age
try {
  user._age // Error: Access denied
} catch(e) { console.log(e.message) }

// "set" 不允许写入 _age
try {
  user._age = "20" // Error: Access denied
} catch(e) { console.log(e.message) }

// "deleteProperty" 不允许删除 _age
try {
  delete user._age // Error: Access denied
} catch(e) { console.log(e.message) }

// "has" 将 _age 过滤出去
  try {
    '_age' in user
  } catch (e) { console.log( e.message ) }
  
// "ownKeys" 将 _age 过滤出去
for(let key in user) console.log(key) // name

```
### Proxy访问属性的限制
当我们期望使用Proxy对对象的属性进行代理，并修改属性的返回值时，我们需要这个属性不能同时为不可配置和不可写。如果这个属性同时为不可配置和不可写，那么在通过代理读取属性时，会抛出异常。

```js
let target = Object.defineProperties({}, {
  // 可配置的name
  name: {
    value: 'xx',
    configurable: true,
    writable: false
  },

  // 不可配置的age
  age: {
    value: 18,
    configurable: false,
    writable: false
  }
})

target = new Proxy(target, {
  get(target, prop) {
    return 'abc'
  }
})

console.log(target.name) // abc
console.log(target.age) // Uncaught TypeError: 'get' on proxy: property 'age' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '18' but got 'abc')
```
### 拦截属性赋值操作
定义一个person对象，包含一个age属性，取值在0~100之间，只要设置的值不在区间内，就会抛出异常。
```js
let user = {
  name: 'xx',
  age: 18
}

user = new Proxy(user, {
  set(target, prop, number) {
    if (prop === 'age' && number > 100 || number < 0) {
      throw new Error("The age is invalid")
    }
    target[prop] = number
  }
})

user.name = 'yy'
console.log(user.name) // yy
user.age = 20
console.log(user.age) // 20
user.age = 200
console.log(user.age) // Uncaught Error: The age is invalid

```
### 函数的拦截
Proxy中提供了apply()函数，用于拦截函数调用的操作，函数调用包括直接调用、call()函数调用、apply()函数调用3种方式。

通过对函数调用的拦截，可以加入自定义操作，从而得到新的函数处理结果。
```js
function sum (num1, num2) {
  return num1 + num2
}

sum = new Proxy(sum, {
  apply(target, obj, args) {
    return target.apply(obj, args) * 2
  }
})

console.log( sum(1, 2) ) // 6
console.log( sum.call(null, 1, 2) ) // 6
console.log( sum.apply(null, [1, 2]) ) // 6


```

# 手写代码题
实现一个函数toSafeObject(obj)，实现以下功能
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