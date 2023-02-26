import FormData from "form-data"

import apiClient from "./ClientApi";

const uploadImage = async (imageURI: string, id: string): Promise<false | string> => {
    const image = new FormData();
    image.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });

    try {
        const res = await apiClient.post(`/file/upload/${id}`, image);
        if (!res.ok) {
            return false;
        } else {
            if (res.data) {
                const data: any = res.data
                return data.url as string;
            }
        }
    } catch (err) {
        ("save failed " + err)
        return false;
    }

    return false;
};

export default {
    uploadImage
}