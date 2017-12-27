<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)"> « </a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="p in grouplist" :class="{'active': current == p.val}" :key="p.index"><a href="javascript:;"  @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> »</a></li>
    </ul>
  </nav>
</template>
 
<script >
  export default{
    data(){  
       return {
        current: this.currentPage,
        props:['getParent'], 
      }
    },
    props: {
      total: {
      // 数据总条数 
       type: Number,default: 0 
       },
      display: {
       // 每页显示条数
      type: Number,default: 25 
       },
      currentPage: {
      // 当前页码   
      type: Number,default: 1  
      },
      pagegroup: {
        // 分页条数
      type: Number,default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { 
        // 总页数
      return Math.ceil(this.total / this.display);
      },
      grouplist:
       function () { 
         // 获取分页页码
         var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;if (len <= this.pagegroup) {          while (len--) {
          temp.push({text: this.page - len, val: this.page - len});
        };       
        return temp;
        }while (len--) {
          temp.push(this.page - len);
        };
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {    
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }return list;
      }
    },
    methods: {
      setCurrent: function (idx) {if (this.current != idx && idx > 0 && idx < this.page + 1) {          this.current = idx;          this.$emit('pagechange', this.current);
        }
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
