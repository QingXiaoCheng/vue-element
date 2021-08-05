<template>
  <div class="page">
    <nav aria-label="Page navigation" style="text-align:center;">
        <ul class="pagination">
            <li @click="prePage" :class="pageNo<=1?'disabled':''">
                <a aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li :class="pageNo===index?'active':''" v-for="(index,i) in pages" :key="i" @click="curPage(index)">
                <a>{{index}}</a>
            </li>
            <li  :class="pageNo<=pageTotal?'':'disabled'" @click="nextPage">
                <a aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
  </div>
</template> 

<script>
export default{
    data(){
        return {
            pageTotal:21,
            pageNo:3,
        }
    },
    computed:{
        pages:function(){
            let ret
            let rest = [this.pageTotal-2,this.pageTotal-1,this.pageTotal]
            if(this.pageTotal<10){
                ret =  this.pageTotal;
            }
            if(this.pageNo<=5){
                ret = [1,2,3,4,5,'...',this.pageTotal]
            }else if(this.pageNo<=this.pageTotal-3){
                ret =[1,'...',this.pageNo-1,this.pageNo,this.pageNo+1,"...",...rest]
            }
            else{
                ret = [1,'...',...rest]
            }
            return ret
        }
    },
methods:{
        prePage(){
            if(this.pageNo>1){
                --this.pageNo
            }
        },
        curPage(i){
            if(i==='...')return
            this.pageNo = i
        },
        nextPage(){
            if(this.pageNo<this.pageTotal){
                ++this.pageNo
            }
        },
    }
}
</script>
<style scoped>
.page .pagination{
    display: flex;
    justify-content: center;
}
.page .pagination li{
    width: 5%;
    background:#fff;
    border: 1px solid #ccc;
    list-style-type: none;
}
.page .pagination li:first-of-type,
.page .pagination li:last-of-type{
    /* width:7%; */
}
.pagination .active{
    color: #409EFF;
    font-weight: 600;
}
.pagination .disabled{
    cursor: not-allowed;
    background: #fff;
    color: #aaa;
}
</style> 