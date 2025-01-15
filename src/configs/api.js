import axios from "axios";

const LIVE_API_URL = process.env.NEXT_PUBLIC_LIVE_API
const STAGING_API_URL = process.env.NEXT_PUBLIC_STAGING_API
const DEBUG_API_URL = process.env.NEXT_PUBLIC_DEBUG_API
export const baseUrl = LIVE_API_URL

const apiUrl = baseUrl + "/api"

export const api = axios.create({
  baseURL: apiUrl,
})
