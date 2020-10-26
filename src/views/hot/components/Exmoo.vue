<template>
    <div>
      <a-table :columns="columns" :data-source="data">
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
          title: '缩略图',
          dataIndex: 'imgUrl',
          key: 'imgUrl',
          scopedSlots: { customRender: 'Image' },
        },
      ],
      data: [{
        key: '1',
        mainTitle: '傳播力更強 來源不明',
        subTitle: '挪威現新冠病毒新變種',
        type: '即时新闻',
        createTime: '2020-10-26',
        imgUrl: 'https://statics.exmoo.com/uploads/thumbnail/hotarticle/2020-10-26/bkFMqTI7cek77tuVn4gZvkkl77mndYB3LaAtIHJv_5_4_500X400.jpg',
      }],
    };
  },
};
</script>

<style scoped lang="scss">
.news-image {
  width: 150px;
  height: 120px;
}
</style>
