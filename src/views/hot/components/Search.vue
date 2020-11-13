<template>
  <a-spin :spinning="spinning" tip="數據抓取中，請稍後...">
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <div class="tips">
      <div>可点此按钮更新最新数据
        <a-button type="primary" @click="refresh">
          刷新
        </a-button>
      </div>
    </div>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '680px' }">
      <div class="hot-content">
        <a-card title="热搜" class="hot-card">
          <a class="weibo" slot="extra" href="https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6" target="_blank"></a>
          <p v-for="(item, index) in list.weiboSearch" :key="index">
            <a :href="item.url" target="_blank">{{index + 1}}.{{item.title}}</a>
          </p>
        </a-card>
        <a-card title="要闻" class="hot-card">
          <a class="weibo" slot="extra" href="https://s.weibo.com/top/summary?cate=socialevent" target="_blank"></a>
          <p v-for="(item, index) in list.weiboNews" :key="index">
            <a :href="item.url" target="_blank">{{index + 1}}.{{item.title}}</a>
          </p>
        </a-card>
        <a-card title="热门话题" class="hot-card">
          <a class="weibo" slot="extra" href="https://d.weibo.com/231650" target="_blank"></a>
          <p v-for="(item, index) in list.weiboTopic" :key="index">
            <a :href="item.url" target="_blank">{{index + 1}}.{{item.title}}</a>
          </p>
        </a-card>
        <a-card title="头条热搜" class="hot-card">
          <a class="toutiao" slot="extra" href="https://so.toutiao.com/" target="_blank"></a>
          <p v-for="(item, index) in list.toutiaoSearch" :key="index">
            <a :href="item.url" target="_blank">{{index + 1}}.{{item.title}}</a>
          </p>
        </a-card>
      </div>
    </div>
  </a-layout-content>
  </a-spin>
</template>

<script>
import Vue from 'vue';
import { apiPutHotSearch, apiGetHotSearch } from '@/api/hotSearch';
import {
  Layout, Card, Button, Spin,
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Spin);
export default {
  name: 'Search',
  data() {
    return {
      list: {
        weiboSearch: [],
        weiboNews: [],
        weiboTopic: [],
        toutiaoSearch: [],
      },
      spinning: false,
    };
  },
  async created() {
    const data = await apiGetHotSearch().catch((err) => err);
    this.init(data);
  },
  methods: {
    async refresh() {
      this.spinning = true;
      await apiPutHotSearch().catch((err) => err);
      const data = await apiGetHotSearch().catch((err) => err);
      this.init(data);
      this.spinning = false;
    },
    init(data) {
      this.list.weiboSearch = data.filter((item) => item.source === 'weiboSearch');
      this.list.weiboNews = data.filter((item) => item.source === 'weiboNews');
      this.list.weiboTopic = data.filter((item) => item.source === 'weiboTopic');
      this.list.toutiaoSearch = data.filter((item) => item.source === 'toutiaoSearch');
    },
  },
};
</script>

<style scoped lang="scss">
  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .tips {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    margin: 20px 0;
    border-radius: 4px;
    color: #00b0ff;
    border-left: 5px solid #00b0ff;
    background-color: #ffffff;
  }
  .hot-content {
    display: flex;
    flex-wrap: wrap;
    .hot-card {
      width: 400px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
    .weibo {
      box-sizing: border-box;
      display: inline-block;
      width: 32px;
      height: 26px;
      background-image: url('../../../assets/img/weibo.png');
      background-size: 100% 100%;
    }
    .toutiao {
      box-sizing: border-box;
      display: inline-block;
      width: 32px;
      height: 26px;
      background-image: url('../../../assets/img/toutiao.jpg');
      background-size: 100% 100%;
    }
  }
</style>
