import axios, { AxiosRequestConfig } from 'axios';

export default class Client {
  /*
   * Конфигурация клиента Axios по умолчанию
   */
  protected static config: AxiosRequestConfig = {
    baseURL: 'https://meowle.qa-fintech.ru/api/',
    timeout: 10000,
  };

  /*
   * Метод получения экземпляра Axios
   */
  protected static getInstance(config: AxiosRequestConfig = {}) {
    return axios.create(Object.assign(Client.config, config));
  }
}
