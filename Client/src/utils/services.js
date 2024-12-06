import axios from "axios"
// export const baseUrl = "http://localhost:5000/api"
export const baseUrl = "https://chat-app-4s32.onrender.com/api"
export const postRequest = async (url, body) => {

    const res = await axios.post(`${baseUrl}/${url}`, body)

    return res
}

export const getRequest = async (url) => {
    const response = await fetch(`${baseUrl}/${url}`)
    const data = await response.json()

    if (!response.ok) {
        let message = "An error"
        if (data?.message) {
            message = data.message
        }
        return { error: true, message }
    }
    return data
}