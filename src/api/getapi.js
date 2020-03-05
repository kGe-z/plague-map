import {request} from './request'

export function getdata(){
    return request({
        url:'/news/wap/fymap2020_data.d.json'
    })
}
