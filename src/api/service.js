import axios from "axios"

const service = axios.create({
   baseURL:'http://127.0.0.1:8081'
});

export default service