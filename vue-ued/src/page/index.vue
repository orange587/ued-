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
            <a href="" class="active">全部</a>
            <a href="">交互设计</a>
            <a href="">作品案例</a>
            <a href="">前端技术</a>
            <a href="">用户研究</a>
            <a href="">视觉设计</a>
            <a href="">资源推荐</a>
            <a href="">项目总结</a>
            <a href="">其他资源</a>
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
        <Page></Page>
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
        this.$http.get(`${this.$url}?c=index&a=showArticleList&type=&page=1&from=index&pagesize=15`)
                      .then(res => {
                          this.stories = res.data.errmsg
                            //  console.log(res)
                      })
                      .catch(e => {
                        console.log(e)
                    })
    },
 }
  }
</script>
