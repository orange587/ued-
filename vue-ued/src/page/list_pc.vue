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
            <!-- 瀑布流样式开始 -->
            <div class="waterfull clearfloat" id="waterfull">
                <ul>
                    <li class="item" v-for="story in PcLists" :key="story.id"> 
                      <a   class="a-img"   :href="story.locateLink">
                           <img :src="story.coverImg | imageUrlPrefix" />
                        </a>
                        <p class="description"><a  :href="story.locateLink">{{ story.title }}</a></p>
                        <div class="qianm clearfloat">
                            <span class="sp1">作者：{{story.author }}</span>
                            <span class="sp3">{{story.publishTime}}</span>
                        </div>
                     </li>
                </ul>
            </div>
            <!-- loading按钮自己通过样式调整 -->
            <div id="imloading" style="width:150px;height:30px;line-height:30px;font-size:16px;text-align:center;border-radius:3px;opacity:0.7;background:#000;margin:10px auto 30px;color:#fff;display:none">
                素材加载中.....
            </div>
           <!-- <vue-waterfall-easy :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData">
            </vue-waterfall-easy> -->
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
import JqueryMasonryMin from '../utils/jquery_masonry_min.js'
import JQeasing from '../utils/jQeasing.js'
import Pubuliu from '../utils/pubuliu_pc.js'
// import vueWaterfallEasy from '../components/vue-waterfall-easy'
export default {
  name:'list_pc',
  components:{
    TopNav,TopFan
  },
  created () {
        this.getList()
        // this.imgsArr = this.initImgsArr(0, 10),
        // this.fetchImgsArr = this.initImgsArr(10, 20) // 模拟每次请求的新的图片的数据数据
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
          }
        //   imgsArr: [],         //存放所有已加载图片的数组（即当前页面会加载的所有图片）
        //   fetchImgsArr: []     //存放每次滚动时下一批要加载的图片的数组
        }
      },
      methods: {
        //   瀑布流
        //   initImgsArr(n, m) { //num 图片数量
        //     var arr = []
        //     for (var i = n; i < m; i++) {
        //         arr.push({ src: `./static/img/${i + 1}.jpg`, link: 'https://www.baidu.com', info: '一些图片描述文字' })
        //     }
        //     return arr
        //     },
        //     fetchImgsData() {
        //     this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
        //     },
        getList () {
       this.$http.get(`api/?c=index&a=showPcList&from=index`).then((res) => {
               this.PcLists = res.data.errmsg;
            //   console.log(lists)
            })
             .catch(e => {
                  console.log(e)
                })
        },
<<<<<<< HEAD
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
=======
         // 年份切换展示
        worksAll (index) {
          let yearstime = [0,2016,2017,2018];
          this.yearIndex = yearstime[index];
          this.$http.get(`api/?c=index&a=showPcList&selYear=${this.yearIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.PcLists = res.data.errmsg;
            // console.log(res.data.errmsg)
            })
            .catch(e => {
                  console.log(e)
            });
        },
       // 部门切换展示
        worksAllDep (index) {
          let yearstime = [0,2016,2017,2018];
          this.yearIndex = yearstime[index];
          this.depIndex = index;
          this.$http.get(`api/?c=index&a=showPcList&selYear=${this.yearIndex}&ownGroup=${this.depIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.PcLists = res.data.errmsg;
            })
            .catch(e => {
                  console.log(e)
            });
        },
         // 色系切换展示
        worksAllColor (index) {
          let yearstime = [0,2016,2017,2018];
          this.yearIndex = yearstime[index];
          this.depIndex = index;
          this.colorIndex = index;
          this.$http.get(`api/?c=index&a=showPcList&selYear=${this.yearIndex}&ownGroup=${this.depIndex}&colorRange=${this.colorIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.PcLists = res.data.errmsg;
>>>>>>> d21a391b758d9a1c0a70d102dbada7b788a3f681
            })
             .catch(e => {
                  console.log(e)
                })
        }
        
        }
}
</script>
<style scoped>
      .item-move {
        transition: all .5s cubic-bezier(.55,0,.1,1);
        -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
      }
</style>

