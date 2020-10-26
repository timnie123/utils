<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>快乐工具屋</a-layout-header>
      <a-layout-content>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="6">
            <router-link :to="{name:'PictureDownload'}">
              <a-card hoverable style="width: 100%;height: 336px">
                <img
                  slot="cover"
                  alt="example"
                  :src="downLoadSrc"
                />
                <a-card-meta title="批量图片下载工具">
                  <template slot="description">
                    一款可以在网页上批量下载图片的工具
                  </template>
                </a-card-meta>
              </a-card>
            </router-link>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <router-link :to="{name:'Hot'}">
              <a-card hoverable style="width: 100%;height: 336px">
                <img
                  slot="cover"
                  alt="example"
                  :src="downLoadSrc"
                />
                <a-card-meta title="热搜">
                  <template slot="description">
                    热搜
                  </template>
                </a-card-meta>
              </a-card>
            </router-link>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import downLoad from '@/assets/img/download.png';
import {
  Layout, Col, Row, Card,
} from 'ant-design-vue';

Vue.use(Layout);
Vue.use(Col);
Vue.use(Row);
Vue.use(Card);
export default {
  name: 'Index',
  data() {
    return {
      downLoadSrc: downLoad,
    };
  },
};
</script>

<style scoped lang="scss">
  #components-layout-demo-basic {
    text-align: center;
  }
  #components-layout-demo-basic .ant-layout-header {
    background: #00b0ff;
    color: #fff;
  }
  #components-layout-demo-basic .ant-layout-content {
    background-color: #ffffff;
    color: #fff;
    min-height: 120px;
    line-height: 120px;
    padding: 100px 200px;
  }
  #components-layout-demo-basic > .ant-layout {
    margin-bottom: 48px;
  }
  #components-layout-demo-basic > .ant-layout:last-child {
    margin: 0;
  }
  .nav-item {
    background: #00a0e9;
    padding: 5px 0;
  }
</style>
