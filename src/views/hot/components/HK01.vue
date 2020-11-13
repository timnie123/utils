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
import { apiGetHotArticleHk01, apiPutHotArticleHkTec, apiPutHotArticleHkLife } from '@/api/hotSearch';

Vue.use(Table, Spin);
export default {
  name: 'HK01',
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
          title: '分类',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '主題',
          dataIndex: 'type_sub',
          key: 'type_sub',
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
    this.getHk01(1);
  },
  methods: {
    pageChange(page) {
      this.getHk01(page.current);
    },
    async getHk01(num) {
      const data = await apiGetHotArticleHk01(num - 1);
      this.pagination.total = data.pager.total;
      this.info = [];
      for (let i = 0; i < data.info.length; i++) {
        let type = '';
        switch (data.info[i].type) {
          case 'tec':
            type = '科技玩物';
            break;
          case 'life':
            type = '好食玩飛';
            break;
          default:
            type = '科技玩物';
            break;
        }
        this.info.push({
          key: i,
          mainTitle: data.info[i].title || '無標題',
          type,
          create_time: new Date(Number(data.info[i].create_time)).toLocaleDateString(),
          img_url: data.info[i].img_url,
          url: `https://www.hk01.com${data.info[i].url}`,
          type_sub: data.info[i].type_sub,
        });
      }
    },
    async refresh() {
      this.spinning = true;
      await apiPutHotArticleHkTec().catch((err) => err);
      await apiPutHotArticleHkLife().catch((err) => err);
      this.getHk01(1);
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
