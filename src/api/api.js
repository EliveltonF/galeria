import Axios from 'axios';

const api = Axios.create({
   baseURL:"https://api.pexels.com/v1/curated"
})

export default api;