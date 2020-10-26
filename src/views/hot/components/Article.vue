<template>
  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <a-tabs default-active-key="1" size="large">
      <a-tab-pane key="1">
        <span slot="tab">
          <span class="exmoo-icon icon"></span>
          澳门力报
        </span>
        <Exmoo />
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <span class="HK-01icon icon"></span>
          HK01
        </span>
        <HK01 />
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script>
import Vue from 'vue';
import {
  Layout,
  Tabs,
} from 'ant-design-vue';
import Exmoo from './Exmoo.vue';
import HK01 from './HK01.vue';

Vue.use(Tabs);
Vue.use(Layout);
export default {
  name: 'Article',
  components: {
    Exmoo,
    HK01,
  },
};
</script>

<style scoped lang="scss">
  .ant-tabs {
    background-color: #ffffff;
  }
  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
  }
  .HK-01icon {
    background-image: url("../../../assets/img/hk01.png");
  }
  .exmoo-icon {
    background-image: url("../../../assets/img/exmoo.jpg");
  }
</style>
