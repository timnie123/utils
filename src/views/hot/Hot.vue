<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
        @click="change"
      >
        <a-menu-item key="1">
          热文
        </a-menu-item>
        <a-menu-item key="2">
          热搜
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <Article v-show="currentMenu === '1'" />
    <Search v-show="currentMenu === '2'" />
  </a-layout>
</template>

<script>
import Vue from 'vue';
import {
  Layout, Menu, Card, Button,
} from 'ant-design-vue';
import Search from './components/Search.vue';
import Article from './components/Article.vue';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Card);
export default {
  name: 'Hot',
  data() {
    return {
      currentMenu: '1',
    };
  },
  components: {
    Search,
    Article,
  },
  methods: {
    change(item) {
      this.currentMenu = item.key;
    },
  },
};
</script>

<style scoped lang="scss">
  .ant-layout-header {
    background-color: #00b0ff;
  }
  .ant-menu-dark {
    background-color: #00b0ff;
  }
  .ant-menu.ant-menu-dark .ant-menu-item-selected {
    background-color: #ff0057;
  }
</style>
