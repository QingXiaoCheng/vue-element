# 获取url中的参数
- 指定参数名称，返回该参数的值，或者空字符串
- 不指定参数名称，返回全部的参数对象或者{}
- 如果存在多个同名参数，则返回数组
- 不支持URLSearchParams方法
```js
let url = 'http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key'

function getUrlParam(sUrl, sKey) {
    let params = sUrl.split('?')[1] 
    let paramsArr = params.split('&') 
    let newArr = [] 
    if(sKey) {
      console.log(sKey);
      paramsArr.forEach(item=>{ 
        if(item.split('=')[0] == sKey) {
          newArr.push(item.split('=')[1])
        }  
      }) 
      if(newArr.length == 0) { 
          console.log(newArr.length);
          return ''
        }else if(newArr.length == 1) {
          return newArr[0]
        }else {
          return newArr
        }
    }else{
      if(!params) return {}
      let newObj = {}
      paramsArr.forEach((item, index)=>{
        var tmp = item.split('=') 
        if(!newObj[tmp[0]]) {
          newObj[tmp[0]] = []
        }
        newObj[tmp[0]].push(tmp[1])
      })
      return newObj
    }
}

console.log(getUrlParam(url));
```

# 统计字符串中每个字符的出现频率
- 返回一个Object，key为统计字符，value为出现频率
- 不限制key的顺序
- 输入的字符串参数不会为空
- 忽略空白字符串
```js
function getNum(str){
  if(!str) return console.log('缺少必须参数');
  str = str.replace(/\s/g,'') 
  let obj = {}
   
  //  法1
  // for(let i = 0; i < str.length; i++) { 
  //   if(obj[str[i]]) {
  //     obj[str[i]]++
  //   }else{
  //     obj[str[i]] = 1
  //   }
  // } 
  // 法2
  let strarr = str.split('')
  strarr.forEach(item=>{
    if(obj[item]) {
      obj[item]++
    }else{
      obj[item] = 1
    }
  })
  return obj
} 
console.log(getNum('hello world'));
```
# 深层对象操作
输入：`namespace({a: {test: 1, b: 2}}, 'a.b.c.d')`
输出：`{a: {test: 1, b: {c: {d: {}}}}}`
```js
function namespace(oNamespace, sPackage) {
      const arr = sPackage.split('.');
      let obj = oNamespace;
      console.log(obj);
      for(let i = 0; i < arr.length; i++) {
        if(typeof obj[arr[i]] !== 'object') {
          obj[arr[i]] = {}
        } 
        obj = obj[arr[i]]
      }
      return oNamespace
}
namespace({a: {test: 1, b: 2}}, 'a.b.d')
console.log(namespace({a: {test: 1, b: 2}}, 'a.b.d'));
```

# 根据路径获取对应的值
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
 

# 数组随机打乱排序
```js
let arr = [1, 2, 3, 4]
let arr2 = ['a', 'd', 'i']
function  getSort(params) { 
  return params.sort(() => Math.random() > 0.5 ? -1 : 1)
}
console.log(getSort(arr));
console.log(getSort(arr2));
```

# 给你一个“A2B3”这样的字符串，输出“AABBB”

```js
// 首先写一个方法能重复num次str字符串
function rep(str, num) {
  let newS = ''
  for(let i = 0; i<num;i++) {
    newS+=str
  }
  return newS
}

// 实现上述功能
function getStr(str){
  let strA = str.split('') 
  let newStr = ''
  for(let i in str) {
    if(parseInt(str[i]) >= 0) {
      strA.splice(i, 1, rep(str[i-1], parseInt(str[i])))
      newStr = newStr + strA[i]
    }
  } 
  return newStr
}

console.log(getStr('A2B3'));
console.log(getStr('a4g5'));
console.log(getStr('s4d3'));
console.log(getStr('x2c2'));
```


# 写一个curry，要求 add(1)(2)(3)(4) 打印10
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

# 实现两个大数相加
- JS 在存放整数的时候是有一个安全范围的，一旦数字超过这个范围便会损失精度。
- 我们不能拿精度损失的数字进行运行，因为运算结果一样是会损失精度的。
```js
let a = "1111111111111111111111111";
let b = "1111111111111111";
function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   console.log(a,b);
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}
console.log(add(a, b));
```

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