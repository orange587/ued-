<template>
<div>
  <TopNav></TopNav>
     <!--主体 st-->
    <!--全部作品st -->
    <div class="all_zuop">
        <!--选择头 st-->
        <div class="choice_wrap">
            <ul class="choice_xuan">
                <li>
                    <a  v-for="(num,index) in years" @click="iscur = index,searchList(num.titleTab,'year')"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li>
                    <a  v-for="(num,index) in departs" @click="iscur1 = index,searchList(index,'depart')"  :class="{active:iscur1==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li class="sexi">
                    <a  v-for="(num,index) in colors" @click="iscur2 = index,searchList(index,'color')"  :class="{active:iscur2==index}" :key="num.index" >{{num.titleTab }}</a>

                </li>
            </ul>

        </div>
        <!--选择头 end-->
        <div class="content">
           <vue-waterfall-easy :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData">
               <template slot-scope="props">
                <p class="description"><a  :href="props.value.link">{{ props.value.title }}</a></p>
                <div class="qianm clearfloat">
                 <span class="sp1">作者：{{props.value.author }}</span>
                   <span class="sp3">{{props.value.publishTime}}</span>
                 </div>
              </template>
            </vue-waterfall-easy>
            
        </div>
    </div>
    <!--全部作品end -->
    <!--主体 end-->
    <!--返回顶部 st-->
      <topFan></topFan>
    <!--返回顶部 end-->
  </div>
</template>

<script>
import TopNav from '../components/topnav.vue'
import TopFan from '../components/topFan.vue'
import vueWaterfallEasy from '../components/vue-waterfall-easy.vue'
export default {
  name:'list_pc',
  components:{
    TopNav,TopFan,vueWaterfallEasy
  },
  created () {
        this.getList(),
        this.imgsArr = this.initImgsArr(0,10),
        this.fetchImgsArr = this.initImgsArr(10,20) // 模拟每次请求的新的图片的数据数据
  },
  data () {
        return {
          PcLists: [],
          years:[
              {titleTab:'全部'},
              {titleTab:'2016'},
              {titleTab:'2017'},
              {titleTab:'2018'}
          ],
          departs:[
               {titleTab:'全部'},
              {titleTab:'新房DL'},
              {titleTab:'新房AI'},
              {titleTab:'平台运营'},
              {titleTab:'二媒'},
              {titleTab:'二电'},
              {titleTab:'市场部'},
              {titleTab:'其它部门'}
          ],
          colors:[
               {titleTab:'全部'},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
          ],
          iscur:0 ,
          iscur1:0 ,
          iscur2:0 ,
          typeIndex:0,
          typesIndex:0,
          index:0,
          searchData:{
              selYear:'',
              ownGroup:'',
              colorRange:'',
          },
          results:[],
          imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
          fetchImgsArr: []     //存放每次滚动时下一批要加载的图片的数组
        }
      },

      methods: {         
         getList () {
          this.$http.get(`api/?c=index&a=showPcList&from=index`).then((res) => {
               this.PcLists = res.data.errmsg;
            })
             .catch(e => {
                  console.log(e)
                })
        },
         //   pubuliu
          initImgsArr(n,m) { //num 图片数量
          let arr = [];
          $.ajax({
            type:'get',
            url:`api/?c=index&a=showPcList&from=index&pagesize=20`,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
             async: false,
            success: function(data) {
              this.PcLists = data.errmsg;
                for (let i = n; i < m; i++) {
                    arr.push({ 
                    src: 'https://images.weserv.nl/?url='+ this.PcLists[i].coverImg.substr(7),
                    author: this.PcLists[i].author, 
                    title: this.PcLists[i].title,
                    publishTime:this.PcLists[i].publishTime
                    }) 
                };
            }      
          });
          console.log(arr)
            return arr ;
            },
            fetchImgsData() {
            this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
            },
         // 筛选函数
        searchList(obj,type){
             let that = this;
             switch(type){
                case 'year':
                this.searchData.selYear = obj;
                break;
                case 'depart':
                this.searchData.ownGroup = obj;
                break;
                case 'color':
                this.searchData.colorRange = obj;
                break;
             }

             this.$http.get(`api/?c=index&a=showPcList&from=index`,{
                 params:that.searchData
             }).then((res) => {
               that.PcLists = res.data.errmsg;
            //   console.log(lists)
            })
             .catch(e => {
                  console.log(e)
                })
        }
        
        }
       
          }
</script>


