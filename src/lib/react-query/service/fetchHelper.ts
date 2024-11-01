/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

import { baseURL } from '@/constant';

import { getQueryCLient } from '../providers';

interface ResponseWrapper<T> {
  data: T;
  success: boolean;
  message: string;
}

const fetchHelper = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: BodyInit | null | any,
  headers?: Record<string, string>,
) => {
  // if (!data && (method === 'POST' || method === 'PUT')) {
  //   return {
  //     code: 500,
  //     error: 'Bad Request',
  //   } as any;
  // }

  try {
    const headerInit: Record<string, string> = headers || {};
    let body: BodyInit | null = null;

    if (data instanceof FormData) {
      body = data;
    } else {
      headerInit['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await axios.request({
      url: `${baseURL}${url}`,
      method,
      data: body,
      // cache: 'no-store',
      headers: {
        Authorization: `Bearer ${getCookie('token') || ''}`,
        ...headerInit,
      },
    });

    return response.data;
  } catch (err: any) {
    const pathname = window?.location?.pathname;
    const queryClient = getQueryCLient();

    if (err.response.status === 401) {
      deleteCookie('token');
      // window.location.href = `/login${pathname ? `?fallback=${pathname}` : ''}`;

      queryClient.cancelQueries();
    }
    throw err;
  }
};

export default fetchHelper;
