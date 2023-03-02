//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//引入组件
import tab from "./tab";
//引用Vuex
Vue.use(Vuex);

//创建并暴露store
export default new Vuex.Store({
    modules:{
        tab
    }
});