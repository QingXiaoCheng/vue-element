import axios from "axios";
export default {
  getmenu(data) {
    return  axios.get("/mock/menu")
  }
}