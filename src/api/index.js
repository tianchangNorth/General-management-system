import http from '@/utils/request'

//请求首页数据接口
export const getData=()=>{
    //返回一个promis对象
    return http.get('/home/getData')
}

//请求用户数据
export const getUser = (params)=>{
    //返回用户列表
    return http.get('/user/getUser',params)
}
//新增用户数据
export const addUser = (data)=>{
    return http.post('/user/add',data)
}
//修改用户数据
export const editUser = (data)=>{
    return http.post('/user/edit',data)
}
//删除用户数据
export const delUser = (data)=>{
    return http.post('/user/del',data)
}

export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}