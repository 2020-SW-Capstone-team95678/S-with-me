import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://swithme.ml',
});

export default Api;
