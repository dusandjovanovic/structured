import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:2999/'
});

export default instance;