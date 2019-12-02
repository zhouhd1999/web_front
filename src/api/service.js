import axios from "axios"

const service = axios.create({
   baseURL:'http://127.0.0.1:8081'
});

//拦截器
axios.interceptors.response.use(function (response) {
   console.log('响应:', response.config.url, response)
   return response.data
})

export default service