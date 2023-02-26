import FormData from "form-data";
import userApi from "../api/UserApi";

export const uploadImage = async (imageURI: string) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await userApi.uploadUserImage(body)
        if (!res.ok) {
        } else {
            if (res.data) {
                const d: any = res.data
                return d.url
            }
        }
    } catch (err) {
    }
    return ""
}

