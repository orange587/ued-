<template>
<div>
  <TopNav></TopNav>
     <!--主体 st-->
    <div class="fang_responsive">
    	<BreadCrumb /></BreadCrumb>
        <div class="xq-share">
        	<div class="leftBox">
            	<div class="titBox">
                	<h1>{{ longComments.title }}</h1>
                    <p class="time">{{ longComments.createTime }}</p>
                </div>
                <div class="conBox" v-for="item in longComments.content" :key="item.index">
                  <img :src="item | imageUrlPrefix" alt="">
                </div>
                <div class="vote">
                	<a class="vote-icon"  @click="submitAgree()"  :class="{cur:agreeS}"></a>
                    <p >喜欢({{ longComments.like }})</p>
                </div>
            </div>
            <div class="rightBox">
            	<dl>
                	  <dt>作者：{{ longComments.author }}</dt>
                    <dd>分享日期：{{ longComments.shareTime }}</dd>
                    <dd>标签：{{ longComments.type }}</dd>
                </dl>
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
import BreadCrumb from '../components/breadcrumb.vue'
import top_hui from '../utils/top_hui'
export default {
  name:'detail_share',
  components:{
    TopNav,TopFan,BreadCrumb
  },
   created(){
          this.getStory(this.$route.params.id);
   },
  data () {
        return {
        story: {},
        comment:{},
        longComments: [],
        agreeS:false
        }
      },
      methods:{  
     // 获取文章
    getStory(storyId) {
      this.zanStoryId = this.storyId;
      this.$http.get(`${this.$url}?c=index&a=getoneArticleInfo&from=index&id=${storyId}`)
                .then(res => {
                  this.longComments = res.data.errmsg,
                  console.log(this.res.data.errmsg)
                })
                .catch(e => {
                  console.log(e)
                })
    },
    //点赞
   submitAgree(){
     const agree = this.like;
     this.$store.dispatch("agree",this.$store.state.storydetail.id)
       if(!this.agreeS){
          this.agreeS = true;
          this.agree++;
       }
       else{
         this.agreeS = false;
           this.agree--;
       }
      
     }
    },
    
     
        }
</script>

