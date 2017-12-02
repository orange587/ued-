<template>
  <el-breadcrumb class="app-levelbar crumb" separator="/">  	
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
      <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.title}}</router-link>
      <router-link v-else :to="item.path">{{item.title}}</router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item>正文</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: ''
    }
  },
  mounted(){	
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
    var breadNumber= this.$route.query.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
    var breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
    var curName=this.$route.name;
    var curPath=this.$route.fullPath;
		var curTitle=this.$route.meta.title;
    var newBread={name:curName,path:curPath,title:curTitle};
    var ishome=curName=='index';
//     console.log(ishome);
    if(breadNumber===1){//点击一级菜单
     this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
     if(!ishome)//如果不是首页
      this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
    }
    else if(breadLength<=breadNumber){//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级
     this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
    }else{
     this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
    }
    this.levelList= this.$store.state.breadListState;
   }
      
  },

  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
}
</script>

<style  scoped>

</style>