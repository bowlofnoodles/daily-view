import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import { SERVER_HOST } from '@/config';

export interface API_PARAMS extends AxiosRequestConfig {
  url: string;
  closeWarning?: boolean;
  success?: (data: unknown) => void;
  fail?: (data: unknown) => void;
}

interface SuccessData {
  data: any;
  status: number;
}

interface ErrData {
  message: string;
  status: number;
}

const request = function (params: API_PARAMS): Promise<SuccessData['data'] | ErrData> {
  const method = params.method || 'get';
  const parameter = {
    method: method,
    ...params,
    url: SERVER_HOST + params.url
  };
  if (method === 'get') {
    parameter.params = params.data;
  } else {
    parameter.data = params.data;
  }
  return new Promise((resolve, reject) => {
    axios(parameter)
    .then(res => {
      const {data} = res;
      if (data.status === 200) {
        params.success && params.success(data.data);
        resolve(data.data);
      } else {
        !params.closeWarning && message.warning(`错误代码：${data.status}，错误信息：${data.message}`);
        params.fail && params.fail(data);
        reject(data);
      }
    })
    .catch(err => {
      !params.closeWarning && message.warning(`错误代码：00000，请联系管理员`);
      params.fail && params.fail(err);
      reject(err);
    });
  });
};


export type RequestFunc = (params?) => ReturnType<typeof request>;

export default request;
