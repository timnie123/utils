import $axios from '@/config/axios';

export async function apiPutCrawlersFile(file) {
  return $axios.post('api/jdCrawlersFileUp', file)
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
