<template>
<div>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="网站">
      <a-radio-group v-model="form.resource">
        <a-radio value="baidu">
          百度
        </a-radio>
        <a-radio value="google">
          谷歌
        </a-radio>
        <a-radio value="facebook">
          facebook
        </a-radio>
        <a-radio value="custom">
          自定义
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="数量">
      <a-radio-group v-model="form.count">
        <a-radio :value="100">
          100
        </a-radio>
        <a-radio :value="200">
          200
        </a-radio>
        <a-radio :value="300">
          300
        </a-radio>
        <a-radio value="custom">
          自定义
          <a-input v-model="form.customCount" />
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="关键词/网址">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="download">
        download
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>

<script>
import Vue from 'vue';
import apiPictureDownload from '@/api/pictureDownload';
import {
  FormModel, Form, Radio, Button, Input,
} from 'ant-design-vue';

Vue.use(FormModel);
Vue.use(Form);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Input);
export default {
  name: 'PictureDownload',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        resource: 'baidu',
        count: 100,
        customCount: '',
      },
      test: '',
    };
  },
  methods: {
    async download() {
      let { count } = this.form;
      if (this.form.count === 'custom') {
        count = Number(this.form.customCount);
      }
      const data = {
        type: this.form.resource,
        value: this.form.name,
        count,
      };

      const res = await apiPictureDownload(data);
      console.log(res);
    },
  },
};
</script>

<style scoped>

</style>
