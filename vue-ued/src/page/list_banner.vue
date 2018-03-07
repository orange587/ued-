<template>
<div class="bg_f4f4">
  <TopNav></TopNav>
     <!--主体 st-->
    <!--全部作品st -->
    <div class="all_zuop">
        <!--选择头 st-->
        <div class="choice_wrap">
            <ul class="choice_xuan">
             <li>
                    <a  v-for="(num,index) in years" @click="iscur = index,searchList(num.titleTab,'year')"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li>
                    <a  v-for="(num,index) in departs" @click="iscur1 = index,searchList(index,'depart')"  :class="{active:iscur1==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li class="sexi">
                    <a  v-for="(num,index) in colors" @click="iscur2 = index,searchList(index,'color')"  :class="{active:iscur2==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
            </ul>

        </div>
        <!--选择头 end-->
        <div class="content fang_responsive">
            <!-- 瀑布流样式开始 -->
           <div class="contentUlWrap clearfloat " id="contentUlWrap">
            <ul id="contentUL" style="position:relative; display:block; margin:0 auto;min-height:100px;">
            </ul>
            </div>
            <!-- <div class="wumore" v-show="more">没有素材了。。。</div> -->
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
                <div class="photo-view-h">
                    <img src="" />
                </div>
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
export default {
  name:'list_banner',
  components:{
   TopNav,TopFan
  },
  mounted () {
      let _this = this;
    this.doConfig();
    this.getList();
    this.scrollBottom(_this.noPic);
     this.$nextTick(function() {
             this.bannerTan()
         })
  },
//    created () {
//         // this.imgsArr = this.initImgsArr();
       
//   },
  data () {
        return {
            box : null,
            gap  : 20,
            page : 1,
            listArr : [],
            noPic : false,
            more:false,
          PcLists: [],
           years:[
              {titleTab:'全部'},
              {titleTab:'2016'},
              {titleTab:'2017'},
              {titleTab:'2018'}
          ],
          departs:[
               {titleTab:'全部'},
              {titleTab:'新房DL'},
              {titleTab:'新房AI'},
              {titleTab:'平台运营'},
              {titleTab:'二媒'},
              {titleTab:'二电'},
              {titleTab:'市场部'},
              {titleTab:'其它部门'}
          ],
          colors:[
               {titleTab:'全部'},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
               {titleTab:''},
          ],
          pagesize:10,
          total:0,
          iscur:0 ,
          iscur1:0 ,
          iscur2:0 ,
          typeIndex:0,
          typesIndex:0,
          index:0,
          searchData:{
              selYear:'',
              ownGroup:'',
              colorRange:''
          }
        }
      },
      methods: {
        // 弹窗特效
        bannerTan (){
            var img_index = 0;
            var img_src = "";
            var $mask = $('.mask');
            var $photoPanel =$(".photo-panel");
            //计算居中位置
            var mg_top = ((parseInt($(window).height()) - parseInt($(".photo-div").height())) / 2);
            $(".photo-div").css({
                "margin-top": "" + mg_top + "px"
            });

            //关闭
            $(".photo-close").click(function() {
                $(".mask").hide();
                $(".photo-panel").hide();
            });
            //下一张
            $(".photo-panel .photo-div .arrow-next").click(function() {
                img_index++;
                if (img_index >= $(".img-box img").length) {
                    img_index = 0;
                }
                img_src = $(".img-box img").eq(img_index).attr("src");
                photoView($(".img-box img"));
            });
            //上一张
            $(".photo-panel .photo-div .arrow-prv").click(function() {
                img_index--;
                if (img_index < 0) {
                    img_index = $(".img-box img").length - 1;
                }
                img_src = $(".img-box img").eq(img_index).attr("src");
                photoView($(".img-box img"));
            });
            //如何调用？
            $('body').on('click','.img-box',function() {
                $mask.show();
                $photoPanel.show();
                img_src = $(this).find('img').attr("src");
                img_index = $(this).find('img').index();
                photoView($(this).find('img'));
        
            });
            //自适应预览
            function photoView(obj) {
                if ($(obj).width() >= $(obj).height()) {
                    $(".photo-panel .photo-div .photo-img .photo-view-h").attr("class", "photo-view-w");
                    $(".photo-panel .photo-div .photo-img .photo-view-w img").attr("src", img_src);
                } else {
                    $(".photo-panel .photo-div .photo-img .photo-view-w").attr("class", "photo-view-h");
                    $(".photo-panel .photo-div .photo-img .photo-view-h img").attr("src", img_src);
                }
            };
            
        },
        scrollBottom(val) {
            let _this = this;
            if(val) { 
                // alert('没有图片了！')
            }else {
                window.onscroll = function() {
                    var items = document.getElementById('contentUL').children;
                    if (_this.getClient().height + _this.getScrollTop() >= items[items.length - 1].offsetTop) {
                        _this.page++;
                     if(_this.page < Math.ceil(_this.total/_this.pagesize)+1){
                         _this.getList();
                        _this.waterFall();
                        }else{
                            return false;
                            //  _this.more = true ;
                        }

                    } ;
                }

            }
        },
        //初始化数据
        doConfig() {
            let _this = this;
            this.box = document.getElementById('contentUL');
            window.onresize = _this.waterFall;
        },
        waterFall() {
          // 1- 确定列数  = 页面的宽度 / 图片的宽度
          var items = document.getElementById('contentUL').children;
          var pageWidth = $('.contentUlWrap').width();
          document.getElementById('contentUL').style.width = pageWidth + 'px';
          var itemWidth = 260;
          var columns = Math.ceil(pageWidth / (itemWidth + this.gap ));
          var arr = [];
          for (var i = 0; i < items.length; i++) {
              if (i < columns) {
                  // 2- 确定第一行
                  items[i].style.top = 0;
                  items[i].style.left = (itemWidth + this.gap ) * i + 'px';
                  arr.push(items[i].offsetHeight);

              } else {
                  // 其他行
                  // 3- 找到数组中最小高度  和 它的索引
                  var minHeight = arr[0];
                  var index = 0;
                  for (var j = 0; j < arr.length; j++) {
                      if (minHeight > arr[j]) {
                          minHeight = arr[j];
                          index = j;
                      }
                  }
                  // 4- 设置下一行的第一个盒子位置
                  // top值就是最小列的高度 + this.gap 
                  items[i].style.top = arr[index] + this.gap  + 'px';
                  // left值就是最小列距离左边的距离
                  items[i].style.left = items[index].offsetLeft + 'px';

                  // 5- 修改最小列的高度 
                  // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                  arr[index] = arr[index] + items[i].offsetHeight + this.gap ;
              }
          }
      },
    // clientWidth 处理兼容性
    getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    },
    // scrollTop兼容性处理
    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    //   获取数据
    getList () {
        let _this = this;
        this.$http.get(`/?c=index&a=showBannerList&from=index&r=`+ Math.random(),{
            params:{
                selYear:this.searchData.selYear,
                ownGroup:this.searchData.ownGroup,
                colorRange:this.searchData.colorRange,
                pagesize:this.pagesize,
                page : this.page
            }
        }).then((res) => {
            if(res.data.errmsg.length) {
                let arr = [];
                let str = '';
                arr = res.data.errmsg;
                this.total = res.data.total;
                this.listArr = _this.listArr.concat(arr);
                if(arr.length) {
                    for(var k=0;k<_this.listArr.length;k++) {
                        var heightNew = 'height:' +parseInt((_this.listArr[k]['content'][0].height * 260) / (_this.listArr[k]['content'][0].width)) + 'px';
                        str+= '<li class="item img-box" style="width:260px; overflow:hidden; position:absolute;">';
                        str+= '	<a href="javascript:;" class="a-img"'+ 'style = '+ heightNew +'>';
                        str+= '		<img style="width:100%;" src="https://images.weserv.nl/?url=' + _this.listArr[k]['content'][0].id.substr(7) + '" alt="">';
                        str+= '	</a>';
                         str+= '<div class="img-info">';
                        str+= '	<p class="description"><a href="javascript:;">'+_this.listArr[k]['title'] +'</a></p>';
                        str+= '	<div class="qianm clearfloat">';
                        str+= '		<span class="sp1">'+_this.listArr[k]['author']+'</span>';
                        str+= '		<span class="sp3">'+_this.listArr[k]['publishTime']+ '</span>';
                        str+= '	</div>';
                         str+= '	</div>';
                        str+= '</li>';
                    }
                    document.getElementById('contentUL').innerHTML += str;
                    this.waterFall();
                }
            }else {
               _this.noPic = true;
            }
        }).catch(e => {
            console.log(e)
        })
    },

          // 筛选函数
        searchList(obj,type)  {
         let that = this;
         that.listArr = [];
         that.page = 1;
         document.getElementById('contentUL').innerHTML = '';
         switch(type){
           case 'year':
           this.searchData.selYear = obj;
           break;
           case 'depart':
           this.searchData.ownGroup = obj;
           break;
           case 'color':
           this.searchData.colorRange = obj;
           break;
           
         }
         this.getList ();
        },
        }
}

</script>


