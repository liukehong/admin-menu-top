<template>
    <div class="tagWrap">
        <div class="tabLeft">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in menu.arrs1" :key="item.id">
                    <Tag
                        type="dot" 
                        @click.native="fnTagsBtn(item.path)" 
                        :closable="true" 
                        checkable 
                        :color="menu.currentPageName===item.path?'primary':'default'"
                        @on-close="deleteItem(item)"
                    >{{item.name}}</Tag>
                </swiper-slide>
            </swiper>
        </div>
        <div class="tabRight">
            <Dropdown style="margin-left:15px; margin-top:9px;">
                <Button type="primary" size="small">
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="fnHandleMenu('all')">关闭所有</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('other')">关闭其它</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('left')">关闭左侧</DropdownItem>
                    <DropdownItem @click.native="fnHandleMenu('right')">关闭右侧</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data () {
        return {
            tagArrs: [], // 页签
            menu: {
                currentPageName: this.$route.fullPath,//页签样式显示的标识
                arrs:[],//保存页签,防止重复
                arrs1:[],//遍历该数组生成页签
                menuType: null, // 菜单类型
            },
            swiperOption: {
                "slidesPerView":"auto",
                "observer":true,//修改swiper自己或子元素时，自动初始化swiper
                "observeParents":true,
            },
        }
    },
    mounted: function(){
        let vm = this;
        vm.fnInit();
        this.addItem();
    },
    methods: {
        /* 初始化 */
        fnInit() {
            let vm = this;
            let arrs = [];
           /*  vm.menuList.forEach((item,index)=>{
                let obj = {
                    name: item.name,
                    arrs1: [],//保存页签,防止重复
                    arrs: [] //遍历该数组生成页签
                }
            }) */
        },
        /* 判断是否存在数组 */
        fnChangeList () {
            let vm = this;
            let name = vm.$route.matched[0].name;
            let flag = false;
            if(!!vm.tagArrs.length){
                vm.tagArrs.forEach((item,index)=>{
                    if(item.name == name){
                        flag = true;
                    }
                })
            }
            if(!!!flag){
                let obj = {
                    name: name,
                    arrs: [],
                    arrs1: [],
                }
                vm.tagArrs.push(obj);
            }
            console.log(vm.tagArrs,22222);
        },
        /* 页签点击事件 */
        fnTagsBtn(msg){
            this.$router.push({path:msg});
        },
        /* 页签添加 */
        addItem(){
            let vm = this;
            // 判断是否存在数组
            vm.fnChangeList();
            console.log(vm.$route,12321321)
            let typeName = vm.$route.matched[0].name;
            let _index = null;
            vm.tagArrs.forEach((item,index)=>{
                if(item.name == typeName){
                    _index = index;
                    let path = vm.$route.fullPath;
                    let name = vm.$route.meta.name;
                    let type = vm.$route.meta.type;
                    if(item.arrs.indexOf(path) == -1&&type=="菜单"){
                        item.arrs.push(path);
                        item.arrs1.push({path:path,name:name});
                    }
                }
            })

            vm.menu.arrs = vm.tagArrs[_index].arrs;
            vm.menu.arrs1 = vm.tagArrs[_index].arrs1;
        },
        /* 删除页签 */
        deleteItem(item){
            let vm = this;
            let typeName = vm.$route.matched[0].name;
            let _index = null;
            vm.tagArrs.forEach((item1,index)=>{
                if(item1.name == typeName){
                    _index = index;
                }
            })
            let index = vm.tagArrs[_index].arrs.indexOf(item.path);
            vm.tagArrs[_index].arrs.splice(index,1);
            vm.tagArrs[_index].arrs1.splice(index,1);
            vm.menu.arrs = vm.tagArrs[_index].arrs;
            vm.menu.arrs1 = vm.tagArrs[_index].arrs1;
            let len = vm.menu.arrs.length;
            console.log(vm.menu.arrs,11111111111);
            debugger
            if(len == 0){
                vm.$router.push({'path':vm.$route.matched[0].path});
            }else{
                if(item.path == vm.$route.path){
                    vm.$router.push(vm.menu.arrs[len-1]);
                }
            }
            

           /*  let index = vm.menu.arrs.indexOf(item.path);
            vm.menu.arrs.splice(index,1);
            vm.menu.arrs1.splice(index,1);
            let len = vm.menu.arrs.length>1?1:0;
            console.log(vm.menu.arrs,11111111111);
            if(item.path == vm.$route.path){
                vm.$router.push(vm.menu.arrs[len]);
            } */
        },
        /* 页签删除后再点开的处理 */
        fnExistTabList (to) {
            let vm = this;
            if(this.menu.arrs.indexOf(to.fullPath) == -1){
                //不存在的情况
                vm.$store.dispatch('tabFalse');
            }else{
                //存在的情况
                vm.$store.dispatch('tabTrue');
            }
        },
        /* 页签管理 */
        fnHandleMenu (type) {
            let vm = this;
            let typeName = vm.$route.matched[0].name;
            let _index = null;
            let num = null;
            vm.tagArrs.forEach((item1,index)=>{
                if(item1.name == typeName){
                    _index = index;
                }
            })
            let arrs = [];
            let arrs1 = [];
            switch (type) {
                case "all":
                    vm.tagArrs[_index].arrs = [];
                    vm.tagArrs[_index].arrs1 = [];
                    vm.menu.arrs = vm.tagArrs[_index].arrs;
                    vm.menu.arrs1 = vm.tagArrs[_index].arrs1;
                    vm.$router.push({'path':vm.$route.matched[0].path});
                    break;
                case "left":
                    num = vm.menu.arrs.indexOf(vm.$route.path);
                    vm.menu.arrs.forEach(function(item,i){
                        if(i>=num){
                            arrs.push(item);
                            arrs1.push(vm.menu.arrs1[i]);
                        }
                    })
                    vm.tagArrs[_index].arrs = arrs;
                    vm.tagArrs[_index].arrs1 = arrs1;
                    vm.menu.arrs = arrs;
                    vm.menu.arrs1 = arrs1;
                    break;
                case "right":
                    num = vm.menu.arrs.indexOf(vm.$route.path);
                    vm.menu.arrs.forEach(function(item,i){
                        if(i<=num){
                            arrs.push(item);
                            arrs1.push(vm.menu.arrs1[i]);
                        }
                    })
                    vm.tagArrs[_index].arrs = arrs;
                    vm.tagArrs[_index].arrs1 = arrs1;
                    vm.menu.arrs = arrs;
                    vm.menu.arrs1 = arrs1;
                    break;
                case "other":
                    let path = vm.$route.path;
                    vm.menu.arrs.forEach(function(item,index){
                        if(item == path){
                            arrs.push(item);
                            arrs1.push(vm.menu.arrs1[index]);
                        }
                    })
                    vm.tagArrs[_index].arrs = arrs;
                    vm.tagArrs[_index].arrs1 = arrs1;
                    vm.menu.arrs = arrs;
                    vm.menu.arrs1 = arrs1;
                    break;
                default:
                    //情况不符
            }
        },
    },
    components:{
        swiper,
        swiperSlide,
    },
    watch:{  
        $route(to, from) {  
            // this.fnExistTabList(to);//判断是否存在页签中
            this.menu.currentPageName = to.fullPath;
            this.addItem();
        },
    },
    created () {
    },
    beforeDestory(){
    } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tagWrap{
    position: relative;
    width: 100%;
    height: 47px;
    padding-top: 0px!important;
    background: #fff;
    .tabPrev{
        position: absolute;
        left: 0px;
        width: 15px;
        text-align: center; 
        height: 41px;
        line-height: 41px;
        // cursor: context-menu;
        cursor: pointer;
        background: #fff;
    }
    .tabNext{
        position: absolute;
        right: 110px;
        width: 15px;
        text-align: center; 
        height: 41px;
        line-height: 41px;
        // cursor: context-menu;
        cursor: pointer;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
    }
    .tabLeft{
        padding-top: 6px;
        margin-left: 5px;
        position: absolute;
        left: 0px; right: 110px;
        height: 41px;
        overflow: hidden;
        .tabLeftWrap{
            position: absolute;
            width: max-content;
            height: 41px;
            left: 0px;
        }
    }
    .tabRight{
        width: 110px; height: 41px;
        right: 0px; 
        height: 41px;
        position: absolute;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
    }
}
/* 顶部右侧区域 */
.swiper-slide{
    width: auto!important;
}
</style>




