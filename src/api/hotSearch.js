import $axios from '@/config/axios';

export async function apiGetHotSearch() {
  return $axios.get('api/hotSearch')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearch() {
  return $axios.get('api/hotSearch/refresh')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiGetHotArticleExmoo(num) {
  return $axios.get(`api/hotArticle/exmoo/news?currentPage=${num}`)
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
