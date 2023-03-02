import home from "@/mockServerData/home"

export default {
    namespaced:true,
    state:{
        isCollapse:false,//控制菜单展开收起
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
              },
        ],//面包屑数据
    },
     actions : {
    },
    
     mutations : {
        //修改方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state,val){
            if (val.name!==home) {
               const index =  state.tabsList.findIndex(item=>item.name===val.name)
                //如果不存在
                if (index===-1) {
                    state.tabsList.push(val)
                }
            }
        },
        CloseTag(state,val){
            if (val.name!==home) {
               state.tabsList= state.tabsList.filter(item=>val.name !== item.name)
            }
        }
    },
}