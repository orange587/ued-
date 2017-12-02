<template>
<div class="bmBox">
  <TopNav></TopNav>
     <!--主体 st-->
    <!--全部作品st -->
        <div class="choice_wrap">
        <ul class="choice_xuan">
            <li>
                <a href="" class="active">全部</a><a href="">设计</a><a href="">制作</a>
            </li>
            <li style="margin-bottom:0">
                <a href="">全部</a><a href="" class="active">设计导航</a><a href="">设计资讯</a><a href="">设计素材</a><a href="">图片助手</a><a href="">页面配色</a><a href="">动效收集

</a><a href="">学习网站</a><a href="">字体</a><a href="">软件下载</a>
            </li>
        </ul>
        </div>
        <div class="fang_responsive">        
            <div class="listBox">
                <div class="tit">设计导航</div>
                <div class="con">
                    <div class="cBox">
                        <ul>
                            <li v-for="story in PcLists" :key="story.id"><i></i><a :href="story.link">{{story.title}}</a></li>
                        </ul>
                    </div>
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
export default {
  name:'list_site_navigation',
  components:{
    TopNav,TopFan
  },
  data () {
        return {
          PcLists: []
        }
      },
      mounted () {
        this.getList()
      },
      methods: {
        getList () {
       this.$http.get(`${this.$url}?c=index&a=showElseList&from=index`).then((res) => {
               this.PcLists = res.data.errmsg;
            //   console.log(lists)
            })
             .catch(e => {
                  console.log(e)
                })
        },
        }
}
</script>

