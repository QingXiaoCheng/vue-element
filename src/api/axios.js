import {get, post } from "./index.js";
export default {
  login(data){
    return post('/mock/login')
  },
  getmenu(data) {
    return get("/mock/menu")
  },
  getTableList(data) {
    return get('/mock/tablelist', data)
  },
  getArtical(data) {
    return get('/mock/look', data)
  }
}