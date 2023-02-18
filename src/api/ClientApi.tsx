import { create } from "apisauce";

const apiClient = create({
    baseURL: 'http://192.168.1.38:3000/',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'Bearer ' + "JWT TOKEN",
    },
})

export default apiClient