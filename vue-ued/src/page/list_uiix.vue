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
                    <a  class="active"  @click="getAll()">全部</a><a @click="getApp()">房APP</a><a  @click="getSfb()">搜房帮</a><a  @click="getOa()">OA</a>
                </li>
                <li style="margin-bottom:0">
                    <a href=""  @click="getAll1()">全部</a><a  @click="getJm()" class="active">界面</a><a @click="getCh()">插画</a><a @click="getTb()">图标</a><a @click="getYdy()">引导页</a>
                </li>

            </ul>

        </div>
        <!--选择头 end-->
        <div class="content">
            <!-- 瀑布流样式开始 -->
            <div class="waterfull clearfloat" id="waterfull">
                <ul>
                    <li class="item" v-for="story in stories" :key="story.id">
                        <router-link   class="a-img"  :to="'/detail_share_uiix/'+ story.id" >
                           <img :src="story.coverImg | imageUrlPrefix" />
                        </router-link>
                        <p class="description"><router-link  :to="'/detail_share_uiix/'+ story.id">{{ story.title }}</router-link></p>
                        <div class="qianm clearfloat">
                            <span class="sp1">作者：{{story.author | dataFilter}}</span>
                            <span class="sp3">{{story.createTime}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- loading按钮自己通过样式调整 -->
            <div id="imloading" style="width:150px;height:30px;line-height:30px;font-size:16px;text-align:center;border-radius:3px;opacity:0.7;background:#000;margin:10px auto 30px;color:#fff;display:none">
                素材加载中.....
            </div>
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
import Pubuliu from '../utils/pubuliu.js'
import Index from '../utils/index'
export default {
  name:'list_uiix',
  components:{
    TopNav,TopFan
  },
  created () {
        this.getSubject()
  },
  data () {
        return {
          stories: []
        }
      }, 
      filters: {
        dataFilter: function (value) { 
            if (!value) return ''
            value = value.toString().substr(1,4);
            return value;
        }
  },
      methods: {
        getSubject () {
        this.$http.get(`${this.$url}?c=index&a=showAppList&from=index`)
       .then(res => {
                   this.stories = res.data.errmsg
                })
                .catch(e => {
                  console.log(e)
                })
        },
        }
}
</script>

<style>

</style>

