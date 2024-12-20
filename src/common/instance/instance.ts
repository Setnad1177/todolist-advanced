import axios from "axios"

const token = "7b4a1409-6d34-4532-99ad-2154875f1ba8"
const apiKey = "08637002-075a-4cfd-85bf-1e908e0d5cb0"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
})
