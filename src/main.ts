import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/common.less';
import '@/api/interceptors';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .mount('#app');
