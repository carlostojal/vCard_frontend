
export default class ConfigUtil {

    static getApiUrl() {
        return `${import.meta.env.VITE_BACKEND_ADDRESS}:${import.meta.env.VITE_BACKEND_PORT}${import.meta.env.VITE_BACKEND_ENDPOINT}`;
    }

    static getNotificationUrl() {
        return `ws://${import.meta.env.VITE_NOTIFICATION_ADDRESS}:${import.meta.env.VITE_NOTIFICATION_PORT}${import.meta.env.VITE_NOTIFICATION_ENDPOINT}?authorization=${sessionStorage.getItem('token')}`;
    }
}