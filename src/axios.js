import axios from 'axios'

const instance  = axios.create({
    baseURL:'https://cloudsync-39afc.firebaseio.com/'
});

export default instance;