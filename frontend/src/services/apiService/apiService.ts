import axios, { AxiosResponse } from 'axios';
import { BaseResponse } from '@/services/apiService/types';

const basePath = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000';

const params = {
  baseURL: basePath,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const instance = axios.create({
  ...params,
});

export const handleResponse = async <T>(
  res: Promise<AxiosResponse<T>>,
): Promise<[T | null, BaseResponse | null]> => {
  try {
    const result = await res;
    console.log('res', result);

    return [result.data, null];
  } catch (error) {
    console.log(error);
    const _error = error.response?.data;
    const errObj: BaseResponse = { ..._error } || {
      code: 400,
      message: 'Something wrong. Try again.',
    };
    return [null, errObj];
  }
};
