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
  }

})
export default store