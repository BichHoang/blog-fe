import axios from 'axios';
import { map } from 'lodash';

export const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const convertKeysToSnakeCase = (obj: Record<string, any>): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach(key => (newObj[camelToSnakeCase(key)] = obj[key]));
  return newObj;
};

export const snakeToCamelCase = (str: string): string =>
  str.replace(/([-_][a-z])/g, group =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );

export const convertKeysToCamelCase = <T extends Record<string, any>>(obj: T): T => {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach(key => {
    const camelCaseKey = snakeToCamelCase(key);
    newObj[camelCaseKey] = obj[key];
  });

  return newObj as T;
};

export function getRequest<T>(
  endpoint: string,
  successCallback: (data: T, meta: any) => void,
  errorCallback: (error: string) => void
) {
  console.log("Endpoint: ", endpoint)
  console.log("API: ", process.env.REACT_APP_BACKEND_API)
  let url = process.env.REACT_APP_BACKEND_API + "/" + endpoint;
  console.log("URL: ", url)
  return axios
    .get(`${process.env.REACT_APP_BACKEND_API}/${endpoint}`)
    .then(response => {
      console.log("Response: ", response)

      if (response.status === 200) {
        let data = response.data.data;
        const meta = response.data.meta;
        if (Array.isArray(data)) {
          data = map(data, item => convertKeysToCamelCase(item.attributes));
        } else if (data.attributes) {
          data  = convertKeysToCamelCase(data.attributes)
        }
        console.log("Data: ", data)
        console.log("Meta: ", meta)

        successCallback(data, meta);
      } else {
        errorCallback(response.data.errors);
      }
    })
    .catch(error => {
      errorCallback(error.message);
      if (error.response?.status === 401) {
        console.log('unauthorized');
      }
    });
}

export function createRequest<T>(
  endpoint: string,
  payload: T,
  successCallback: (data: T) => void,
  errorCallback: (error: string) => void
) {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_API}/${endpoint}`, payload)
    .then(response => {
      if (response.data.status === 201) {
        successCallback(response.data.data);
      } else {
        errorCallback(response.data.errors);
      }
    })
    .catch(error => {
      errorCallback(error.response?.data?.message || 'An error occurred');
    });
}

export function updateRequest<T extends Record<string, any>>(
  endpoint: string,
  payload: T,
  successCallback: (data: T) => void,
  errorCallback: (error: string) => void
) {
  return axios
    .put(`${process.env.REACT_APP_BACKEND_API}/${endpoint}`, convertKeysToSnakeCase(payload))
    .then(response => {
      if (response.data.status === 200) {
        successCallback(convertKeysToCamelCase(response.data.data));
      } else {
        errorCallback(response.data.errors);
      }
    })
    .catch(error => {
      errorCallback(error.response?.data?.message || 'An error occurred');
    });
}

export function deleteRequest(
  endpoint: string,
  successCallback: () => void,
  errorCallback: (error: string) => void
) {
  return axios
    .delete(`${process.env.REACT_APP_BACKEND_API}/${endpoint}`)
    .then(response => {
      if (response.data.status === 200) {
        successCallback();
      } else {
        errorCallback(response.data.errors);
      }
    })
    .catch(error => {
      errorCallback(error.response?.data?.message || 'An error occurred');
    });
}

export const formatDate = (date: string, locale: string, option?: any): string => {
  option = option || {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Date(date).toLocaleDateString(locale, option);
};
