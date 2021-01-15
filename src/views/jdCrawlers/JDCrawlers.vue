<template>
  <a-spin :spinning="spinning" :tip="`數據抓取中，大概需要${time}`">
    <a-upload
      name="file"
      :multiple="false"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :customRequest="handleUpload"
    >
      <a-button> <a-icon type="upload" /> Click to Upload </a-button>
    </a-upload>
  </a-spin>
</template>

<script>
import Vue from 'vue';
import {
  Upload, Button, Icon, Spin,
} from 'ant-design-vue';
import { apiPutCrawlersFile } from '@/api/jdCrawlers';

Vue.use(Upload);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Spin);
export default {
  name: 'JDCrawlers',
  data() {
    return {
      fileList: [],
      spinning: false,
      time: '',
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
      this.spinning = true;
      const seconds = data.length * 40;
      this.time = `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
    },
    socketIo() {
      this.$socket.on('test', (data) => {
        console.log(data);
        this.spinning = false;
        const timer = setTimeout(() => {
          clearTimeout(timer);
          window.open(`http://192.168.5.31:3000/api/downloadFile/${data}`, '_self');
        }, 6000);
      });
    },
  },
};
</script>

<style scoped>

</style>
