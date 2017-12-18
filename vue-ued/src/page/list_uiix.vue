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
                    <a  v-for="(num,index) in projects" @click="iscur = index,worksAll(index)"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li style="margin-bottom:0">
                    <a  v-for="(num,index) in numsType" @click="iscur1 = index,worksAllType(index)"  :class="{active:iscur1==index}" :key="num.index" >{{num.titleTab }}</a>
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
                            <span class="sp3">{{story.shareTime}}</span>
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
import Pubuliu from '../utils/pubuliu_uiix.js'
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
          stories: [],
          projects:[
              {titleTab:'全部'},
              {titleTab:'房app'},
              {titleTab:'搜房帮'},
              {titleTab:'OA'},
              {titleTab:'工作台'},
              {titleTab:'其他资源'}
          ],
          numsType:[
              {titleTab:'全部'},
              {titleTab:'界面'},
              {titleTab:'插画'},
              {titleTab:'图标'},
              {titleTab:'引导页'}
          ],
          iscur:0 ,
          iscur1:0 ,
          typeIndex:0,
          typesIndex:0,
          index:0
        }
      }, 
      filters: {
        dataFilter: function (value) { 
            if (!value) return ''
            value = value.toString().substr(0,6);
            return value;
        }
  },
      methods: {
        getSubject () {
        this.$http.get(`api/?c=index&a=showAppList&from=index`)
       .then(res => {
                   this.stories = res.data.errmsg
                })
                .catch(e => {
                  console.log(e)
                })
        },
         // 项目切换展示
        worksAll (index) {
          this.typeIndex = index;
          this.$http.get(`api/?c=index&a=showAppList&type1=${this.typeIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.stories = res.data.errmsg;
            //   console.log(this.typeIndex)
            })
            .catch(e => {
                  console.log(e)
            });
        },
        // 类型切换展示
        worksAllType (index) {
          this.typesIndex = index;
          this.$http.get(`api/?c=index&a=showAppList&type1=${this.typeIndex}&type2=${this.typesIndex}&page=current&from=index&pagesize=25`)
          .then((res) => {
            this.stories = res.data.errmsg;
            //   console.log(res.data.errmsg)
            })
            .catch(e => {
                  console.log(e)
            });
        },
        }
}
</script>

