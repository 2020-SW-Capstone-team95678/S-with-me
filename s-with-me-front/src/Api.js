import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085',
});

export default Api;
