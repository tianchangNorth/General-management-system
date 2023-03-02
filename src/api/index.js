import http from '@/utils/request'

//请求首页数据接口
export const getData=()=>{
    //返回一个promis对象
    return http.get('/home/getData')
}

// export const getMenu = ({data})=>{
//     return http.post('/permission/getMenu',data)
// }

export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}