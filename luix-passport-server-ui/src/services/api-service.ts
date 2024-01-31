import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param config: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, config: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, config);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string, slug = "" as string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param data: data to submit
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, data);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param data: data to submit
   * @returns Promise<AxiosResponse>
   */
  public static update(resource: string, slug: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, data);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param data: data to submit
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, data: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, data);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
