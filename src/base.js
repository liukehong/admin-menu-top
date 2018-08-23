const common = {
    menuType: 1, // 菜单数据来源类型 1静态数据 2接口
    path: (function(i){
        switch (i) {
            case 1:
                // 测试环境
                return "http://mrb.amez999.com/pc/"  
                break;
            case 2:
                // 正式环境
                return "http://www.52mrb.com/pc/"
                break;
            default:
                return "http://mrb.amez999.com/pc/"
        } 
    })(1),
    /* 用户信息 */
    u: (function(){
        let data = JSON.parse(window.localStorage.getItem("userInfo"));
        return data;
    })(),
    /* 菜单 */
    menuList:[
        {
            name: '首页',
            hasChildList:true,
            href:"/home",
            menuLogo:"md-body",
            childList: [
                {
                    name:"首页内容",
                    hasChildList: false,
                    href:"/home/index"
                }
            ],
        },
        {
            name:"组件",
            hasChildList:true,
            href:"/component",
            menuLogo:"ios-apps-outline",
            childList: [
                {
                    name:"数字渐变",
                    hasChildList: false,
                    href:"/component/count-to"
                },
            ]
        },
        {
            name:"表格",
            hasChildList:true,
            href:"/tables",
            menuLogo:"md-bug",
            childList: [
                {
                    name:"基本表格",
                    hasChildList: false,
                    href:"/tables/base-table"
                },
                {
                    name:"可编辑表格",
                    hasChildList: false,
                    href:"/tables/editable-table"
                },
                {
                    name: '测试',
                    hasChildList: true,
                    href: '',
                    childList: [
                        {
                            name: '测试子页面',
                            hasChildList: false,
                            href: '/tables/test/children'
                        }
                    ]
                }
            ]
        },
    ],
}
export default common