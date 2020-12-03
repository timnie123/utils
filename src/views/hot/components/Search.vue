<template>
  <a-spin :spinning="spinning" tip="數據抓取中，請稍後...">
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <div class="tips">
        <div>
          數據每天<span style="color:#f50057">8:30</span>和
          <span style="color:#f50057">18:00</span>自動更新
        </div>
        <div>
          上一次數據更新時間：{{ $moment(Number(this.updateTime)).format('YYYY/MM/DD HH:mm:ss') }}
        </div>
        <div>可点此按钮更新最新数据
          <a-button type="primary" @click="refresh">
            刷新
          </a-button>
          數據抓取過程會比較久，請耐心等待
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
        <a-card title="百度热搜" class="hot-card">
          <a class="baidu" slot="extra" href="http://top.baidu.com/buzz?b=1&fr=topindex" target="_blank"></a>
          <p v-for="(item, index) in list.baiduSearch" :key="index">
            <a :href="item.url" target="_blank">{{index + 1}}.{{item.title}}</a>
          </p>
        </a-card>
        <a-card title="豆瓣热门话题" class="hot-card">
          <a class="douban" slot="extra" href="https://www.douban.com/gallery/" target="_blank"></a>
          <p v-for="(item, index) in list.doubanTopic" :key="index">
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
import {
  apiPutHotSearchWeibo,
  apiPutHotSearchToutiao,
  apiPutHotSearchWeiboTopic,
  apiPutHotSearchWeiboNews,
  apiPutHotSearchBaidu,
  apiGetHotSearch,
  apiPutHotSearchdoubanTopic,
} from '@/api/hotSearch';
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
        baiduSearch: [],
        doubanTopic: [],
      },
      spinning: false,
      updateTime: '',
    };
  },
  async created() {
    const data = await apiGetHotSearch().catch((err) => err);
    this.init(data);
  },
  methods: {
    async refresh() {
      this.spinning = true;
      await apiPutHotSearchWeibo().catch((err) => err);
      await apiPutHotSearchToutiao().catch((err) => err);
      await apiPutHotSearchWeiboTopic().catch((err) => err);
      await apiPutHotSearchWeiboNews().catch((err) => err);
      await apiPutHotSearchBaidu().catch((err) => err);
      await apiPutHotSearchdoubanTopic().catch((err) => err);
      const data = await apiGetHotSearch().catch((err) => err);
      this.init(data);
      this.spinning = false;
    },
    init(data) {
      this.updateTime = data[0].updateTime;
      this.list.weiboSearch = data.filter((item) => item.source === 'weiboSearch');
      this.list.weiboNews = data.filter((item) => item.source === 'weiboNews');
      this.list.weiboTopic = data.filter((item) => item.source === 'weiboTopic');
      this.list.toutiaoSearch = data.filter((item) => item.source === 'toutiaoSearch');
      this.list.baiduSearch = data.filter((item) => item.source === 'baidu');
      this.list.doubanTopic = data.filter((item) => item.source === 'doubanTopic');
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
    .baidu {
      box-sizing: border-box;
      display: inline-block;
      width: 32px;
      height: 26px;
      background-image: url('../../../assets/img/baidu.png');
      background-size: 100% 100%;
    }
    .douban {
      box-sizing: border-box;
      display: inline-block;
      width: 32px;
      height: 26px;
      background-image: url('../../../assets/img/douban.jpg');
      background-size: 100% 100%;
    }
  }
</style>
