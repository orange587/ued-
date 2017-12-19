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
        agreeS:false,
        likeNum:0,
        flag:true
        }
      },
      methods:{  
     // 获取文章
    getStory(storyId) {
      this.$http.get(`${this.$url}/?c=index&a=getoneArticleInfo&from=index&id=${storyId}`)
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
<<<<<<< HEAD
          // this.$http.post(`http://localhost:8080/api/?c=index&a=addLikeInfo`,
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
            url:`http://localhost:8080/api/?c=index&a=addLikeInfo`,
            data:{
=======
          // let param = new URLSearchParams();
          this.$http.post(`api/?c=index&a=addLikeInfo`,
              {
                  params:{
>>>>>>> d21a391b758d9a1c0a70d102dbada7b788a3f681
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
       };
       
     }
    }
     
        }
</script>

