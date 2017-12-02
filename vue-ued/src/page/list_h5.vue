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
                    <a href="" class="active">全部</a><a href="">2017</a><a href="">2016</a><a href="">2015</a><a href="">2014</a><a href="">2013</a><a href="">2012</a><a href="">2011</a>
                </li>
                <li>
                    <a href="">全部</a><a href="" class="active">新房DL</a><a href="">新房AI</a><a href="">平台运营</a><a href="">二媒</a><a href="">电商</a><a href="">市场部</a>
                </li>
                <li class="sexi">
                    <a href="" class="all_color">全部</a>
                    <a href="" class="sexi01 active"></a>
                    <a href="" class="sexi02"></a>
                    <a href="" class="sexi03"></a>
                    <a href="" class="sexi04"></a>
                    <a href="" class="sexi05"></a>
                    <a href="" class="sexi06"></a>
                    <a href="" class="sexi07"></a>
                    <a href="" class="sexi08"></a>
                    <a href="" class="sexi09"></a>
                    <a href="" class="sexi10"></a>
                    <a href="" class="sexi11"></a>
                </li>
            </ul>

        </div>
        <!--选择头 end-->
        <div class="content">
            <!-- 瀑布流样式开始 -->
            <div class="waterfull clearfloat" id="waterfull">
                <ul>
                    <li class="item" v-for="item in PcLists" :key="item.id">
                        <a href="javascript:;" class="a-img">
                            <img :src="item.coverImg | imageUrlPrefix" alt="">
                        </a>
                        <p class="description"><a href="javascript:;">{{ item.title }}</a></p>
                        <div class="qianm clearfloat">
                            <span class="sp1">作者：{{item.author | dataFilter }}</span>
                            <span class="sp3">{{item.createTime}}</span>
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
        <!--弹窗 st-->
    <div class="mask" style="display: none;"></div>
    <div class="popDetail pop1" v-for="item in tuLists" :key="item.id" >
        <div class="leftcolumn">
            <div class="picMain">
                <div class="body">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"  v-for="item in tuLists.content" :key="item.index">
                                <img :src="item | imageUrlPrefix" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="op">
                    <a href="javascript:void(0);" class="ac_turn t_l ">上一页</a>
                    <a href="javascript:void(0);" class="ac_turn t_r">下一页</a>
                    <span class="red" style="display:none;position:absolute;bottom:18px;right:-20px;">+1</span>
                </div>
            </div>
        </div>
        <div class="rightcolumn">
            <p class="h2">{{item.title}}</p>
            <p class="h3">
                <span class="time">{{item.createTime}}</span>
                <span>作者：{{item.author}}</span>
            </p>
            <div class="ewm-box clearfix">
                <img :src="item.qr_code | imageUrlPrefix" alt="" class="ewm">
                <p class="title-ewm"><i></i>扫一扫，手机欣赏</p>
            </div>
        </div>
        <a href="javascript:void(0);" class="pop-close"></a>
    </div>
    <div class="pin-view-arrows">
        <a style="visibility: visible; position: fixed; right: 0px;" class="next x layer-view" href=""></a>
        <a style="visibility: visible; position: fixed; left: 0px;" class="prev x layer-view" href=""></a>
    </div>

    <!--弹窗 end-->
    <!--返回顶部 st-->
      <topFan></topFan>
    <!--返回顶部 end-->
  </div>
</template>

<script>
import TopNav from '../components/topnav.vue'
import TopFan from '../components/topFan.vue'
// import JqueryMasonryMin from '../utils/jquery_masonry_min.js'
// import JQeasing from '../utils/jQeasing.js'
// import Pubuliu from '../utils/pubuliu.js'
import Index from '../utils/index'
import swiper_min from '../utils/swiper_min'
import h5_pop from '../utils/h5_pop'
export default {
  name:'list_h5',
  components:{
    TopNav,TopFan
  },
  created() {
    this.getList(this.$route.params.id)
  },
  data () {
        return {
          PcLists: [],
          tuLists:[],
          loading: true,
        }
      },
      mounted () {
        this.getList(),
         this.getTuList()
      },
            filters: {
        dataFilter: function (value) { 
            if (!value) return ''
            value = value.toString().substr(1,4);
            return value;
        }
        },
      methods: {
        getList () {
        this.$http.get(`${this.$url}?c=index&a=showH5List&from=index`).then((res) => {
            this.PcLists = res.data.errmsg;
            //   console.log(res.data.recent)
            this.getTuList(this.$route.params.id)
            })
             .catch(e => {
                  console.log(e)
                })
        },
         getTuList (storyId) {
        this.$http.get(`${this.$url}?c=index&a=getOneH5Data&from=index&id=${storyId}`).then((res) => {
               this.tuLists = res.data.errmsg;
                //  console.log(res.data.errmsg)
            })
             .catch(e => {
                  console.log(e)
                })
        },
        }
}
</script>

<style scope>

</style>

