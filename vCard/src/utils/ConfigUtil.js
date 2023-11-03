
export default class ConfigUtil {

    static getApiUrl() {
        return `${import.meta.env.VITE_BACKEND_ADDRESS}:${import.meta.env.VITE_BACKEND_PORT}${import.meta.env.VITE_BACKEND_ENDPOINT}`;
    }
}