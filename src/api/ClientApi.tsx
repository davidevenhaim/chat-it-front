import { create } from "apisauce";

export const baseUrl = 'http://192.168.1.38:3000/'

const apiClient = create({
    baseURL: baseUrl,
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
})

export default apiClient