<template>
    <div class="layout main" :class="{'layout-hide-text': spanLeft < 3}">
        <Row type="flex">
            <!-- 头部 -->
            <Col span="24">
                <Header v-on:toggleChange="fnToggleMenu"></Header>
            </Col>
            <!-- 一级菜单 -->
            <Col span="24">
                 <div class="first-menu-wrap">
                    <ul class="nav-list">
                        <li v-for="(item,i) in menuList" :class="['nav-item',index == i?'nav-item-active':'']" @click="selectNav(i,item)">
                            <div>
                                <Icon style="width:30px;" :type="item.menuLogo"/>
                                <span style="width: 100px;">
                                    {{ item.name }}
                                </span>
                            </div>
                        </li>
                    </ul>
                 </div>
            </Col>
            <Col :span="spanLeft" class="layout-menu-left">
                <!-- 左侧菜单展开时 -->
                <menu-show v-show="!!hideMenuText" :menuList="defaultList"></menu-show>
                <!-- 左侧菜单收缩时 -->
                <menu-hide v-show="!!!hideMenuText" :menuList="menuList"></menu-hide>
            </Col>
            <Col :span="spanRight">

                <!-- 页签区域 -->
                <page-tabs></page-tabs>
                <!-- 内容区域 -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import MenuHide from './main_components/menuHide'
import MenuShow from './main_components/menuShow'
import Header from './main_components/header'
import PageTabs from './main_components/pageTabs'
export default {
    data () {
        return {
            arrs:[1,2,3,4],
            index: 0,
            hideMenuText: true,
            spanLeft: 3, // layout布局左侧的宽度
            spanRight: 21, // layout布局右侧的宽度
            menuList:[], // 菜单列表数组
            defaultList:[], // 默认显示数组
            saveMenuList: [], // 保存的历史菜单数据
        }
    },
    components:{
        MenuShow,
        MenuHide,
        Header,
        PageTabs,
    },
    mounted: function(){
        this.fnGetMenuList();//获取菜单
    },
    activated: function(){
        this.fnGetMenuList();//获取菜单数据
    },
    methods: {
        /* 点击一级菜单 */
        selectNav (i,data) {
            
            let vm = this;
            let href = '';
            vm.saveMenuList.forEach((item,index)=>{
                
                if(item.name == data.name){
                    href = !!item.href?item.href:data.href;
                }
            })
            vm.index = i;
            vm.defaultList = data.childList;
            vm.$router.push({path:href})
        },
        /* 面包屑点击时,触发父组件相关的变化 */
        fnToggleMenu (obj) {
            let vm = this;
            vm.spanLeft = obj.spanLeft;
            vm.spanRight = obj.spanRight;
            vm.hideMenuText = obj.hideMenuText;
        },
        /* 初始化一级菜单 */
        fnInitFirstMenu () {
            
            let vm = this;
            let name = vm.$route.matched[0].name;
            vm.menuList.forEach((item,index)=>{
                if(item.name == name){
                    vm.selectNav(index,item)
                }
            })
            console.log(name,1111111111111222222222);
        },
        /* 获取菜单数据 */
        fnGetMenuList () {
            let vm = this;
            let arrs = this.common.menuList;
            switch (vm.common.menuType) {
                case 1:
                    vm.menuList = arrs;  // 不走存储拿菜拿菜单数据
                    break;
                case 2:
                    if(window.localStorage.getItem("userInfo")){
                        vm.menuList = JSON.parse(window.localStorage.getItem("userInfo")).menu;
                    }
                    break;
                default:
                    vm.menuList = arrs;  // 不走存储拿菜拿菜单数据
            }

            console.log(vm.menuList,'~~~~~~~');
            vm.defaultList = vm.menuList[0].childList;
            vm.fnSaveMenu();
            vm.fnInitFirstMenu();
        },
        // 保存各个一级菜单点击时的选项
        fnSaveMenu (data) {
            
            let vm = this;
            if(data){
                console.log(this.index)
                let name = data.matched[0].name;
                let href = data.path;
                vm.saveMenuList.forEach((item,i)=>{
                    if(item.name == name){
                        item.href = href
                    }
                })
            }else{
                
                console.log(this.$route)
                let name = this.$route.matched[0].name;
                // 初始化
                vm.menuList.forEach((item,i) => {
                    let obj = {
                        'name': item.name,
                        'href': name == item.name?vm.$route.path:''
                    }
                    vm.saveMenuList.push(obj)
                })
            }
        }
    },
    watch: {
        $route(to, from) {  
            console.log(this.$route,1111111111)
            this.fnSaveMenu(this.$route);
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import '../../static/sass/main.scss'
</style>




