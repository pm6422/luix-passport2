import axios from "axios"
import qs from "qs"

// const { REACT_APP_SERVER_URL } = process.env
// const TIMEOUT = 1000000

const instance = axios.create({
  // baseURL: `${REACT_APP_SERVER_URL}`,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: undefined })
  },
})

instance.interceptors.request.use(
  function (config) {
    // Modify request config before sending
    config.headers["X-Trace-Id"] = "R" + Date.now() + (Math.random() * 100000).toFixed()
    // config.timeout = TIMEOUT
    return config
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    // Modify response data before resolving the promise
    // For example, you can handle success messages or extract data
    console.log("Response Data:", response.data)
    return response
  },
  function (error) {
    // Handle response errors
    // For example, you can handle unauthorized errors or network failures
    if (error.response.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access")
    } else {
      // Handle other errors
      console.error("Request failed:", error.message)
    }
    return Promise.reject(error)
  }
)

export const http = instance

export default http