// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import 'iview/dist/styles/iview.css';
import iView from 'iview';
import common from './base.js';
import '../static/sass/common.min.css'
import api from './http/index'
import BASE_UTIL from './util/util.js'
import qs from 'qs'
// 引入 vue-kikindeditor 需要的文件
import VueKindEditor from 'vue-kindeditor'
// import 'kindeditor/kindeditor-all-min.js'
import '../static/js/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
// 注册 vue-kikindeditor plugin
import VueDND from 'awe-dnd'
Vue.use(api)
Vue.use(VueDND)
Vue.use(VueKindEditor)
Vue.use(iView);
Vue.prototype.common = common;
Vue.prototype._u = BASE_UTIL;
Vue.config.productionTip = false
Vue.prototype.qs = qs;
Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了
/* eslint-disable no-new */
/* 路由的前置钩子函数 */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  console.log("to:"+to.name+" from:"+from.name);
  next();
  //从本地拿存储，如果没有登录过，就跳到登录页，如果登陆过就跳到首页
  if(to.name=="login"){
  }else{
    if(to.name=="首页"&&from.name == "login"){
    }else{
      if(!!!window.localStorage.getItem("userInfo")){
        alert("请先登录");
        router.push("/login");
      }
    }
  }
  iView.LoadingBar.finish();
})
/* 路由的后置钩子函数 */
router.afterEach((to, from) => {
  iView.LoadingBar.finish();
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
