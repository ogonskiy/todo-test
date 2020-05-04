import axios, { AxiosInstance } from 'axios'
import ApiClient from './ApiClient'
import { config } from '../config'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.axiosBaseUrl,
  timeout: config.axiosTimeout
})

const apiClient: ApiClient = new ApiClient(axiosInstance)

export default apiClient
