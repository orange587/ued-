<template>
<div class="bg_white">
  <TopNav ></TopNav>
     <!--主体 st-->
    <div class="fang_responsive">
    	<div class="crumb bdb_spe"><div class="crumb_con"><a href="http://ued.light.fang.com/">首页</a> ><a href="http://ued.light.fang.com/#/list_pc">专题</a> ><span>正文</span></div></div>
        <div class="xq-share">
        	<div class="manbox">
            	<div class="titBox ">
                	  <h1>{{ longComments.title }} <a :href = "longComments.locateLink" class="fr gray6 f14" target="_blank">查看详情>></a></h1>
                    <p class="time"><span class="fl"><span>作者：{{ longComments.author }}</span><span>标签：{{ longComments.ownGroup }}</span><span class="bgnone">完成日期：{{ longComments.publishTime }}</span></span><span class="fr">{{ longComments.createTime | formatDate }}发布</span></p>
                </div>
                <div class="conBox fang_responsive" v-for="item in longComments.content" :key="item.index">
                  <img :src="item.id" alt=""  v-lazy="item.id">
                </div>
               
            </div>
        </div>
    </div>
    
    <!--主体 end-->
    <!--返回顶部 st-->
      <topFan></topFan>
    <!--返回顶部 end-->
  </div>
</template>

<script>
import TopNav from '../components/topnav.vue'
import TopFan from '../components/topFan.vue'
import { formatDate } from '../utils/date.js'
export default {
  name:'detail_share_special',
  components:{
    TopNav,TopFan
  },
  data () {
        return {
        story: {},
        comment:{},
        classA:'',
        longComments: []
        }
      },
       filters: {
      formatDate(time) {
            var date = new Date(time*1000);
            return formatDate(date, "yyyy年MM月dd日 hh:mm");
        }

       },
      created(){
          this.getStory(this.$route.params.id);
          this.$nextTick(function(){
            this.jiaClass3();
          })
      },
      
      methods:{  
     // 获取文章图片
      getStory(storyId) {
        this.$http.get(`/?c=index&from=index&a=showOnePcInfo&id=${storyId}&r=`+ Math.random())
                  .then(res => {
                    this.longComments = res.data.errmsg
                  })
                  .catch(e => {
                    console.log(e)
                  })
      },
       jiaClass3(){
           $('.nav_category a:nth-child(3)').addClass('router-link-exact-active');
      }
    },
   
}
</script>

<style scoped>
   .bdb_spe{border-bottom: 1px solid #f4f4f4}
   .xq-share .manbox .titBox {
    padding: 24px 0px 30px;
    border-bottom: 1px solid #f4f4f4;
   }
   .xq-share .manbox h1 {
    font-size: 30px;
    color: #333;
    line-height: 42px;
    font-weight: normal;
   }
   .xq-share .manbox .time {
    font-size: 14px;
    color: #999;
    line-height: 1;
    margin-top: 16px;
    overflow: hidden;
   }
   .xq-share .manbox span.fl span {
    background: url(../assets/images/gang_detax.png) no-repeat right center;padding-right: 20px;margin-right: 20px;
   }
   .xq-share .manbox span.fl span.bgnone {background: none}
   .xq-share .manbox .conBox {
    padding-top: 20px;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    }
    .xq-share .manbox .conBox img {
        max-width: 100%;
        margin-bottom: 30px;
    }
</style>



