import request from '@/api/request';
import type { RequestFunc } from '@/api/request';

const getWeiboHotSpot: RequestFunc = params => {
  return request({
    method: 'get',
    ...params,
    url: '/api/v1/customer_service/chat_common_words/view'
  });
};

export {
  getWeiboHotSpot
};