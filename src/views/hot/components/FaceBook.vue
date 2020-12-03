<template>
  <a-spin :spinning="spinning" tip="數據抓取中，請稍後...">
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
    <a-table :columns="columns" :data-source="info" :pagination="pagination" @change="pageChange">
      <a :href="`${record.url}`" target="_blank"
         slot="mainTitle" slot-scope="mainTitle, record">{{ mainTitle }}</a>
      <span slot="cover" slot-scope="cover">
          <img class="news-image" :src="cover">
        </span>
    </a-table>
  </a-spin>
</template>

<script>
import Vue from 'vue';
import {
  Spin,
  Table,
} from 'ant-design-vue';
import { apiGetHotArticleFB, apiPutHotArticleFBTripAddict, apiPutHotArticleFBUMagazineHK } from '@/api/hotSearch';

Vue.use(Table, Spin);
export default {
  name: 'FaceBook',
  data() {
    return {
      columns: [
        {
          title: '标题',
          dataIndex: 'mainTitle',
          key: 'mainTitle',
          width: 700,
          scopedSlots: { customRender: 'mainTitle' },
        },
        {
          title: '博主',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: '點讚數',
          dataIndex: 'like_num',
          key: 'like_num',
        },
        {
          title: '評論數',
          dataIndex: 'comment_num',
          key: 'comment_num',
        },
        {
          title: '分享數',
          dataIndex: 'share_num',
          key: 'share_num',
        },
        {
          title: '日期',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
          title: '封面图',
          dataIndex: 'img_url',
          key: 'img_url',
          scopedSlots: { customRender: 'cover' },
        },
      ],
      info: [],
      pagination: {
        total: 50,
        pageSize: 20,
      },
      spinning: false,
      updateTime: '',
    };
  },
  mounted() {
    this.getFBPost(1);
  },
  methods: {
    pageChange(page) {
      this.getFBPost(page.current);
    },
    async getFBPost(num) {
      const data = await apiGetHotArticleFB(num - 1);
      this.pagination.total = data.pager.total;
      this.info = [];
      for (let i = 0; i < data.info.length; i++) {
        if (i === 0) {
          this.updateTime = data.info[i].update_time;
        }
        this.info.push({
          key: i,
          mainTitle: data.info[i].title || '無標題',
          user: data.info[i].user,
          create_time: new Date(Number(data.info[i].create_time)).toLocaleDateString(),
          img_url: data.info[i].image_url,
          url: `https://www.facebook.com/${data.info[i].url}`,
          like_num: data.info[i].like_num,
          comment_num: data.info[i].comment_num,
          share_num: data.info[i].share_num,
        });
      }
    },
    async refresh() {
      this.spinning = true;
      await apiPutHotArticleFBTripAddict().catch((err) => err);
      await apiPutHotArticleFBUMagazineHK().catch((err) => err);
      this.getFBPost(1);
      this.spinning = false;
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
  .news-image {
    width: 150px;
    height: 120px;
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
</style>
