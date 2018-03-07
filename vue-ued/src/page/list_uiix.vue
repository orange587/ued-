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
                    <a  v-for="(num,index) in projects" @click="iscur = index,searchList(index,'lei1')"  :class="{active:iscur==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>
                <li style="margin-bottom:0">
                    <a  v-for="(num,index) in numsType" @click="iscur1 = index,searchList(index,'lei2')"  :class="{active:iscur1==index}" :key="num.index" >{{num.titleTab }}</a>
                </li>

            </ul>

        </div>
        <!--选择头 end-->
        <div class="content fang_responsive">
            <!-- 瀑布流开始 -->
          <div class="contentUlWrap clearfloat " id="contentUlWrap">
            <ul id="contentUL" style="position:relative; display:block; margin:0 auto;min-height:100px;">
            </ul>
            <!-- <div class="wumore" v-show="more">没有素材了。。。</div> -->
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
  name:'list_uiix',
  components:{
    TopNav,TopFan
  },
  created () {
        this.getSubject()
        
  },
    mounted () {
      let _this = this;
    this.doConfig();
    this.scrollBottom(_this.noPic);
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
          index:0,
          searchData:{
              type1:0,
              type2:0
          },
          pagesize:10,
          total:0,
          box : null,
          gap  : 20,
          page : 1,
          listArr : [],
          noPic : false,
          heightArr:[],
          widthArr:[]
        }
      }, 
     
      methods: {
           scrollBottom(val) {
            let _this = this;
            if(val) { //没有图片了
                // alert('没有图片了！')
            }else {
                window.onscroll = function() {
                    var items = document.getElementById('contentUL').children;
                    if (_this.getClient().height + _this.getScrollTop() >= items[items.length - 1].offsetTop) {
                        _this.page++;
                     if(_this.page < Math.ceil(_this.total/_this.pagesize)+1){
                         _this.getSubject();
                        _this.waterFall();
                        }else{
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
                    // alert(1)

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
            getSubject () {
        let _this = this;
        this.$http.get(`/?c=index&a=showAppList&from=index&r=`+ Math.random(),{
            params:{
                type1:this.searchData.type1,
                type2:this.searchData.type2,
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
                        var heightNew = 'height:' +parseInt((_this.listArr[k]['coverImg'].height * 260) / (_this.listArr[k]['coverImg'].width)) + 'px';
                        str+= '<li class="item img-box" style="width:260px; overflow:hidden; position:absolute;">';
                        str+= '	<a href="http://testued.light.fang.com/#/detail_share_uiix/' + _this.listArr[k].id + ' " class="a-img" target="_blank" '+ 'style = '+ heightNew +'>';
                        str+= '		<img style="width:100%;" src="https://images.weserv.nl/?url=' + _this.listArr[k]['coverImg'].id.substr(7) + '" alt="">';
                        str+= '	</a>';
                         str+= '<div class="img-info">';
                        str+= '	<p class="description"><a href="http://testued.light.fang.com/#/detail_share_uiix/' + _this.listArr[k].id + ' " target="_blank">'+_this.listArr[k]['title'] +'</a></p>';
                        str+= '	<div class="qianm clearfloat">';
                        str+= '		<span class="sp1">'+_this.listArr[k]['author']+'</span>';
                        str+= '		<span class="sp3">'+_this.listArr[k]['shareTime']+ '</span>';
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
        searchList(obj,type){
             let that = this;
                that.listArr = [];
         that.page = 1;
         document.getElementById('contentUL').innerHTML = '';
             switch(type){
                case 'lei1':
                this.searchData.type1 = obj;
                break;
                case 'lei2':
                this.searchData.type2 = obj;
                break;
                
             };
              this.getSubject();
            //   this.$router.push({
            //         query: {
            //         type1:  this.searchData.type1,
            //         }
            //     });
           }
       
        
        }
}
</script>

