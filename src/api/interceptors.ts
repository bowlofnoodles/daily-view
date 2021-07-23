import axios from 'axios';

axios.interceptors.request.use(config => {
  config.headers.common = Object.assign({}, config.headers.common);
  return config;
});
