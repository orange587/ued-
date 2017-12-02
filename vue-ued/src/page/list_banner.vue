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
                            <img :src="item.content[0]  | imageUrlPrefix" >
                        </a>
                        <p class="description"><a href="javascript:;">{{ item.title }}</a></p>
                        <div class="qianm clearfloat">
                            <span class="sp1">作者：{{ item.author  }}</span>
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
     <!--弹窗 st-->
    <div class="mask" style="display: none;"></div>
    <div class="photo-panel">
        <div class="photo-div">
            <div class="photo-left">
                <div class="arrow-prv"></div>
            </div>
            <div class="photo-img">
                <div class="photo-bar">
                    <div class="photo-close"></div>
                </div>
                <!--div class="photo-view-w">
						<img src="http://image.tianjimedia.com/uploadImages/2013/127/5WW8V9Y75V00_1000x500.jpg" />
					</div-->
                <div class="photo-view-h">
                    <img src="http://b.zol-img.com.cn/sjbizhi/images/9/800x1280/1471524533521.jpg" />
                </div>
                <!--div class="photo-bar">
						<div class="photo-bar-tip">
							待开发功能
						</div>
					</div-->
            </div>
            <div class="photo-right">
                <div class="arrow-next"></div>
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
import JqueryMasonryMin from '../utils/jquery_masonry_min.js'
import JQeasing from '../utils/jQeasing.js'
import Pubuliu from '../utils/pubuliu.js'
import Index from '../utils/index'
export default {
  name:'list_banner',
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
        this.$http.get(`${this.$url}?c=index&a=showBannerList&from=index`).then((res) => {
               this.PcLists = res.data.errmsg;
              console.log(res.data.errmsg)
            })
             .catch(e => {
                  console.log(e)
                })
        },
        }
}
</script>

