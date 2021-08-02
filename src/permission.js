import router from './router/index.js'
import store  from './store/index.js';


const whiteList = ['/login']  // 白名单
router.beforeEach((to, from , next) =>{
  let token = sessionStorage.getItem('token')
  if(token) {
    if(to.path === '/login') {
      next( { path: "/" } )
    }else{
      next()
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1) {  // 如果是白名单则直接进入
      next()
    }else{
      next('/login')
    } 
  }
})