import request from '@/api/request';
import type { RequestFunc } from '@/api/request';

const PREFIX = '/weibo';

const getURL = url => PREFIX + url;

const getWeiboHotSpot: RequestFunc = params => {
  return request({
    method: 'get',
    ...params,
    url: getURL('/hot_spot')
  });
};

export {
  getWeiboHotSpot
};