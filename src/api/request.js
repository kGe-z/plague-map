import axios from 'axios'

export function request(config){
    const instance=axios.create({
        baseURL:'https://interface.sina.cn',
        timeout:10000
    })

    
    return instance(config)
}