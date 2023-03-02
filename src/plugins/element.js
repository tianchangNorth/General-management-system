import Vue from "vue";
import {Container, Aside,Header,Main,Submenu ,MenuItemGroup,MenuItem,Menu,Button,Dropdown,DropdownItem,DropdownMenu,RadioGroup,RadioButton,Col,Row,Card,Table,TableColumn,BreadcrumbItem,Breadcrumb,Tag,Form,FormItem,Input,Message}from 'element-ui';
const element = {
    install:function (Vue) {
        Vue.use(Container)
        Vue.use(Aside)
        Vue.use(Header)
        Vue.use(Main)       
        Vue.use(Submenu)
        Vue.use(MenuItemGroup)
        Vue.use(MenuItem)
        Vue.use(Menu)
        Vue.use(Button)
        Vue.use(DropdownItem)
        Vue.use(DropdownMenu)
        Vue.use(Dropdown)
        Vue.use(RadioGroup)
        Vue.use(RadioButton)
        Vue.use(Col)
        Vue.use(Row)
        Vue.use(Card)
        Vue.use(Table)
        Vue.use(BreadcrumbItem)
        Vue.use(TableColumn)
        Vue.use(Breadcrumb)
        Vue.use(Tag)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Input)
        Vue.prototype.$message = Message
    }
}

export default element