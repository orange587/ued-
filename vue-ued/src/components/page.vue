<template>
  <div>
    <ul class="pagination" >
            <li v-show="current != 1" @click="current-- && goto(current)" ><a href="javascript:;" class="prev"></a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="javascript:;" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="javascript:;"  class="next"></a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Page',
  data () {
    return{
            current:1,
            showItem:5,
            allpage:13
          }
  },
  computed:{
     pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
  },
  methods:{
     goto:function(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
        }
  }
}
</script>


<style >
    .pagination {
      position: relative;
      clear: both;
      text-align: center;
      margin-bottom: 40px;
      }
      .pagination li{
        display: inline-block;
        margin:0 5px;
        vertical-align: top;
      }
      .pagination li a{
            width: 40px;
    height: 40px;
    line-height: 38px;
    margin: 0 3px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
        color: #999;
    border-radius: 4px;
        display: inline-block;
            background-color: #fff;
    border: 1px solid #E9E9E9;
      }
      .pagination li a.prev{    font-size: 23px;
    background: url(../assets/images/fenye_bg.png) no-repeat #ffffff; background-position: 13px 9px;}
      .pagination li a.next{    font-size: 23px;
    background: url(../assets/images/fenye_bg.png) no-repeat #ffffff; background-position: 13px -24px;}
   .pagination li a.prev:hover, .pagination li a.next:hover {
    background: url(../assets/images/fenye_bg.png) no-repeat #df3031;} 
.pagination li a.prev:hover { background-position: 13px -84px;} 
.pagination li a.next:hover { background-position: 13px -55px;} 
      .pagination li a:hover{
        font-weight: 400;
    color: #fff;
    background: #df3031;
    border: 1px solid #df3031;
    border-radius: 4px;
      }
      .pagination li.active a{
        font-weight: 400;
    color: #fff;
    background: #df3031;
    border: 1px solid #df3031;
    border-radius: 4px;
      }
</style>
