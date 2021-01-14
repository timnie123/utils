import Vue from 'vue';
// 时间处理类库
import moment from 'moment';
import 'moment/locale/zh-hk';
// antd全局组件
import { message } from 'ant-design-vue';
// socket
import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';

import './filters/filter';

import '@/assets/css/normalize.css';
import '@/assets/css/base.scss';

Vue.prototype.$socket = io('http://192.168.5.31:3000');
Vue.prototype.$message = message;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
