import {
  AxiosInstance,
  AxiosRequestConfig
} from 'axios'

export default class ApiClient implements HTTPClient {
  private provider: AxiosInstance

  constructor(provider: AxiosInstance) {
    this.provider = provider
  }

  request(config: AxiosRequestConfig): Promise<any> {
    return this.provider.request(config)
  }

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.provider.get(url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.provider.delete(url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.provider.post(url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.provider.put(url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.provider.patch(url, data, config)
  }
}
