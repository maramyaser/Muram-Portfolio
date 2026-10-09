import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";
const BACKEND_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getMediaUrl = (url) => {
    if (!url) {
        return "";
    }

    // Already a complete URL
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    // Django media URL
    return `${BACKEND_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export default api;