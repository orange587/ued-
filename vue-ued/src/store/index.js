import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//新增状态管理
const store = new Vuex.Store({
  state: {
      breadListState: [
          { name: 'index', path: '/', title: '首页' },
      ],
      storydetail:{}
  },
  mutations: {
      breadListStateAdd(state, obj) {
          state.breadListState.push(obj);
      },
      breadListStateRemove(state, num) {
          state.breadListState = state.breadListState.slice(0, num);
      },
      setAgree(state,agreeNum){
        state.storydetail.agree = agreeNum;
    },
  },
  actions:{
    agree(context,storyId){
      // 进行请求,获取点赞后的agree字段属性值
      this.$http.post("https://bird.ioliu.cn/v1/?url=http://testued.light.fang.com/?c=index&a=getoneArticleInfo&from=index&id=${storyId}",{emulateJSON:true}).then(function (res) {
          // 处理业务
          // 调用上面setAgree方法更新点赞数
          context.commit("setAgree",res.body.agree);
      },function(){})
  }
  }

})
export default store