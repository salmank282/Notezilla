/**
 * @file axiosInstance.ts
 * Axios instance with predefined configuration
 * for making HTTP requests to the backend server.
 * @module services/axiosInstance
 * @dependencies axios
 */

/**
 * dependency imports
 */
import axios from "axios";

/**
 * @description Creates and configures an Axios instance with default settings.
 * @type {AxiosInstance}
 * @description
 * This Axios instance is pre-configured with the following settings:
 * - `baseURL`: The base URL for all HTTP requests is set to "http://localhost:3000/".
 * - `headers`: The default headers include "Content-Type" set to "application/json".
 * Use this instance to make HTTP requests throughout the application.
 */
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/notezilla",
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance;