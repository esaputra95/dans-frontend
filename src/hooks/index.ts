import { AxiosError, AxiosResponse } from "axios";
import { service } from "../service"
import { queryType } from "../interfaces";

export const fetchGet = async <T>(url: string, queryParam: queryType) => {
    try {
      const response: AxiosResponse<T> = await service.get(url, { params: { ...queryParam } });
      return {
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError
      };
    }
  };

export const fetchPost = async <T, R>(url:string, data:T) => {
    try {
        const response:AxiosResponse<T> = await service.post(url, {...data});
        return {
            data: response.data,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error as AxiosError
        }
    }
}