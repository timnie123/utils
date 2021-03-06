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
export async function apiPutHotSearchWeibo() {
  return $axios.get('api/hotSearch/refreshWeibo')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearchToutiao() {
  return $axios.get('api/hotSearch/refreshToutiao')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearchWeiboTopic() {
  return $axios.get('api/hotSearch/refreshWeiboTopic')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearchWeiboNews() {
  return $axios.get('api/hotSearch/refreshWeiboNews')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearchBaidu() {
  return $axios.get('api/hotSearch/refreshBaidu')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotSearchdoubanTopic() {
  return $axios.get('api/hotSearch/refreshdoubanTopic')
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
export async function apiPutHotArticleExmooLife() {
  return $axios.get('api/hotArticle/exmoo/refreshLife')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleExmooNews() {
  return $axios.get('api/hotArticle/exmoo/refreshNews')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiGetHotArticleHk01(num) {
  return $axios.get(`api/hotArticle/hk01/news?currentPage=${num}`)
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleHkTec() {
  return $axios.get('api/hotArticle/hk01/refreshTec')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleHkLife() {
  return $axios.get('api/hotArticle/hk01/refreshLife')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiGetHotArticleFB(num) {
  return $axios.get(`api/hotArticle/fb/post?currentPage=${num}`)
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleFBTripAddict() {
  return $axios.get('api/hotArticle/fb/refreshTripAddict')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleFBUMagazineHK() {
  return $axios.get('api/hotArticle/fb/refreshUMagazineHK')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiGetHotArticleCTM(num) {
  return $axios.get(`api/hotArticle/ctm?currentPage=${num}`)
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
export async function apiPutHotArticleCTMActivity() {
  return $axios.get('api/hotArticle/ctm/refreshCtmActivity')
    .then((res) => {
      if (res.code === 200) {
        return res.data;
      }
      return 'error';
    })
    .catch();
}
