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
           slot="mainTitle" slot-scope="text, record">{{ text }}</a>
        <span slot="Image" slot-scope="Image">
          <img class="news-image" :src="Image">
        </span>
      </a-table>
  </a-spin>
</template>

<script>
import Vue from 'vue';
import {
  Table, Spin,
} from 'ant-design-vue';
import { apiGetHotArticleExmoo, apiPutHotArticleExmooLife, apiPutHotArticleExmooNews } from '@/api/hotSearch';

Vue.use(Table);
Vue.use(Spin);
export default {
  name: 'Exmoo',
  data() {
    return {
      columns: [
        {
          title: '主标题',
          dataIndex: 'mainTitle',
          key: 'mainTitle',
          scopedSlots: { customRender: 'mainTitle' },
        },
        {
          title: '副标题',
          dataIndex: 'subTitle',
          key: 'subTitle',
        },
        {
          title: '分类',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '日期',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '瀏覽量',
          dataIndex: 'views',
          key: 'views',
        },
        {
          title: '封面图',
          dataIndex: 'imgUrl',
          key: 'imgUrl',
          scopedSlots: { customRender: 'Image' },
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
    this.getExmoo(1);
  },
  methods: {
    pageChange(page) {
      this.getExmoo(page.current);
    },
    async getExmoo(num) {
      const data = await apiGetHotArticleExmoo(num - 1);
      this.pagination.total = data.pager.total;
      this.info = [];
      for (let i = 0; i < data.info.length; i++) {
        if (i === 0) {
          this.updateTime = data.info[i].updateTime;
        }
        let type = '';
        switch (data.info[i].type) {
          case 'news':
            type = '即時新聞';
            break;
          case 'life':
            type = '生活資訊';
            break;
          default:
            type = '即時新聞';
            break;
        }
        this.info.push({
          key: i,
          mainTitle: data.info[i].mainTitle || '無標題',
          subTitle: data.info[i].subTitle || '無標題',
          type,
          createTime: new Date(Number(data.info[i].createTime)).toLocaleDateString(),
          imgUrl: data.info[i].imgUrl,
          url: data.info[i].url,
          views: data.info[i].views,
        });
      }
    },
    async refresh() {
      this.spinning = true;
      await apiPutHotArticleExmooNews().catch((err) => err);
      await apiPutHotArticleExmooLife().catch((err) => err);
      this.getExmoo(1);
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
