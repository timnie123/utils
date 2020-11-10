<template>
    <div>
      <a-table :columns="columns" :data-source="info" :pagination="pagination" @change="pageChange">
        <a :href="`${record.url}`" slot="mainTitle" slot-scope="text, record">{{ text }}</a>
        <span slot="Image" slot-scope="Image">
          <img class="news-image" :src="Image">
        </span>
      </a-table>
    </div>
</template>

<script>
import Vue from 'vue';
import {
  Table,
} from 'ant-design-vue';
import { apiGetHotArticleExmoo } from '@/api/hotSearch';

Vue.use(Table);
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
  },
};
</script>

<style scoped lang="scss">
.news-image {
  width: 150px;
  height: 120px;
}
</style>
