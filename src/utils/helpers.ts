import userApi from "../api/UserApi";

export const uploadImage = async (imageURI: string) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await userApi.uploadUserImage(body)
        if (!res.ok) {
            console.log("save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                console.log("----= url:" + d.url)
                return d.url
            }
        }
    } catch (err) {
        console.log("save failed " + err)
    }
    return ""
}

