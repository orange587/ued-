<template>
<div class="bg_f4f4">
  <TopNav></TopNav>
     <!--主体 st-->
    <div class="fang_responsive">
    	<div class="crumb"><div class="crumb_con"><a href="http://ued.light.fang.com/">首页</a> ><span>正文</span></div></div>
        <div class="xq-share">
        	<div class="leftBox">
            	<div class="titBox">
                	<h1>{{ longComments.title }}</h1>
                    <p class="time">{{ longComments.createTime | formatDate }}</p>
                </div>
                <div class="conBox" v-for="item in longComments.content" :key="item.index">
                  <img :src="item.id" alt="" v-lazy="item.id">
                </div>
                <div class="vote">
                	<a class="vote-icon"  @click="flag && submitAgree(longComments.id)"  :class="{cur:agreeS}"></a>
                    <p >喜欢({{ likeNum }})</p>
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
import { formatDate } from '../utils/date.js'

export default {
  name:'detail_share',
  components:{
    TopNav,TopFan
  },
   created(){
          this.getStory(this.$route.params.id);
   },
  data () {
        return {
        story: {},
        comment:{},
        longComments: [],
        agreeS:false,
        likeNum:0,
        flag:true
        }
      },
      filters: {
       formatDate(time) {
            var date = new Date(time*1000);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }

       },

      methods:{  
     // 获取文章
    getStory(storyId) {
      this.$http.get(`/?c=index&a=getoneArticleInfo&from=index&id=${storyId}&r=`+ Math.random())
                .then(res => {
                  this.longComments = res.data.errmsg,
                  // console.log(this.res.data.errmsg)
                   this.likeNum = this.longComments.like
                })
                .catch(e => {
                  console.log(e)
                })
    },
    //点赞
   submitAgree(storyId){
       if(!this.agreeS){
          this.agreeS = true;
          this.likeNum++;
          let numlike = this.likeNum;
          // this.$http.post(`http://localhost:8080//?c=index&a=addLikeInfo`,
          //     {
          //         params:{
          //         like:numlike,
          //         id:storyId
          //         }
          //     }).then(res => {
          //        console.log(res.data)
          //       })
          //       .catch(e => {
          //         console.log(e)
          //       })
          $.ajax({
            type:'post',
            url:`http://ued.light.fang.com/?c=index&a=addLikeInfo`,
            data:{
                  like:numlike,
                  id:storyId
                  },
            success: function(data) {
              console.log(data)
            }      
          }
          )
       }
       else{
         this.agreeS = false;
         alert('您已经点过赞了！！');
          this.flag = false; 
          this.agreeS = true;
       };
       
     }
    }
     
        }
</script>

