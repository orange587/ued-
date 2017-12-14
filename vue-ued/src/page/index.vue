<template >
<div>
  <TopNav></TopNav>
  <!--主体 st-->
  <!--轮播图开始-->
  <div class="lunbo clearfix">
    <div id="owl-demo" class="owl-carousel">
      <router-link v-for="item in list" :key="item.id" :to="'/detail_share/'+ item.id">
          <img :src="item.carousel | imageUrlPrefix" alt="" title="" />
      </router-link>   
    </div>
  </div>
  <!--轮播图结束-->
   <!--全部作品st -->
    <div class="all_zuop">
        <div class="all_zuo_sx">
             <a  v-for="(num,index) in nums" @click="iscur = index,worksAll(index)"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
        </div>
        <div class="all_zuo_con fang_responsive">
            <ul  class="list_ul">
                <li v-for="story in stories" :key="story.id">
                    <router-link   class="jiantu"  :to="'/detail_share/'+ story.id">
                        <img :src="story.coverImg | imageUrlPrefix" />
                    </router-link>
                    <div class="bot_all_zuo_con">
                        <a href="" class="f14 gray3 desc">{{story.title}}</a>
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
import top_hui from '../utils/top_hui'
import owl_carousel from '../utils/owl_carousel'
import index from '../utils/index'

export default {
    name:'index',
     components: { TopNav,Page,topFan },
     created () {
        this.getList(),
        this.getStories()
      },
     data () {
        return {
          list: [],
          stories: [],
          total: 200,// 记录总条数
          display: 15,   // 每页显示条数
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
          index:0
        }
      },
      
      methods: {
        // 轮播图
        getList () {
        this.$http.get(`${this.$url}?c=index&a=showCarousal&from=index`)
        .then((res) => {
               this.list = res.data.errmsg;
            //    console.log(res)
            })
            .catch(e => {
                  console.log(e)
                })
        },
        // 作品展示
        getStories(){
        this.$http.get(`${this.$url}?c=index&a=showArticleList&type=&page=current&from=index&pagesize=25`)
                      .then(res => {
                          this.stories = res.data.errmsg;
                        //   console.log(res.data.errmsg)
                      })
                      .catch(e => {
                        console.log(e)
                    })
    },
    
    // 作品切换展示
     worksAll (index) {
          this.typeIndex = index;
          this.$http.get(`${this.$url}?c=index&a=showArticleList&type=${this.typeIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.stories = res.data.errmsg;
            //   console.log(res.data.errmsg)
            })
            .catch(e => {
                  console.log(e)
            });
            
        },
        // 分页
      pagechange:function(currentPage){
        this.current = currentPage;
        this.$http.get(`${this.$url}?c=index&a=showArticleList&type=${this.typeIndex}&page=${this.current}&from=index&pagesize=25`)
                      .then(res => {
                          this.stories = res.data.errmsg;
                      })
                      .catch(e => {
                        console.log(e)
                    })
    },
    
 }
 
  }
</script>
