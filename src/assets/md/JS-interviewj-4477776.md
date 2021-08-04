# JS 高频面试题2
### 闭包是什么

### NaN是什么，用typeof输出什么
- NaN：not a number，表示非数字，`typeof NaN === 'number'`

### JS 隐式转换和显示转换


js面试
https://juejin.cn/post/6844903816668643341

# react 面试题
## state和prop区别
state 和 props都是普通的JavaScript对象。尽管它们两者都具有影响渲染输出的信息，但它们在组件方面的功能不同。即

props 是一个从外部传进组件的参数，主要作为就是从父组件向子组件传递数据，它具有可读性和不变性，只能通过外部组件主动传入新的 props 来重新渲染子组件，否则子组件的 props 以及展现形式不会改变。
state 的主要作用是用于组件保存、控制以及修改自己的状态，它只能在 constructor 中初始化，它算是组件的私有属性，不可通过外部访问和修改，只能通过组件内部的 this.setState 来修改，修改 state 属性会导致组件的重新渲染。


## 如何创建refs
Refs 是使用 React.createRef() 方法创建的，并通过 ref 属性添加到 React 元素上。为了在整个组件中使用 refs ，只需将 ref 分配给构造函数中的实例属

## 什么时JSX
JSX即JavaScript XML。一种在React组件内部构建标签的类XML语法。JSX为react.js开发的一套语法糖，也是react.js的使用基础。React在不使用JSX的情况下一样可以工作，然而使用JSX可以提高组件的可读性，因此推荐使用JSX。

优点：

1.允许使用熟悉的语法来定义 HTML 元素树；

2.提供更加语义化且移动的标签；

3.程序结构更容易被直观化；

4.抽象了 React Element 的创建过程；

5.可以随时掌控 HTML 标签以及生成这些标签的代码；

6.是原生的 JavaScript。

## ReactJS的生命周期方法是什么？
componentWillMount： 在渲染之前执行，用于根组件中的应用程序级别配置。
componentDidMount： 仅在客户端的第一次渲染之后执行。 这是AJAX请求和DOM或状态更新应该发生的地方。此方法也用于与其他JavaScript框架以及任何延迟执行的函数(如 setTimeout 或 setInterval )进行集成，在这里使用它来更新状态，以便我们可以触发其他生命周期方法。
componentWillReceiveProps： 只要在另一个渲染被调用之前更新 props 就被调用。 当我们更新状态时，从 setNewNumber 触发它。
shouldComponentUpdate： 确定是否将更新组件。默认情况下，它返回true。如果您确定组件在状态或道具更新后不需要渲染，则可以返回false值。这是提高性能的好地方，因为如果组件收到新的道具，它可以防止重新渲染。
componentWillUpdate： 在由shouldComponentUpdate确认返回正值的优点和状态更改时，在重新渲染组件之前执行。
componentDidUpdate： 通常用于更新DOM以响应属性或状态更改。
componentWillUnmount： 它将用于取消任何传出的网络请求，或删除与该组件关联的所有事件侦听器。

## 使用React Hooks有什么优势？
hooks 是react 16.8 引入的特性，他允许你在不写class的情况下操作state 和react的其他特性。

hooks 只是多了一种写组件的方法，使编写一个组件更简单更方便，同时可以自定义hook把公共的逻辑提取出来，让逻辑在多个组件之间共享。

Hook 是什么
Hook 是什么？ Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。稍后我们将学习其他 Hook。

什么时候我会用 Hook？ 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

ReactHooks的优点无需复杂的DOM结构
简洁易懂


# react生命周期 旧版
## 初始化阶段
- getDefaultProps:获取实例的默认属性
- getInitialState:获取每个实例的初始化状态
- componentWillMount组件即将被装载、渲染到页面上
- render:组件在这里生成虚拟的DOM节点
- componentDidMount:组件真正在被装载之后
## 运行中状态
- componentWillReceiveProps:组件将要接收到属性的时候调用
- shouldComponentUpdate:组件接受到新属性或者新状态的时候可以返回false接收数据后不更新阻止render调用后面的函数不会被继续执行了
- componentWillUpdate:组件即将更新不能修改属性和状态
- render:组件重新描绘
- componentDidUpdate:组件已经更新
## 销毁阶段
- componentWillUnmount:组件即将销毁

## 新版：
- 使用getDerivedStateFromProps替换componentWillMount
- 使用getSnapshotBeforeUpdate替换componentWillUpdate
- 避免使用componentWillReceiveProps


## react Hook
1. 状态钩子 (useState): 用于定义组件的 State其到类定义中this.state的功能
const [flag, setFlag] = useState(true);
2. 生命周期钩子 (useEffect):
useEffect(callback, [source])接受两个参数

- callback: 钩子回调函数
- source: 设置触发条件仅当 source 发生改变时才会触发
- useEffect钩子在没有传入[source]参数时默认在每次 render 时都会优先调用上次保存的回调中返回的函数后再重新调用回调

- [source]参数不传时则每次都会优先调用上次保存的函数中返回的那个函数然后再调用外部那个函数
- [source]参数传[]时则外部的函数只会在初始化时调用一次返回的那个函数也只会最终在组件卸载时调用一次
  - componentDidMount: 传入[]时就只会在初始化时调用一次
```js
 const useMount = (fn) => useEffect(fn, [])
``` 
  - componentWillUnmount: 传入[]回调中的返回的函数也只会被最终执行一次
```js
const useUnmount = (fn) => useEffect(() => fn, [])
```
 
- [source]参数有值时则只会监听到数组中的值发生变化后才优先调用返回的那个函数再调用外部的函数。
 
```js
useEffect(() => {
	// 组件挂载后执行事件绑定
	console.log('on')
	addEventListener()
	
	// 组件 update 时会执行事件解绑
	return () => {
		console.log('off')
		removeEventListener()
	}
}, [source]);
 
```
3. useLayoutEffect
- useEffect属于异步执行并不会等待 DOM 真正渲染后执行而useLayoutEffect则会真正渲染后才触发
- 可以获取更新后的 state
  
4. 自定义钩子
```js
function useTitle(title) {
  useEffect(
    () => {
      document.title = title;
    });
}

// 使用:
function Home() {
	const title = '我是首页'
	useTitle(title)
	
	return (
		<div>{title}</div>
	)
}
 
```