<template>
  <a-spin :spinning="spinning" tip="數據抓取中，請稍後...">
    <div class="tips">
      <div>可点此按钮更新最新数据
        <a-button type="primary" @click="refresh">
          刷新
        </a-button>
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
import { apiGetHotArticleCTM, apiPutHotArticleCTMActivity } from '@/api/hotSearch';

Vue.use(Table, Spin);
export default {
  name: 'CTM',
  data() {
    return {
      columns: [
        {
          title: '标题',
          dataIndex: 'mainTitle',
          key: 'mainTitle',
          scopedSlots: { customRender: 'mainTitle' },
        },
        {
          title: '來源',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: '類型',
          dataIndex: 'type',
          key: 'type',
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
    };
  },
  mounted() {
    this.getCTM(1);
  },
  methods: {
    pageChange(page) {
      this.getCTM(page.current);
    },
    async getCTM(num) {
      const data = await apiGetHotArticleCTM(num - 1);
      this.pagination.total = data.pager.total;
      this.info = [];
      for (let i = 0; i < data.info.length; i++) {
        const imageUrl = data.info[i].carver.substring(data.info[i].carver.indexOf('?') + 5).split('&');
        const encodeUrl = decodeURIComponent(imageUrl[0]);
        this.info.push({
          key: i,
          mainTitle: data.info[i].title || '無標題',
          location: data.info[i].location,
          create_time: `${data.info[i].create_time}至${data.info[i].activity_date}`,
          type: data.info[i].type === 'activity' ? '活動' : '其他',
          img_url: encodeUrl,
          url: data.info[i].url,
        });
      }
    },
    async refresh() {
      this.spinning = true;
      await apiPutHotArticleCTMActivity().catch((err) => err);
      this.getCTM(1);
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
