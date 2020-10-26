import $axios from '@/config/axios';

export default async function apiPictureDownload(params) {
  return $axios.get(`api/pictureDownload?type=${params.type}&value=${params.value}&count=${params.count}`)
    .then((res) => {
      if (res.data.code === 200) {
        return res.data.data;
      }
      return res.data;
    })
    .catch();
}
