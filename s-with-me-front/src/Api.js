import axios from 'axios';

const Api = axios.create({
  // baseURL: 'https://swithme.ml',
  baseURL: 'http://ec2-3-34-81-212.ap-northeast-2.compute.amazonaws.com:8080',
});

export default Api;
