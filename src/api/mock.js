import Mock from 'mockjs'
import homeApi from '../mockServerData/home'
import permission from '../mockServerData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData())


// Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu)