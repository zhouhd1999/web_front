import axios from "axios"

const service = axios.create({
   baseURL:'http://127.0.0.1:8081'
});

//拦截器
service.interceptors.response.use(function (response) {
   const res = response.data
   return response.data
})

export default service