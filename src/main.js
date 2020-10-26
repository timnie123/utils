import Vue from 'vue';
// 时间处理类库
import moment from 'moment';
import 'moment/locale/zh-hk';
// antd全局组件
import { message } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './filters/filter';

import '@/assets/css/normalize.css';
import '@/assets/css/base.scss';

Vue.prototype.$message = message;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
