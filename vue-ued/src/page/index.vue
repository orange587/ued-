<template >
<div class="bg_f4f4">

  <TopNav></TopNav>
  <!--主体 st-->
  <!--轮播图开始-->
  <div class="lunbo clearfix">
    <el-carousel >
      <el-carousel-item v-for="item in list" :key="item.index">
        <a   :href="'/#/detail_share/'+ item.id"  target="_blank">
           <img :src="item.carousel"  v-lazy="item.carousel"/>
           </a> 
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--轮播图结束-->
   <!--全部作品st -->
    <div class="all_zuop">
        <div class="all_zuo_sx">
             <a  v-for="(num,index) in nums" @click="iscur = index,worksAll(index)"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
        </div>
        <div class="all_zuo_con fang_responsive">
            <ul  class="list_ul">
                <li v-for="story in stories" :key="story.index" >
                    <a   class="jiantu"  :href="'/#/detail_share/'+ story.id" target="_blank">
                        <img :src="story.coverImg.id"  v-lazy="story.coverImg.id"/>
                    </a>
                    <div class="bot_all_zuo_con">
                        <a :href="'/#/detail_share/'+ story.id" target="_blank" class="f14 gray3 desc">{{story.title}}</a>
                        <p class="author_mes"><span class="fl f12 gray6">作者：{{story.author}}</span><span class="fr f12 gray9" >{{story.like}}</span></p>
                    </div>
                </li>

            </ul>     
        </div>
        <!-- 分页 -->
        <Page :total="total" :current-page='current' @pagechange="pagechange"  :get-parent="typeIndex"></Page>
    </div>
    <!--返回顶部 st-->
      <topFan></topFan>
    <!--返回顶部 end-->
    <!--全部作品end -->
    <!--主体 end-->
   
      </div>
</template>
<script>
import TopNav from '../components/topnav.vue'
import topFan from '../components/topFan.vue'
import Page from '../components/page.vue'
import axios from 'axios'
export default {
    name:'index',
     components: { TopNav,Page,topFan },
     data () {
        return {
          list: [],
          stories: [],
          total: 0,// 记录总条数
          display: 25,   // 每页显示条数
          current: 1, // 当前的页数 
          nums:[
              {titleTab:'全部'},
              {titleTab:'交互设计'},
              {titleTab:'作品案例'},
              {titleTab:'前端技术'},
              {titleTab:'用户研究'},
              {titleTab:'视觉设计'},
              {titleTab:'资源推荐'},
              {titleTab:'项目总结'},
              {titleTab:'其他资源'},
          ],
          iscur:0 ,
          typeIndex:0,
          index:0,
           value2: 0,
           imgUrl:''
         }      
      },
    //    computed: {
    //   swiper() {
    //     return this.$refs.mySwiper.swiper
    //   }
    // },
      created () {
        this.getList(),
        this.getStories()
      },
      methods: {
        // 轮播图
        getList () {
        this.$http.get(`/?c=index&a=showCarousal&from=index&r=`+ Math.random())
        .then((res) => {
               this.list = res.data.errmsg;
                // console.log(this.list);
            })
            .catch(e => {
                  console.log(e)
                })
        },
        // 作品展示
        getStories(){
        this.$http.get(`/?c=index&a=showArticleList&type=&page=current&from=index&pagesize=${this.display}&r=`+ Math.random())
                      .then(res => {
                          this.stories = res.data.errmsg;
                          console.log(typeof(this.stories));
                            this.total = res.data.total;
                            // console.log(this.stories[2].coverImg.id);
                            // this.imgUrl = res.data.errmsg[2].coverImg;

                      })
                      .catch(e => {
                        console.log(e)
                    })
    },
    
    // 作品切换展示
     worksAll (index) {
          this.typeIndex = index;
          this.$http.get(`/?c=index&a=showArticleList&type=${this.typeIndex}&page=current&from=index&pagesize=${this.display}&r=`+ Math.random())
          .then((res) => {
            this.stories = res.data.errmsg;
            this.total = res.data.total;
            //   console.log(res.data.errmsg)
            })
            .catch(e => {
                  console.log(e)
            });
            
        },
        // 分页
      pagechange:function(currentPage){
         $('body,html').animate({
          scrollTop: $(".all_zuop").offset().top
        },
        10);
        this.current = currentPage;
        this.$http.get(`/?c=index&a=showArticleList&type=${this.typeIndex}&page=${this.current}&from=index&pagesize=${this.display}&r=`+ Math.random())
                      .then(res => {
                          this.stories = res.data.errmsg;
                          this.total = res.data.total;
                      })
                      .catch(e => {
                        console.log(e)
                    })
    },  
 }
  }
</script>
<style>
@media screen and (max-width: 1600px) {
.el-carousel__container {
    position: relative;
    height: 300px!important;
}
  }  
@media screen and (min-width: 1601px) {
.el-carousel__container {
    position: relative;
    height: 380px!important;
}
}

</style>


