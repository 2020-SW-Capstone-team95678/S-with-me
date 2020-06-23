import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://swithme.ml',
  // baseURL: 'http://ec2-3-34-84-81.ap-northeast-2.compute.amazonaws.com:8085',
});

export const BootPayApi = axios.create({
  baseURL: 'https://api.bootpay.co.kr',
});
export default Api;
