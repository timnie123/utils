<template>
  <a-upload
    name="file"
    :multiple="false"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :customRequest="handleUpload"
  >
    <a-button> <a-icon type="upload" /> Click to Upload </a-button>
  </a-upload>
</template>

<script>
import Vue from 'vue';
import {
  Upload, Button, Icon,
} from 'ant-design-vue';
import { apiPutCrawlersFile } from '@/api/jdCrawlers';

Vue.use(Upload);
Vue.use(Button);
Vue.use(Icon);
export default {
  name: 'JDCrawlers',
  data() {
    return {
      fileList: [],
    };
  },
  mounted() {
    this.socketIo();
  },
  methods: {
    beforeUpload(file) {
      if (!file.name.includes('.xls')) {
        this.$message.error('僅支持上傳xls或xlsx文件');
        return false;
      }
      this.fileList = [...this.fileList, file];
      return true;
    },
    async handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append('file', file);
      });
      const data = await apiPutCrawlersFile(formData);
      console.log(data);
    },
    socketIo() {
      this.$socket.on('test', (data) => {
        console.log(data);
      });
    },
  },
};
</script>

<style scoped>

</style>
