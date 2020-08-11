import $axios from '@/config/axios';

export default async function apiPictureDownload(params) {
  return $axios.get(`api/pictureDownload?type=${params.type}&value=${params.value}&count=${params.count}`)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return res.status;
    })
    .catch();
}
